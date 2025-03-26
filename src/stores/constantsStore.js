import { ref } from 'vue'

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

export { editKeys, customOrder, sortNumbers, selectOptions, orderOptions, filterCheckbox, mainProperties, avoidProperties }