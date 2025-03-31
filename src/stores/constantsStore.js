import { ref } from 'vue'

//goes to atributes.vue
const atributes = ['Força','Destreza','Constituição','Inteligência','Sabedoria','Carisma']

//goes to personagem.vue
const races = [
  '-- Jogo do Ano --', 'Anão', 'Dahllan', 'Elfo', 'Goblin', 'Golem', 'Humano', 'Hynne', 'Kliren', 'Lefou', 'Medusa', 'Minotauro', 'Osteon', 'Qareen', 'Sereia/Tritão', 'Sílfide', 'Suraggel: Aggelus', 'Suraggel: Sulfure', 'Trog',
  '-- Ameaças de Arton --', 'Meio-Orc', 'Orc', 'Tabrachi', 'Ogro', 'Bugbear', 'Hobgoblin', 'Centauro', 'Gnoll', 'Kallyanach', 'Kaijin', 'Kappa', 'Mashin', 'Nezumi', 'Tengu', 'Minauro', 'Kobolts', 'Harpia', 'Ceratops', 'Pteros', 'Velocis', 'Voracis', 'Yidishan', 'Moreau', 'Elfo-do-Mar', 'Nagah', 'Finntroll',
  '-- Deuses e Heróis --', 'Duende', 'Eiradaan', 'Galokk', 'Meio-Elfo', 'Sátiro'
]

const classes = [
  '-- Jogo do Ano --', 'Arcanista', 'Bárbaro', 'Bardo', 'Bucaneiro', 'Caçador', 'Cavaleiro', 'Clérigo', 'Druida', 'Guerreiro', 'Inventor', 'Ladino', 'Lutador', 'Nobre', 'Paladino',
  '-- Deuses e Heróis --', 'Frade', 'Treinador', 'Alquimista', 'Atleta', 'Burguês', 'Duelista', 'Ermitão', 'Inovador', 'Machado de Pedra', 'Magimarcialista', 'Necromante', 'Santo', 'Seteiro', 'Usurpador', 'Vassalo', 'Ventanista', 
  '-- Dragão Brasil --', 'Miragem', 'Místico', 'Samurai'
]

const distinções = []

const origens = [
  '-- Jogo do Ano --', 'Acólito', 'Amigo dos Animais', 'Amnésico', 'Aristocrata', 'Artesão', 'Artista', 'Assistente de Laboratório', 'Batedor', 'Capanga', 'Charlatão', 'Circense', 'Criminoso', 'Curandeiro', 'Eremita', 'Escravo', 'Estudioso', 'Fazendeiro', 'Forasteiro', 'Gladiador', 'Guarda', 'Herdeiro', 'Herói Camponês', 'Marujo', 'Mateiro', 'Membro de Guilda', 'Mercador', 'Minerador', 'Nômade', 'Pivete', 'Refugiado', 'Seguidor', 'Selvagem', 'Soldado', 'Taverneiro', 'Trabalhador',
  '-- Atlas de Arton --', 'Agricultor Sambur', 'Amazona de Hippion', 'Amoque Púrpura', 'Anão de Armas', 'Andarilho Ubaneri', 'Aprendiz de Dragoeiro', 'Aprendiz de Drogadora', 'Aristocrata Dai’zenshi', 'Armeiro Armado', 'Aspirante a Herói', 'Assistente Forense', 'Bandoleiro da Fortaleza', 'Barão Arruinado', 'Catador da Cidade Velha', 'Cativo das Fadas', 'Competidor do Circuito', 'Cosmopolita', 'Cria da Favela', 'Criado pelas Voracis', 'De Outro Mundo', 'Descendente Colleniano', 'Desertor da Supremacia', 'Duplo Feérico', 'Duyshidakk Infiltrado', 'Emissário Ubaner', 'Escudeiro da Luz', 'Escudeiro Solitário', 'Estandarte Vivo', 'Estudante da Academia', 'Estudante do Colégio Real', 'Explorador de Ruínas', 'Filhote da Revoada', 'Futura Lenda', 'Ginete de Tumarkhân', 'Grumete Pirata', 'Guardião Glacial', 'Iniciado dos Caça-Monstros', 'Insurgente Tapistano', 'Irmão sem Esporas', 'Legionário', 'Lenhador de Tollon', 'Liricista de Lenórienn', 'Membro do Principado', 'Nitamuraniano', 'Nobre Zakharoviano', 'Nômade Sar-Allan', 'Pescador Parrudo', 'Plebeu Arcano', 'Prisioneiro das Catacumbas', 'Procurado: Vivo ou Morto', 'Profeta do Akzath', 'Querido Filho', 'Rebelde Agitador', 'Receptador das Nuvens', 'Recruta Arcano', 'Recruta da Fênix', 'Sábio Matemático', 'Selvagem Sanguinário', 'Sucateiro de Batalhas', 'Tamalu', 'Tocado pela Dama Altiva', 'Tocado pelo Indomável', 'Tradicionalista Svalano', 'Trapaceiro Ahleniense', 'Turista da Academia', 'Um com os Kami'
]

