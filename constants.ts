import { Question, Task, WeeklyData, SefaCargo } from './types';

export const WEEKLY_DATA: WeeklyData[] = [
  { day: 'S', hours: 4, met: true },
  { day: 'T', hours: 3.5, met: true },
  { day: 'Q', hours: 2, met: false },
  { day: 'Q', hours: 5, met: true }, 
  { day: 'S', hours: 0, met: false },
  { day: 'S', hours: 0, met: false },
  { day: 'D', hours: 0, met: false },
];

export const SEFA_CARGOS: SefaCargo[] = [
  {
    id: 'afre',
    name: 'Auditor Fiscal de Receitas Estaduais',
    subjects: [
      { name: 'Português', category: 'Gerais' },
      { name: 'Mat. Financeira e Estatística', category: 'Gerais' },
      { name: 'Adm. Pública e Ética', category: 'Gerais' },
      { name: 'D. Administrativo, Civil e Penal', category: 'Gerais' },
      { name: 'Direito Constitucional', category: 'Gerais' },
      { name: 'Fluência em Dados', category: 'Gerais' },
      { name: 'Direito Tributário', category: 'Específicos' },
      { name: 'Legislação Tributária do Pará', category: 'Específicos' },
      { name: 'Contabilidade Geral, Avançada e de Custos', category: 'Específicos' },
      { name: 'Auditoria', category: 'Específicos' },
      { name: 'Economia Regional', category: 'Específicos' },
    ]
  },
  {
    id: 'fre',
    name: 'Fiscal de Receitas Estaduais',
    subjects: [
      { name: 'Português', category: 'Gerais' },
      { name: 'Mat. Financeira e Estatística', category: 'Gerais' },
      { name: 'Adm. Pública e Ética', category: 'Gerais' },
      { name: 'D. Administrativo, Civil e Penal', category: 'Gerais' },
      { name: 'Fluência em Dados', category: 'Gerais' },
      { name: 'Direito Tributário', category: 'Específicos' },
      { name: 'Legislação Tributária do Pará', category: 'Específicos' },
      { name: 'Contabilidade Geral', category: 'Específicos' },
      { name: 'Direito Constitucional', category: 'Específicos' },
      { name: 'Economia Regional', category: 'Específicos' },
    ]
  }
];

