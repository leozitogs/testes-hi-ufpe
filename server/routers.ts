import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { storagePut } from "../server/storage";
import * as db from "./db";

// Procedure para admin
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin' && ctx.user.role !== 'secgrad' && ctx.user.role !== 'professor') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Acesso negado' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  // ===== AUTH =====
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ===== DISCIPLINAS =====
  disciplinas: router({
    list: publicProcedure.query(async () => {
      return await db.getDisciplinas();
    }),
    
    get: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await db.getDisciplina(input.id);
      }),
  }),

  // ===== PROFESSORES =====
  professores: router({
    list: publicProcedure.query(async () => {
      return await db.getProfessores();
    }),
    
    get: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await db.getProfessor(input.id);
      }),
  }),

  // ===== HORÁRIOS =====
  horarios: router({
    list: publicProcedure
      .input(z.object({ periodo: z.string().optional() }))
      .query(async ({ input }) => {
        return await db.getHorarios(input.periodo);
      }),
    
    meusHorarios: protectedProcedure
      .input(z.object({ periodo: z.string() }))
      .query(async ({ ctx, input }) => {
        return await db.getHorariosByAluno(ctx.user.id, input.periodo);
      }),
  }),

  // ===== MATRÍCULAS =====
  matriculas: router({
    minhas: protectedProcedure
      .input(z.object({ periodo: z.string().optional() }))
      .query(async ({ ctx, input }) => {
        return await db.getMatriculasByAluno(ctx.user.id, input.periodo);
      }),
  }),

  // ===== COMUNICADOS =====
  comunicados: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getComunicados(input.limit);
      }),
    
    get: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await db.getComunicado(input.id);
      }),
    
    create: adminProcedure
      .input(z.object({
        titulo: z.string(),
        conteudo: z.string(),
        tipo: z.enum(["geral", "academico", "administrativo", "evento", "urgente"]).optional(),
        prioridade: z.enum(["baixa", "media", "alta"]).optional(),
        publico: z.boolean().optional(),
        dataExpiracao: z.date().optional(),
        anexos: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const id = await db.createComunicado({
          ...input,
          autor: ctx.user.name || ctx.user.id,
          autorId: ctx.user.id,
        });
        return { id };
      }),
  }),

  // ===== CHATBOT =====
  chat: router({
    conversas: protectedProcedure.query(async ({ ctx }) => {
      return await db.getConversasByUsuario(ctx.user.id);
    }),
    
    getConversa: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const conversa = await db.getConversa(input.id);
        if (!conversa) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Conversa não encontrada' });
        }
        const mensagens = await db.getMensagens(input.id);
        return { conversa, mensagens };
      }),
    
    novaConversa: protectedProcedure
      .input(z.object({ titulo: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        const id = await db.createConversa(ctx.user.id, input.titulo);
        return { id };
      }),
    
    enviarMensagem: protectedProcedure
      .input(z.object({
        conversaId: z.string().optional(),
        mensagem: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Criar conversa se não existir
        let conversaId = input.conversaId;
        if (!conversaId) {
          conversaId = await db.createConversa(ctx.user.id);
        }
        
        // Salvar mensagem do usuário
        await db.createMensagem({
          conversaId,
          role: "user",
          conteudo: input.mensagem,
        });
        
        // Buscar contexto (últimas mensagens)
        const mensagensAnteriores = await db.getMensagens(conversaId);
        const ultimasMensagens = mensagensAnteriores.slice(-10);
        
        // Buscar informações do usuário para contexto
        const usuario = await db.getUser(ctx.user.id);
        const matriculas = await db.getMatriculasByAluno(ctx.user.id);
        const horarios = await db.getHorariosByAluno(ctx.user.id, usuario?.periodo || '2025.2');
        
        // Montar contexto do sistema
        let contextoSistema = `Você é o Hi, assistente virtual do Hub Inteligente UFPE. Você é amigável, prestativo e conhece bem a universidade.

Informações do usuário:
- Nome: ${usuario?.name || 'Estudante'}
- Curso: ${usuario?.curso || 'Não informado'}
- Período: ${usuario?.periodo || 'Não informado'}
`;

        if (matriculas.length > 0) {
          contextoSistema += `\nDisciplinas matriculadas:\n`;
          matriculas.forEach(m => {
            contextoSistema += `- ${m.disciplina.nome} (${m.disciplina.codigo})\n`;
          });
        }
        
        if (horarios.length > 0) {
          contextoSistema += `\nHorários das aulas:\n`;
          horarios.forEach(h => {
            contextoSistema += `- ${h.disciplina.nome}: ${h.horario.diaSemana} às ${h.horario.horaInicio}-${h.horario.horaFim} (${h.horario.sala}) - Prof. ${h.professor.nome}\n`;
          });
        }

        contextoSistema += `\nResponda de forma clara, objetiva e em português. Use markdown para formatação quando apropriado.`;
        
        // Preparar mensagens para a IA
        const messages = [
          { role: "system" as const, content: contextoSistema },
          ...ultimasMensagens.map(m => ({
            role: m.role as "user" | "assistant",
            content: m.conteudo,
          })),
        ];
        
        // Chamar IA
        const resposta = await invokeLLM({ messages });
        const content = resposta.choices[0]?.message?.content;
        const respostaTexto = typeof content === 'string' ? content : "Desculpe, não consegui processar sua mensagem.";
        
        // Salvar resposta da IA
        await db.createMensagem({
          conversaId,
          role: "assistant",
          conteudo: respostaTexto,
        });
        
        return {
          conversaId,
          resposta: respostaTexto,
        };
      }),
    
    deletarConversa: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        // TODO: Implementar deleção em cascata
        return { success: true };
      }),
  }),

  // ===== UPLOADS ADMINISTRATIVOS =====
  uploads: router({
    list: adminProcedure.query(async () => {
      return await db.getUploads();
    }),
    
    upload: adminProcedure
      .input(z.object({
        nome: z.string(),
        tipo: z.enum(["planilha_horarios", "planilha_notas", "planilha_alunos", "documento", "outro"]),
        conteudo: z.string(), // Base64
        mimeType: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Decodificar base64
        const buffer = Buffer.from(input.conteudo, 'base64');
        
        // Upload para S3
        const key = `uploads/${Date.now()}-${input.nome}`;
        const { url } = await storagePut(key, buffer, input.mimeType);
        
        // Salvar no banco
        const id = await db.createUpload({
          nome: input.nome,
          tipo: input.tipo,
          url,
          tamanho: buffer.length,
          mimeType: input.mimeType,
          uploadPor: ctx.user.id,
        });
        
        return { id, url };
      }),
  }),

  // ===== EVENTOS =====
  eventos: router({
    list: publicProcedure
      .input(z.object({
        inicio: z.date().optional(),
        fim: z.date().optional(),
      }))
      .query(async ({ input }) => {
        return await db.getEventos(input.inicio, input.fim);
      }),
    
    create: adminProcedure
      .input(z.object({
        titulo: z.string(),
        descricao: z.string().optional(),
        tipo: z.enum(["prova", "trabalho", "feriado", "evento", "prazo"]),
        dataInicio: z.date(),
        dataFim: z.date().optional(),
        local: z.string().optional(),
        disciplinaId: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createEvento(input);
        return { id };
      }),
  }),
});

export type AppRouter = typeof appRouter;