const divindades = [
  'O Bem', 'O Mal', 'O Panteão',
  '-- Deuses Maiores --', 'Aharadak', 'Allihanna', 'Arsenal', 'Azgher', 'Hyninn', 'Kallyadranoch', 'Khalmyr', 'Lena', 'Lin-Wu', 'Marah', 'Megalokk', 'Nimb', 'Oceano', 'Sszzaas', 'Tanna-Toh', 'Tenebra', 'Thwor', 'Thyatis', 'Valkaria', 'Wynna',
  '-- Deuses Menores --', 'Gwendolynn', 'Mauziell', 'Tibar',
  '-- Desues Antigos --', 'Glórienn', 'Keenn', 'Ragnar', 'Tauron', 'Tilliann',
]

const tamanhos = ['Minúsculo','Pequeno','Médio','Grande','Enorme','Colossal']
const níveis = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

const deslocamentos = {
  tipo: ['Terrestre','Escalada','Natação','Vôo'],
  velocidade: ['6m 4q', '9m 6q', '12m 8q', '15m 10q', '18m 12q', '24m 16q', '30m 20q', '90m 60q']
}


//all properties in:
// - spells.json: 'id','Nome','Tipo','Círculo','Escola','Ação','Alvo','Alcance','Área','Efeito','Duração','Resistência','Descrição','Publicação','mod'

//goes to spellsStore.js
const editKeys = {}
editKeys.spells = ['Tipo','Círculo','Escola','Ação','Alvo','Alcance','Área','Efeito','Duração','Resistência'] //aka spellEditKeys

//goes to sortStore.js
const customOrder = {}
customOrder.spells = {    //aka spellsCustomOrder
  'Ação':['Livre', 'Movimento', 'Padrão', 'Completa', 'Reação'],
  'Alcance':['pessoal','toque','curto (9m 6q)','médio (30m 20q)','longo (90m 60q)','ilimitado (veja texto)','veja texto'],
}

//goes to sortStore.js
const sortNumbers = {}
sortNumbers.spells = ['Círculo']  //aka sortNumbers

const selectOptions = {}
selectOptions.spells = ['Tipo','Círculo','Escola','Ação']  //['Tipo','Círculo', 'Escola','Ação','Alvo','Alcance','Área','Efeito','Duração','Resistência']

//goes to filtros.vue
const orderOptions = {}
orderOptions.spells = ['Nome',...selectOptions.spells,'Publicação','Adicionada em...']  //aka declared constant within :options

//goes to filterStore.js
const filterCheckbox = {}
filterCheckbox.spells = ref(selectOptions.spells.reduce((acc, key) => { acc[key] = []; return acc}, { 'Publicação': [] })) //aka filterCheck
//const filterCheck = ref({ 'Tipo': [], 'Círculo': [], 'Escola': [], 'Ação': [], 'Alcance':[], 'Publicação': [] });

//goes to spellsStore.js
const mainProperties = {}
mainProperties.spells = ref(selectOptions.spells.reduce((acc, key) => { acc[key] = ref([]); return acc},{}))  //aka spellProperties
mainProperties.spells.value['Publicação'] = ref([])
//const spellProperties = ref({ 'Tipo': ref([]), 'Círculo': ref([]), 'Escola': ref([]), 'Ação': ref([]), 'Alcance':ref([]), 'Publicação': ref([]) })

//goes to detalhes.vue
const avoidProperties = {}
avoidProperties.spells = ['id','Nome','Tipo','Círculo','Escola','mod','Publicação'] //aka avoid


export { atributes, races, classes, distinções, níveis, origens, divindades, tamanhos, deslocamentos,
  editKeys, customOrder, sortNumbers, selectOptions, orderOptions, filterCheckbox, mainProperties, avoidProperties }