export const MOCK_QUESTIONS: Question[] = [
  // PORTUGUÊS (Q1 do PDF)
  {
    id: 'Q2297189',
    subject: 'Português',
    text: 'De acordo com o texto "Comida de plástico", assinale a alternativa correta:',
    options: [
      { id: 'a', text: 'O cineasta americano engordou 10 Kg em 30 dias para provar os malefícios de uma dieta baseada em fast-food.', isCorrect: true },
      { id: 'b', text: 'A quantidade de plastificantes no Brasil é superior à dos EUA.', isCorrect: false },
      { id: 'c', text: 'Os EUA não regulamentam ftalatos, mas o Brasil possui legislação rígida.', isCorrect: false },
      { id: 'd', text: 'Marcas populares apresentam índices baixos de plastificantes.', isCorrect: false },
      { id: 'e', text: 'Alimentos ultraprocessados não devem ser ingeridos em hipótese alguma.', isCorrect: false },
    ],
    explanation: 'Conforme as linhas 1-5 do texto, Morgan Spurlock engordou mais de 10 quilos em 30 dias comendo apenas McDonald\'s para seu documentário.'
  },
  // MAT. FINANCEIRA (Q21 do PDF)
  {
    id: 'Q2297280',
    subject: 'Mat. Financeira e Estatística',
    text: 'Luísa comprou um colar de R$ 5.000,00, pagando entrada de R$ 2.000,00 e parcela de R$ 3.200,00 após 60 dias. Qual a taxa de juros anual simples?',
    options: [
      { id: 'a', text: '3,33%.', isCorrect: false },
      { id: 'b', text: '4,5%.', isCorrect: false },
      { id: 'c', text: '5,7%.', isCorrect: false },
      { id: 'd', text: '6,9%.', isCorrect: false },
      { id: 'e', text: '40%.', isCorrect: true },
    ],
    explanation: 'Capital financiado = 5000 - 2000 = 3000. Juros = 3200 - 3000 = 200. Taxa bimestral = 200/3000 = 6,66%. Anual (6,66% * 6) = 40%.'
  },
  // ADM PÚBLICA (Q41 do PDF)
  {
    id: 'Q2297595',
    subject: 'Adm. Pública e Ética',
    text: 'Em relação à governança pública, qual aspecto NÃO se inclui nos seus pilares modernos?',
    options: [
      { id: 'a', text: 'Compartilhamento do poder.', isCorrect: false },
      { id: 'b', text: 'Descentralização de decisões.', isCorrect: false },
      { id: 'c', text: 'Relacionamento horizontal.', isCorrect: false },
      { id: 'd', text: 'Formação de redes públicas.', isCorrect: false },
      { id: 'e', text: 'Hierarquia administrativa rígida entre atores sociais.', isCorrect: true },
    ],
    explanation: 'A governança moderna pressupõe redes horizontais e colaboração, rompendo com a hierarquia rígida tradicional do modelo burocrático.'
  },
  // D. ADMIN / CIVIL / PENAL (Q51 e Q65 do PDF)
  {
    id: 'Q2297628',
    subject: 'D. Administrativo, Civil e Penal',
    text: 'Sobre o princípio da moralidade na Administração Pública, é correto afirmar:',
    options: [
      { id: 'a', text: 'Agentes podem atuar conforme livre convicção.', isCorrect: false },
      { id: 'b', text: 'Moralidade é apenas o conjunto de normas internas.', isCorrect: false },
      { id: 'c', text: 'Traduz-se no comportamento ético aceito, não se confundindo com a moral comum.', isCorrect: true },
      { id: 'd', text: 'O Judiciário não pode controlar a moralidade administrativa.', isCorrect: false },
      { id: 'e', text: 'A moralidade pura não serve para controle social.', isCorrect: false },
    ],
    explanation: 'A moralidade administrativa é um conceito jurídico autônomo, focada na probidade e boa-fé objetiva, diferente da moral individual ou puramente social.'
  },
  {
    id: 'Q2297762',
    subject: 'D. Administrativo, Civil e Penal',
    text: 'Qual o nome do instituto que revoga formalmente uma conduta típica mas a mantém criminalizada em outro tipo penal?',
    options: [
      { id: 'a', text: 'Abolitio Criminis.', isCorrect: false },
      { id: 'b', text: 'Novatio legis in mellius.', isCorrect: false },
      { id: 'c', text: 'Continuidade típico normativa.', isCorrect: true },
      { id: 'd', text: 'Tipicidade conglobante.', isCorrect: false },
      { id: 'e', text: 'Territorialidade por extensão.', isCorrect: false },
    ],
    explanation: 'Na continuidade típico-normativa, a infração não deixa de ser crime, apenas passa a ser prevista em outro dispositivo legal.'
  },
  // CONSTITUCIONAL (Q71 do PDF)
  {
    id: 'Q2297784',
    subject: 'Direito Constitucional',
    text: 'Julgue: Estrangeiros residentes há mais de 15 anos sem condenação podem requerer nacionalidade brasileira. (V/F)',
    options: [
      { id: 'a', text: 'Verdadeiro.', isCorrect: true },
      { id: 'b', text: 'Falso.', isCorrect: false },
    ],
    explanation: 'Conforme o Art. 12 da CF/88, trata-se da hipótese de naturalização extraordinária.'
  },
  // TECNOLOGIA DA INFORMAÇÃO (Q94 do PDF)
  {
    id: 'Q2297979',
    subject: 'Tecnologia da Informação',
    text: 'No BPM, qual notação utiliza um conjunto padronizado de símbolos para modelagem de processos de negócio?',
    options: [
      { id: 'a', text: 'BPMN.', isCorrect: true },
      { id: 'b', text: 'Fluxograma.', isCorrect: false },
      { id: 'c', text: 'EPC.', isCorrect: false },
      { id: 'd', text: 'UML.', isCorrect: false },
      { id: 'e', text: 'Value Stream.', isCorrect: false },
    ],
    explanation: 'BPMN (Business Process Model and Notation) é o padrão mundial para representar graficamente os processos de negócio.'
  }
];