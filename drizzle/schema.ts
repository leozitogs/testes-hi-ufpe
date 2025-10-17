import { mysqlEnum, mysqlTable, text, timestamp, varchar, int, boolean } from "drizzle-orm/mysql-core";

/**
 * Schema do Hi UFPE - Hub Inteligente
 */

// Tabela de usuários (já existente, estendida)
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "professor", "secgrad"]).default("user").notNull(),
  matricula: varchar("matricula", { length: 20 }), // Matrícula do aluno
  curso: varchar("curso", { length: 200 }), // Curso do aluno
  periodo: int("periodo"), // Período atual
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

// Disciplinas
export const disciplinas = mysqlTable("disciplinas", {
  id: varchar("id", { length: 64 }).primaryKey(),
  codigo: varchar("codigo", { length: 20 }).notNull(), // IF668, etc
  nome: varchar("nome", { length: 200 }).notNull(),
  descricao: text("descricao"),
  creditos: int("creditos"),
  departamento: varchar("departamento", { length: 100 }),
  ementa: text("ementa"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// Professores
export const professores = mysqlTable("professores", {
  id: varchar("id", { length: 64 }).primaryKey(),
  nome: varchar("nome", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }),
  departamento: varchar("departamento", { length: 100 }),
  sala: varchar("sala", { length: 50 }),
  telefone: varchar("telefone", { length: 20 }),
  lattes: varchar("lattes", { length: 500 }),
  foto: varchar("foto", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Horários de aula
export const horarios = mysqlTable("horarios", {
  id: varchar("id", { length: 64 }).primaryKey(),
  disciplinaId: varchar("disciplinaId", { length: 64 }).notNull(),
  professorId: varchar("professorId", { length: 64 }).notNull(),
  diaSemana: mysqlEnum("diaSemana", ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]).notNull(),
  horaInicio: varchar("horaInicio", { length: 5 }).notNull(), // "08:00"
  horaFim: varchar("horaFim", { length: 5 }).notNull(), // "10:00"
  sala: varchar("sala", { length: 50 }).notNull(),
  periodo: varchar("periodo", { length: 10 }), // "2025.1"
  createdAt: timestamp("createdAt").defaultNow(),
});

// Matrículas (alunos em disciplinas)
export const matriculas = mysqlTable("matriculas", {
  id: varchar("id", { length: 64 }).primaryKey(),
  alunoId: varchar("alunoId", { length: 64 }).notNull(),
  disciplinaId: varchar("disciplinaId", { length: 64 }).notNull(),
  periodo: varchar("periodo", { length: 10 }).notNull(), // "2025.1"
  nota1: int("nota1"), // 0-100
  nota2: int("nota2"),
  nota3: int("nota3"),
  notaFinal: int("notaFinal"),
  frequencia: int("frequencia"), // 0-100
  status: mysqlEnum("status", ["cursando", "aprovado", "reprovado", "trancado"]).default("cursando").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// Comunicados e avisos
export const comunicados = mysqlTable("comunicados", {
  id: varchar("id", { length: 64 }).primaryKey(),
  titulo: varchar("titulo", { length: 300 }).notNull(),
  conteudo: text("conteudo").notNull(),
  autor: varchar("autor", { length: 200 }), // Nome do autor
  autorId: varchar("autorId", { length: 64 }), // ID do usuário autor
  tipo: mysqlEnum("tipo", ["geral", "academico", "administrativo", "evento", "urgente"]).default("geral").notNull(),
  prioridade: mysqlEnum("prioridade", ["baixa", "media", "alta"]).default("media").notNull(),
  publico: boolean("publico").default(true).notNull(), // Visível para todos
  dataPublicacao: timestamp("dataPublicacao").defaultNow(),
  dataExpiracao: timestamp("dataExpiracao"), // Opcional
  anexos: text("anexos"), // JSON com URLs de anexos
  visualizacoes: int("visualizacoes").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// Conversas do chatbot
export const conversas = mysqlTable("conversas", {
  id: varchar("id", { length: 64 }).primaryKey(),
  usuarioId: varchar("usuarioId", { length: 64 }).notNull(),
  titulo: varchar("titulo", { length: 200 }), // Título gerado automaticamente
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// Mensagens do chatbot
export const mensagens = mysqlTable("mensagens", {
  id: varchar("id", { length: 64 }).primaryKey(),
  conversaId: varchar("conversaId", { length: 64 }).notNull(),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  conteudo: text("conteudo").notNull(),
  metadata: text("metadata"), // JSON com informações extras
  createdAt: timestamp("createdAt").defaultNow(),
});

// Uploads administrativos (planilhas, documentos)
export const uploads = mysqlTable("uploads", {
  id: varchar("id", { length: 64 }).primaryKey(),
  nome: varchar("nome", { length: 300 }).notNull(),
  tipo: mysqlEnum("tipo", ["planilha_horarios", "planilha_notas", "planilha_alunos", "documento", "outro"]).notNull(),
  url: varchar("url", { length: 500 }).notNull(), // URL no S3
  tamanho: int("tamanho"), // Bytes
  mimeType: varchar("mimeType", { length: 100 }),
  uploadPor: varchar("uploadPor", { length: 64 }).notNull(), // ID do usuário
  processado: boolean("processado").default(false).notNull(),
  erros: text("erros"), // JSON com erros de processamento
  createdAt: timestamp("createdAt").defaultNow(),
});

// Eventos e calendário acadêmico
export const eventos = mysqlTable("eventos", {
  id: varchar("id", { length: 64 }).primaryKey(),
  titulo: varchar("titulo", { length: 300 }).notNull(),
  descricao: text("descricao"),
  tipo: mysqlEnum("tipo", ["prova", "trabalho", "feriado", "evento", "prazo"]).notNull(),
  dataInicio: timestamp("dataInicio").notNull(),
  dataFim: timestamp("dataFim"),
  local: varchar("local", { length: 200 }),
  disciplinaId: varchar("disciplinaId", { length: 64 }), // Opcional, se for evento de disciplina
  createdAt: timestamp("createdAt").defaultNow(),
});

// Tipos exportados
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Disciplina = typeof disciplinas.$inferSelect;
export type InsertDisciplina = typeof disciplinas.$inferInsert;

export type Professor = typeof professores.$inferSelect;
export type InsertProfessor = typeof professores.$inferInsert;

export type Horario = typeof horarios.$inferSelect;
export type InsertHorario = typeof horarios.$inferInsert;

export type Matricula = typeof matriculas.$inferSelect;
export type InsertMatricula = typeof matriculas.$inferInsert;

export type Comunicado = typeof comunicados.$inferSelect;
export type InsertComunicado = typeof comunicados.$inferInsert;

export type Conversa = typeof conversas.$inferSelect;
export type InsertConversa = typeof conversas.$inferInsert;

export type Mensagem = typeof mensagens.$inferSelect;
export type InsertMensagem = typeof mensagens.$inferInsert;

export type Upload = typeof uploads.$inferSelect;
export type InsertUpload = typeof uploads.$inferInsert;

export type Evento = typeof eventos.$inferSelect;
export type InsertEvento = typeof eventos.$inferInsert;

