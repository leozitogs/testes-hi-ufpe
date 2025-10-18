/**
 * Funções disponíveis para o chatbot executar via function calling
 */

import * as db from '../db';
import { eq, and } from "drizzle-orm";
import { matriculas } from "../../drizzle/schema";

// Definições das funções para a OpenAI
export const CHATBOT_FUNCTIONS = [
  {
    name: "consultar_media",
    description: "Consulta a média atual do aluno em uma disciplina específica",
    parameters: {
      type: "object",
      properties: {
        disciplina: {
          type: "string",
          description: "Nome da disciplina (ex: 'Desenvolvimento de Software', 'Banco de Dados')",
        },
      },
      required: ["disciplina"],
    },
  },
  {
    name: "lancar_nota",
    description: "Lança uma nota em uma avaliação específica de uma disciplina",
    parameters: {
      type: "object",
      properties: {
        disciplina: {
          type: "string",
          description: "Nome da disciplina",
        },
        avaliacao: {
          type: "string",
          description: "Nome da avaliação (ex: 'Prova 1', 'AP 1', 'Trabalho Final')",
        },
        nota: {
          type: "number",
          description: "Nota obtida (0-10)",
        },
      },
      required: ["disciplina", "avaliacao", "nota"],
    },
  },
  {
    name: "registrar_falta",
    description: "Registra uma falta do aluno em uma disciplina",
    parameters: {
      type: "object",
      properties: {
        disciplina: {
          type: "string",
          description: "Nome da disciplina",
        },
        data: {
          type: "string",
          description: "Data da falta (formato YYYY-MM-DD)",
        },
        justificada: {
          type: "boolean",
          description: "Se a falta é justificada",
        },
        justificativa: {
          type: "string",
          description: "Justificativa da falta (opcional)",
        },
      },
      required: ["disciplina", "data"],
    },
  },
  {
    name: "calcular_projecao",
    description: "Calcula quanto o aluno precisa tirar nas próximas avaliações para atingir uma média desejada",
    parameters: {
      type: "object",
      properties: {
        disciplina: {
          type: "string",
          description: "Nome da disciplina",
        },
        media_desejada: {
          type: "number",
          description: "Média que o aluno deseja atingir (0-10)",
        },
      },
      required: ["disciplina", "media_desejada"],
    },
  },
  {
    name: "simular_nota",
    description: "Simula qual seria a média final se o aluno tirar determinada nota em uma avaliação futura",
    parameters: {
      type: "object",
      properties: {
        disciplina: {
          type: "string",
          description: "Nome da disciplina",
        },
        avaliacao: {
          type: "string",
          description: "Nome da avaliação futura",
        },
        nota_simulada: {
          type: "number",
          description: "Nota a ser simulada (0-10)",
        },
      },
      required: ["disciplina", "avaliacao", "nota_simulada"],
    },
  },
  {
    name: "consultar_faltas",
    description: "Consulta o número de faltas do aluno em uma disciplina",
    parameters: {
      type: "object",
      properties: {
        disciplina: {
          type: "string",
          description: "Nome da disciplina",
        },
      },
      required: ["disciplina"],
    },
  },
  {
    name: "consultar_proxima_aula",
    description: "Consulta qual é a próxima aula do aluno",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "consultar_situacao_geral",
    description: "Consulta a situação geral do aluno em todas as disciplinas (médias, status, faltas)",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

// Executor de funções
export async function executarFuncao(
  alunoId: string,
  functionName: string,
  args: any
): Promise<any> {
  switch (functionName) {
    case "consultar_media":
      return await consultarMedia(alunoId, args.disciplina);
    
    case "lancar_nota":
      return await lancarNota(alunoId, args.disciplina, args.avaliacao, args.nota);
    
    case "registrar_falta":
      return await registrarFalta(alunoId, args.disciplina, args.data, args.justificada, args.justificativa);
    
    case "calcular_projecao":
      return await calcularProjecao(alunoId, args.disciplina, args.media_desejada);
    
    case "simular_nota":
      return await simularNota(alunoId, args.disciplina, args.avaliacao, args.nota_simulada);
    
    case "consultar_faltas":
      return await consultarFaltas(alunoId, args.disciplina);
    
    case "consultar_proxima_aula":
      return await consultarProximaAula(alunoId);
    
    case "consultar_situacao_geral":
      return await consultarSituacaoGeral(alunoId);
    
    default:
      return { error: "Função não encontrada" };
  }
}

// Implementação das funções

async function consultarMedia(alunoId: string, disciplinaNome: string) {
  try {
    // Buscar matrícula
    const matriculasLista = await db.getMatriculasByAluno(alunoId);
    const matricula = matriculasLista.find((m: any) =>
      m.disciplina.nome.toLowerCase().includes(disciplinaNome.toLowerCase())
    );
    
    if (!matricula) {
      return { error: "Disciplina não encontrada nas suas matrículas" };
    }
    
    // Buscar método de avaliação e avaliações
    const metodo = await db.getMetodoAvaliacaoByMatricula(matricula.matricula.id);
    if (!metodo) {
      return {
        disciplina: matricula.disciplina.nome,
        media: matricula.matricula.media || "0.00",
        status: matricula.matricula.status,
        mensagem: "Método de avaliação não configurado",
      };
    }
    
    const avaliacoes = await db.getAvaliacoesByMetodo(metodo.id);
    
    return {
      disciplina: matricula.disciplina.nome,
      media: matricula.matricula.mediaCalculada || matricula.matricula.media || "0.00",
      status: matricula.matricula.status,
      metodo: metodo.nome,
      avaliacoes: avaliacoes.map((a: any) => ({
        nome: a.nome,
        tipo: a.tipo,
        peso: a.peso,
        notaObtida: a.notaObtida,
        notaMaxima: a.notaMaxima,
      })),
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

async function lancarNota(
  alunoId: string,
  disciplinaNome: string,
  avaliacaoNome: string,
  nota: number
) {
  try {
    // Buscar matrícula
    const matriculasLista = await db.getMatriculasByAluno(alunoId);
    const matricula = matriculasLista.find((m: any) =>
      m.disciplina.nome.toLowerCase().includes(disciplinaNome.toLowerCase())
    );
    
    if (!matricula) {
      return { error: "Disciplina não encontrada" };
    }
    
    // Buscar método e avaliações
    const metodo = await db.getMetodoAvaliacaoByMatricula(matricula.matricula.id);
    if (!metodo) {
      return { error: "Método de avaliação não configurado para esta disciplina" };
    }
    
    const avaliacoes = await db.getAvaliacoesByMetodo(metodo.id);
    const avaliacao = avaliacoes.find((a: any) =>
      a.nome.toLowerCase().includes(avaliacaoNome.toLowerCase())
    );
    
    if (!avaliacao) {
      return { error: `Avaliação '${avaliacaoNome}' não encontrada` };
    }
    
    // Lançar nota
    await db.updateAvaliacao(avaliacao.id, {
      notaObtida: nota.toString(),
      dataAvaliacao: new Date(),
    });
    
    // Buscar média atualizada
    const matriculaAtualizada = await db.getMatricula(matricula.matricula.id);
    
    return {
      sucesso: true,
      disciplina: matricula.disciplina.nome,
      avaliacao: avaliacao.nome,
      nota: nota,
      media_atualizada: matriculaAtualizada?.mediaCalculada || matriculaAtualizada?.media,
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

async function registrarFalta(
  alunoId: string,
  disciplinaNome: string,
  data: string,
  justificada?: boolean,
  justificativa?: string
) {
  try {
    // Buscar matrícula
    const matriculasLista = await db.getMatriculasByAluno(alunoId);
    const matricula = matriculasLista.find((m: any) =>
      m.disciplina.nome.toLowerCase().includes(disciplinaNome.toLowerCase())
    );
    
    if (!matricula) {
      return { error: "Disciplina não encontrada" };
    }
    
    // Registrar falta
    await db.registrarFalta({
      matriculaId: matricula.matricula.id,
      data: new Date(data),
      justificada: justificada || false,
      justificativa,
    } as any);
    
    // Buscar matrícula atualizada
    const matriculaAtualizada = await db.getMatricula(matricula.matricula.id);
    
    return {
      sucesso: true,
      disciplina: matricula.disciplina.nome,
      total_faltas: matriculaAtualizada?.faltas || 0,
      frequencia: matriculaAtualizada?.frequencia || 100,
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

async function calcularProjecao(
  alunoId: string,
  disciplinaNome: string,
  mediaDesejada: number
) {
  try {
    // Buscar matrícula e avaliações
    const matriculasLista = await db.getMatriculasByAluno(alunoId);
    const matricula = matriculasLista.find((m: any) =>
      m.disciplina.nome.toLowerCase().includes(disciplinaNome.toLowerCase())
    );
    
    if (!matricula) {
      return { error: "Disciplina não encontrada" };
    }
    
    const metodo = await db.getMetodoAvaliacaoByMatricula(matricula.matricula.id);
    if (!metodo) {
      return { error: "Método de avaliação não configurado" };
    }
    
    const avaliacoes = await db.getAvaliacoesByMetodo(metodo.id);
    
    // Calcular notas já obtidas
    let somaNotas = 0;
    let somaPesos = 0;
    let avaliacoesPendentes: any[] = [];
    
    avaliacoes.forEach((a: any) => {
      if (a.notaObtida !== null) {
        somaNotas += Number(a.notaObtida) * Number(a.peso);
        somaPesos += Number(a.peso);
      } else {
        avaliacoesPendentes.push(a);
      }
    });
    
    // Calcular quanto precisa nas avaliações restantes
    const pesoTotal = avaliacoes.reduce((acc: number, a: any) => acc + Number(a.peso), 0);
    const pesoRestante = pesoTotal - somaPesos;
    
    if (pesoRestante === 0) {
      return {
        mensagem: "Todas as avaliações já foram realizadas",
        media_atual: (somaNotas / somaPesos).toFixed(2),
      };
    }
    
    const notaNecessaria = ((mediaDesejada * pesoTotal) - somaNotas) / pesoRestante;
    
    return {
      disciplina: matricula.disciplina.nome,
      media_atual: (somaNotas / somaPesos).toFixed(2),
      media_desejada: mediaDesejada,
      nota_necessaria: notaNecessaria.toFixed(2),
      avaliacoes_pendentes: avaliacoesPendentes.length,
      viavel: notaNecessaria <= 10 && notaNecessaria >= 0,
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

async function simularNota(
  alunoId: string,
  disciplinaNome: string,
  avaliacaoNome: string,
  notaSimulada: number
) {
  try {
    // Buscar matrícula e avaliações
    const matriculasLista = await db.getMatriculasByAluno(alunoId);
    const matricula = matriculasLista.find((m: any) =>
      m.disciplina.nome.toLowerCase().includes(disciplinaNome.toLowerCase())
    );
    
    if (!matricula) {
      return { error: "Disciplina não encontrada" };
    }
    
    const metodo = await db.getMetodoAvaliacaoByMatricula(matricula.matricula.id);
    if (!metodo) {
      return { error: "Método de avaliação não configurado" };
    }
    
    const avaliacoes = await db.getAvaliacoesByMetodo(metodo.id);
    const avaliacao = avaliacoes.find((a: any) =>
      a.nome.toLowerCase().includes(avaliacaoNome.toLowerCase())
    );
    
    if (!avaliacao) {
      return { error: `Avaliação '${avaliacaoNome}' não encontrada` };
    }
    
    // Calcular média simulada
    let somaNotas = 0;
    let somaPesos = 0;
    
    avaliacoes.forEach((a: any) => {
      const nota = a.id === avaliacao.id ? notaSimulada : (a.notaObtida ? Number(a.notaObtida) : 0);
      somaNotas += nota * Number(a.peso);
      somaPesos += Number(a.peso);
    });
    
    const mediaSimulada = somaNotas / somaPesos;
    const mediaAtual = Number(matricula.matricula.mediaCalculada || matricula.matricula.media || 0);
    
    return {
      disciplina: matricula.disciplina.nome,
      avaliacao: avaliacao.nome,
      nota_simulada: notaSimulada,
      media_atual: mediaAtual.toFixed(2),
      media_simulada: mediaSimulada.toFixed(2),
      diferenca: (mediaSimulada - mediaAtual).toFixed(2),
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

async function consultarFaltas(alunoId: string, disciplinaNome: string) {
  try {
    // Buscar matrícula
    const matriculasLista = await db.getMatriculasByAluno(alunoId);
    const matricula = matriculasLista.find((m: any) =>
      m.disciplina.nome.toLowerCase().includes(disciplinaNome.toLowerCase())
    );
    
    if (!matricula) {
      return { error: "Disciplina não encontrada" };
    }
    
    // Buscar faltas
    const faltas = await db.getFaltasByMatricula(matricula.matricula.id);
    
    return {
      disciplina: matricula.disciplina.nome,
      total_faltas: matricula.matricula.faltas || 0,
      frequencia: matricula.matricula.frequencia || 100,
      frequencia_minima: matricula.matricula.frequenciaMinima || 75,
      faltas_detalhadas: faltas.map((f: any) => ({
        data: f.data,
        justificada: f.justificada,
        justificativa: f.justificativa,
      })),
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

async function consultarProximaAula(alunoId: string) {
  try {
    const usuario = await db.getUser(alunoId);
    const horarios = await db.getHorariosByAluno(alunoId, usuario?.periodo?.toString() || '2025.2');
    
    if (horarios.length === 0) {
      return { mensagem: "Nenhum horário cadastrado" };
    }
    
    // Ordenar por dia da semana e hora
    const diasSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const agora = new Date();
    const diaAtual = diasSemana[agora.getDay() - 1]; // 0 = Domingo, 1 = Segunda
    
    // Encontrar próxima aula
    let proximaAula = null;
    
    for (const horario of horarios) {
      // Simplificação: retornar primeira aula encontrada
      proximaAula = horario;
      break;
    }
    
    if (!proximaAula) {
      return { mensagem: "Nenhuma aula encontrada" };
    }
    
    return {
      disciplina: proximaAula.disciplina.nome,
      dia: proximaAula.horario.diaSemana,
      horario: `${proximaAula.horario.horaInicio} - ${proximaAula.horario.horaFim}`,
      sala: proximaAula.horario.sala,
      professor: proximaAula.professor.nome,
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

async function consultarSituacaoGeral(alunoId: string) {
  try {
    const matriculasLista = await db.getMatriculasByAluno(alunoId);
    
    if (matriculasLista.length === 0) {
      return { mensagem: "Nenhuma matrícula encontrada" };
    }
    
    const situacao = [];
    
    for (const m of matriculasLista) {
      situacao.push({
        disciplina: m.disciplina.nome,
        codigo: m.disciplina.codigo,
        media: m.matricula.mediaCalculada || m.matricula.media || "0.00",
        status: m.matricula.status,
        faltas: m.matricula.faltas || 0,
        frequencia: m.matricula.frequencia || 100,
      });
    }
    
    return {
      total_disciplinas: matriculasLista.length,
      disciplinas: situacao,
    };
  } catch (error: any) {
    return { error: error.message };
  }
}
