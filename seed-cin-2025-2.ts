/**
 * Script para popular o banco de dados com dados REAIS
 * Baseado na planilha: Publicação Oferta Graduação CIn 25.2
 * Execute: pnpm tsx scripts/seed-cin-2025-2.ts
 */

import { drizzle } from "drizzle-orm/mysql2";
import { 
  users, 
  disciplinas, 
  professores, 
  horarios, 
  matriculas, 
  comunicados 
} from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  console.log("🌱 Populando banco com dados reais do CIn 2025.2...\n");

  try {
    // 1. Criar usuários de teste
    console.log("👥 Criando usuários...");
    await db.insert(users).values([
      {
        id: "admin_cin",
        name: "Administrador CIn",
        email: "admin@cin.ufpe.br",
        loginMethod: "local",
        role: "admin",
      },
      {
        id: "aluno_teste1",
        name: "João Silva Santos",
        email: "jss@cin.ufpe.br",
        loginMethod: "local",
        role: "user",
      },
      {
        id: "aluno_teste2",
        name: "Maria Oliveira Costa",
        email: "moc@cin.ufpe.br",
        loginMethod: "local",
        role: "user",
      },
    ]).onDuplicateKeyUpdate({ set: { name: "Administrador CIn" } });
    console.log("✅ 3 usuários criados!\n");

    // 2. Criar professores REAIS
    console.log("👨‍🏫 Criando professores...");
    const professoresData = [
      { id: "prof_stefan", nome: "Stefan Blawid", email: "stefan@cin.ufpe.br" },
      { id: "prof_alex", nome: "Alex Sandro Gomes", email: "asg@cin.ufpe.br" },
      { id: "prof_rodrigo", nome: "Rodrigo Gabriel Ferreira Soares", email: "rgfs@cin.ufpe.br" },
      { id: "prof_marcio", nome: "Márcio Lopes Cornélio", email: "mlc@cin.ufpe.br" },
      { id: "prof_ricardo", nome: "Ricardo Massa Ferreira Lima", email: "rmfl@cin.ufpe.br" },
      { id: "prof_andson", nome: "Andson Balieiro", email: "andson@cin.ufpe.br" },
      { id: "prof_paulo_f", nome: "Paulo Fonseca", email: "pf@cin.ufpe.br" },
      { id: "prof_fabio", nome: "Fabio Silva", email: "fabio@cin.ufpe.br" },
      { id: "prof_paola", nome: "Paola Rodrigues de Godoy Accioly", email: "prga@cin.ufpe.br" },
      { id: "prof_valeria", nome: "Valéria Cesário Times", email: "vct@cin.ufpe.br" },
      { id: "prof_paulo_s", nome: "Paulo Salgado", email: "ps@cin.ufpe.br" },
      { id: "prof_kiev", nome: "Kiev Gama", email: "kiev@cin.ufpe.br" },
      { id: "prof_cristiano", nome: "Cristiano Coelho de Araújo", email: "cca@cin.ufpe.br" },
      { id: "prof_gustavo", nome: "Gustavo Carvalho", email: "gc@cin.ufpe.br" },
      { id: "prof_carina", nome: "Carina Frota Alves", email: "cfa@cin.ufpe.br" },
      { id: "prof_kelvin", nome: "Kelvin Lopes Dias", email: "kld@cin.ufpe.br" },
      { id: "prof_adriano", nome: "Adriano Augusto de Moraes Sarmento", email: "aams@cin.ufpe.br" },
      { id: "prof_ania", nome: "Ania Yolandy Lima da Silva", email: "ayls@cin.ufpe.br" },
      { id: "prof_ruy", nome: "Ruy de Queiroz", email: "ruy@cin.ufpe.br" },
      { id: "prof_renata", nome: "Renata Souza", email: "rs@cin.ufpe.br" },
      { id: "prof_carlos", nome: "Carlos Ferraz", email: "cf@cin.ufpe.br" },
      { id: "prof_ricardo_p", nome: "Ricardo Prudêncio", email: "rp@cin.ufpe.br" },
      { id: "prof_paulo_f2", nome: "Paulo Freitas Araújo Filho", email: "pfaf@cin.ufpe.br" },
      { id: "prof_paulo_b", nome: "Paulo Borba", email: "phmb@cin.ufpe.br" },
      { id: "prof_francisco", nome: "Francisco de Assis Tenorio de Carvalho", email: "fatc@cin.ufpe.br" },
      { id: "prof_giordano", nome: "Giordano Cabral", email: "gc2@cin.ufpe.br" },
      { id: "prof_patricia", nome: "Patricia Tedesco", email: "pcart@cin.ufpe.br" },
      { id: "prof_andre", nome: "André Luís de Medeiros Santos", email: "alms@cin.ufpe.br" },
      { id: "prof_geber", nome: "Geber Ramalho", email: "glr@cin.ufpe.br" },
      { id: "prof_leopoldo", nome: "Leopoldo Teixeira", email: "lmt@cin.ufpe.br" },
    ];

    for (const prof of professoresData) {
      await db.insert(professores).values({
        ...prof,
        departamento: "Centro de Informática",
        telefone: "(81) 2126-8430",
      }).onDuplicateKeyUpdate({ set: { nome: prof.nome } });
    }
    console.log(`✅ ${professoresData.length} professores criados!\n`);

    // 3. Criar disciplinas REAIS do CIn 2025.2
    console.log("📚 Criando disciplinas...");
    
    const disciplinasData = [
      // Período 1
      { codigo: "CIN0130", nome: "SISTEMAS DIGITAIS", creditos: 4, cargaHoraria: 60, professorId: "prof_stefan", periodo: 1 },
      { codigo: "CIN0131", nome: "CONCEPÇÃO DE ARTEFATOS DIGITAIS", creditos: 4, cargaHoraria: 60, professorId: "prof_alex", periodo: 1 },
      { codigo: "CIN0132", nome: "MATEMÁTICA DISCRETA", creditos: 4, cargaHoraria: 60, professorId: "prof_rodrigo", periodo: 1 },
      { codigo: "CIN0133", nome: "INTRODUÇÃO À PROGRAMAÇÃO", creditos: 4, cargaHoraria: 60, professorId: "prof_marcio", periodo: 1 },
      
      // Período 2
      { codigo: "CIN0134", nome: "ARQUITETURA DE COMPUTADORES E SISTEMAS OPERACIONAIS", creditos: 4, cargaHoraria: 60, professorId: "prof_andson", periodo: 2 },
      { codigo: "CIN0135", nome: "ESTRUTURAS DE DADOS ORIENTADAS A OBJETOS", creditos: 4, cargaHoraria: 60, professorId: "prof_paulo_f", periodo: 2 },
      { codigo: "CIN0136", nome: "DESENVOLVIMENTO DE SOFTWARE", creditos: 4, cargaHoraria: 60, professorId: "prof_fabio", periodo: 2 },
      { codigo: "MA026", nome: "CÁLCULO DIFERENCIAL E INTEGRAL 1", creditos: 4, cargaHoraria: 60, professorId: "prof_andson", periodo: 2 },
      { codigo: "FI582", nome: "FÍSICA PARA COMPUTAÇÃO", creditos: 4, cargaHoraria: 60, professorId: "prof_andson", periodo: 2 },
      
      // Período 3
      { codigo: "CIN0137", nome: "BANCO DE DADOS", creditos: 4, cargaHoraria: 60, professorId: "prof_valeria", periodo: 3 },
      { codigo: "CIN0138", nome: "ÁLGEBRA VETORIAL E LINEAR PARA COMPUTAÇÃO", creditos: 4, cargaHoraria: 60, professorId: "prof_paulo_s", periodo: 3 },
      { codigo: "CIN0139", nome: "INTEGRAÇÃO E EVOLUÇÃO DE SISTEMAS DE INFORMAÇÃO", creditos: 4, cargaHoraria: 60, professorId: "prof_kiev", periodo: 3 },
      { codigo: "CIN0140", nome: "ALGORITMOS", creditos: 4, cargaHoraria: 60, professorId: "prof_gustavo", periodo: 3 },
      { codigo: "IF679", nome: "INFORMÁTICA E SOCIEDADE", creditos: 2, cargaHoraria: 30, professorId: "prof_carina", periodo: 3 },
      { codigo: "IF678", nome: "INFRA-ESTRUTURA DE COMUNICAÇÃO", creditos: 4, cargaHoraria: 60, professorId: "prof_kelvin", periodo: 3 },
      { codigo: "IF674", nome: "INFRA-ESTRUTURA DE HARDWARE", creditos: 4, cargaHoraria: 60, professorId: "prof_adriano", periodo: 3 },
      { codigo: "LE530", nome: "INGLÊS PARA COMPUTAÇÃO", creditos: 2, cargaHoraria: 30, professorId: "prof_ania", periodo: 3 },
      
      // Período 4
      { codigo: "CIN0141", nome: "LÓGICA PARA COMPUTAÇÃO", creditos: 4, cargaHoraria: 60, professorId: "prof_ruy", periodo: 4 },
      { codigo: "CIN0142", nome: "ESTATÍSTICA E PROBABILIDADE PARA COMPUTAÇÃO", creditos: 4, cargaHoraria: 60, professorId: "prof_renata", periodo: 4 },
      { codigo: "CIN0143", nome: "INTRODUÇÃO A SISTEMAS DISTRIBUÍDOS E REDES DE COMPUTADORES", creditos: 4, cargaHoraria: 60, professorId: "prof_carlos", periodo: 4 },
      { codigo: "CIN0144", nome: "APRENDIZADO DE MÁQUINA E CIÊNCIA DE DADOS", creditos: 4, cargaHoraria: 60, professorId: "prof_ricardo_p", periodo: 4 },
      { codigo: "IF682", nome: "ENGENHARIA SOFTWARE E SISTEMAS", creditos: 4, cargaHoraria: 60, professorId: "prof_paulo_b", periodo: 4 },
      { codigo: "IF683", nome: "INFORMÁTICA TEÓRICA", creditos: 4, cargaHoraria: 60, professorId: "prof_ruy", periodo: 4 },
      
      // Período 5
      { codigo: "IF690", nome: "HISTÓRIA E FUTURO DA COMPUTAÇÃO", creditos: 2, cargaHoraria: 30, professorId: "prof_francisco", periodo: 5 },
      { codigo: "IF687", nome: "INTRODUÇÃO À MULTIMÍDIA", creditos: 4, cargaHoraria: 60, professorId: "prof_giordano", periodo: 5 },
      { codigo: "IF676", nome: "METODOLOGIA_EXPRESSÃO TÉC-CIENTÍFICA", creditos: 2, cargaHoraria: 30, professorId: "prof_patricia", periodo: 5 },
      { codigo: "IF686", nome: "PARADIGMAS LING.COMPUTACIONAIS", creditos: 4, cargaHoraria: 60, professorId: "prof_andre", periodo: 5 },
      { codigo: "IF683", nome: "PROJETO DE DESENVOLVIMENTO", creditos: 4, cargaHoraria: 60, professorId: "prof_geber", periodo: 5 },
      { codigo: "IF688", nome: "TEO.IMPLEMEN.LING. COMPUTACIONAIS", creditos: 4, cargaHoraria: 60, professorId: "prof_leopoldo", periodo: 5 },
    ];

    for (const disc of disciplinasData) {
      await db.insert(disciplinas).values({
        id: `disc_${disc.codigo.toLowerCase()}`,
        codigo: disc.codigo,
        nome: disc.nome,
        creditos: disc.creditos,
        cargaHoraria: disc.cargaHoraria,
        ementa: `Ementa da disciplina ${disc.nome}`,
        professorId: disc.professorId,
      }).onDuplicateKeyUpdate({ set: { nome: disc.nome } });
    }
    console.log(`✅ ${disciplinasData.length} disciplinas criadas!\n`);

    // 4. Criar horários REAIS
    console.log("🕐 Criando horários...");
    
    const horariosData = [
      // CIN0130 - SISTEMAS DIGITAIS
      { disciplinaId: "disc_cin0130", diaSemana: "segunda", horaInicio: "15:00", horaFim: "16:50", sala: "E112" },
      { disciplinaId: "disc_cin0130", diaSemana: "quarta", horaInicio: "13:00", horaFim: "14:50", sala: "E112" },
      
      // CIN0131 - CONCEPÇÃO DE ARTEFATOS DIGITAIS
      { disciplinaId: "disc_cin0131", diaSemana: "terca", horaInicio: "13:00", horaFim: "14:50", sala: "E132" },
      { disciplinaId: "disc_cin0131", diaSemana: "quinta", horaInicio: "15:00", horaFim: "16:50", sala: "E132" },
      
      // CIN0132 - MATEMÁTICA DISCRETA
      { disciplinaId: "disc_cin0132", diaSemana: "terca", horaInicio: "15:00", horaFim: "16:50", sala: "Sala 1 - Área 2" },
      { disciplinaId: "disc_cin0132", diaSemana: "quinta", horaInicio: "13:00", horaFim: "14:50", sala: "Sala 1 - Área 2" },
      
      // CIN0133 - INTRODUÇÃO À PROGRAMAÇÃO
      { disciplinaId: "disc_cin0133", diaSemana: "segunda", horaInicio: "13:00", horaFim: "14:50", sala: "Grad05" },
      { disciplinaId: "disc_cin0133", diaSemana: "quarta", horaInicio: "15:00", horaFim: "16:50", sala: "Grad05" },
      
      // CIN0134 - ARQUITETURA DE COMPUTADORES
      { disciplinaId: "disc_cin0134", diaSemana: "quinta", horaInicio: "10:00", horaFim: "11:50", sala: "E112" },
      { disciplinaId: "disc_cin0134", diaSemana: "sexta", horaInicio: "08:00", horaFim: "09:50", sala: "E112" },
      
      // CIN0135 - ESTRUTURAS DE DADOS
      { disciplinaId: "disc_cin0135", diaSemana: "terca", horaInicio: "08:00", horaFim: "09:50", sala: "Grad05" },
      { disciplinaId: "disc_cin0135", diaSemana: "quinta", horaInicio: "10:00", horaFim: "11:50", sala: "Grad05" },
      
      // CIN0136 - DESENVOLVIMENTO DE SOFTWARE
      { disciplinaId: "disc_cin0136", diaSemana: "segunda", horaInicio: "08:00", horaFim: "09:50", sala: "Grad05" },
      { disciplinaId: "disc_cin0136", diaSemana: "segunda", horaInicio: "10:00", horaFim: "11:50", sala: "Grad05" },
      
      // CIN0137 - BANCO DE DADOS
      { disciplinaId: "disc_cin0137", diaSemana: "segunda", horaInicio: "15:00", horaFim: "16:50", sala: "Sala 9 - Área 2" },
      { disciplinaId: "disc_cin0137", diaSemana: "quarta", horaInicio: "13:00", horaFim: "14:50", sala: "Sala 9 - Área 2" },
      
      // CIN0138 - ÁLGEBRA VETORIAL
      { disciplinaId: "disc_cin0138", diaSemana: "segunda", horaInicio: "13:00", horaFim: "14:50", sala: "Sala 15 - Área 2" },
      { disciplinaId: "disc_cin0138", diaSemana: "terca", horaInicio: "13:00", horaFim: "14:50", sala: "Sala 15 - Área 2" },
      
      // CIN0140 - ALGORITMOS
      { disciplinaId: "disc_cin0140", diaSemana: "terca", horaInicio: "15:00", horaFim: "16:50", sala: "E132" },
      { disciplinaId: "disc_cin0140", diaSemana: "quinta", horaInicio: "13:00", horaFim: "14:50", sala: "E132" },
    ];

    for (const hor of horariosData) {
      await db.insert(horarios).values({
        id: `hor_${hor.disciplinaId}_${hor.diaSemana}`,
        ...hor,
      }).onDuplicateKeyUpdate({ set: { sala: hor.sala } });
    }
    console.log(`✅ ${horariosData.length} horários criados!\n`);

    // 5. Criar matrículas de exemplo
    console.log("📝 Criando matrículas...");
    await db.insert(matriculas).values([
      {
        id: "mat_1",
        alunoId: "aluno_teste1",
        disciplinaId: "disc_cin0130",
        periodo: "2025.2",
        nota1: 8.5,
        nota2: 7.5,
        nota3: null,
        media: 8.0,
        frequencia: 95,
        status: "cursando",
      },
      {
        id: "mat_2",
        alunoId: "aluno_teste1",
        disciplinaId: "disc_cin0131",
        periodo: "2025.2",
        nota1: 9.0,
        nota2: null,
        nota3: null,
        media: 9.0,
        frequencia: 100,
        status: "cursando",
      },
      {
        id: "mat_3",
        alunoId: "aluno_teste2",
        disciplinaId: "disc_cin0137",
        periodo: "2025.2",
        nota1: 7.0,
        nota2: 8.0,
        nota3: null,
        media: 7.5,
        frequencia: 90,
        status: "cursando",
      },
    ]).onDuplicateKeyUpdate({ set: { status: "cursando" } });
    console.log("✅ 3 matrículas criadas!\n");

    // 6. Criar comunicados
    console.log("📢 Criando comunicados...");
    await db.insert(comunicados).values([
      {
        id: "com_1",
        titulo: "Início do Período 2025.2",
        conteudo: "As aulas do período 2025.2 começam no dia 05 de agosto. Verifique seus horários no sistema.",
        tipo: "academico",
        prioridade: "alta",
        autorId: "admin_cin",
        dataPublicacao: new Date("2025-07-20"),
      },
      {
        id: "com_2",
        titulo: "Atualização da Grade de Horários",
        conteudo: "A grade de horários foi atualizada. Confira as mudanças no sistema.",
        tipo: "academico",
        prioridade: "media",
        autorId: "admin_cin",
        dataPublicacao: new Date(),
      },
    ]).onDuplicateKeyUpdate({ set: { titulo: "Início do Período 2025.2" } });
    console.log("✅ 2 comunicados criados!\n");

    console.log("🎉 Seed concluído com sucesso!\n");
    console.log("📊 Dados criados:");
    console.log(`   - 3 usuários`);
    console.log(`   - ${professoresData.length} professores reais`);
    console.log(`   - ${disciplinasData.length} disciplinas reais (CIn 2025.2)`);
    console.log(`   - ${horariosData.length} horários reais`);
    console.log(`   - 3 matrículas de exemplo`);
    console.log(`   - 2 comunicados`);
    console.log("\n✅ Banco de dados populado com dados reais do CIn!\n");

  } catch (error) {
    console.error("❌ Erro ao popular banco de dados:", error);
    throw error;
  } finally {
    process.exit(0);
  }
}

seed();

