import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCharacterStore = defineStore('characterStore', () => {
  const fetchStorage = () => {
    try{return JSON.parse(localStorage.getItem('tormenta20')) || []}
    catch(error){console.error('Error parsing localStorage!\n',error);return []}
  }

  //State: declare reactive state variables
  const charData = ref(null)  // Current character being viewed/edited
  console.log('--charData--',charData.value)
  watch(charData,() => console.log('--charData--',charData.value),{deep:true})

  //List of characters 
  const charList = ref(null)
  const createCharList = () => fetchStorage().map(char => { return { name: char.name, basic: [ char.stats.raça, ...char.stats.classes.map(c => `${c.classe} ${c.nível}`)] }})
  charList.value = createCharList()
  console.log('--charList--',charList.value)
  watch(charData,() => charList.value = createCharList(),{deep:true})
  watch(charList,() => console.log('--charList--',charList.value),{deep:true})

  //Actions: functions to interact with the state
  const newChar = (name) => {
    const character = ref({
      name,
      stats: {
        raça: 'Raça',
        classes: [{ classe: 'Classe', nível: 1 }]
      },
      spells: []
    })

    const nível_total = computed(() => character.value.stats.classes.reduce((acc, el) => acc + el.nível, 0))
    return { ...character.value, nível_total }
  }

  const createChar = name => {
    console.log(`Creating new character`)
    let storedData = fetchStorage()

    console.log('here',storedData,name)
    console.log(storedData.findIndex(el => el.name === name))

    if(storedData.findIndex(el => el.name === name)>=0){
      const text = `Personagem <${name}> já existe! Deseja sobrescrever?\n\nAtenção: essa operação não poderá ser desfeita!`
      if(!confirm(text)) return
    }
    loadChar(name)
  }

  const loadChar = name => {
    if (charData.value) saveChar()
    console.log(`Loading character <${name}>`)
    const storedData = fetchStorage()
    charData.value = storedData.find(el => el.name === name) || newChar(name)
    console.log(charData.value)
  }

  const saveChar = () => {
    if (!charData.value) return
    console.log(`Saving character <${charData.value.name}>`);
    let storedData = fetchStorage()
    const index = storedData.findIndex(el => el.name === charData.value.name)

    if(index !== -1) storedData[index] = charData.value  //updated existing character
    else storedData.push(charData.value) //add new character

    localStorage.setItem('tormenta20', JSON.stringify(storedData))
    charList.value = createCharList()
  }
  watch(charData,saveChar,{deep:true})
  window.addEventListener('beforeunload', saveChar)
  
  const clearChar = () => {
    if(charData.value) saveChar()
    charData.value = null
  }
  const clearStorage = () => localStorage.setItem('tormenta20', JSON.stringify([]))

  const deleteChar = () => {
    if(!charData.value) return

    const text = `Tem certeza que deseja apagar o personagem <${charData.value.name}>?\n\nAtenção: essa operação não poderá ser desfeita!`
    if(!confirm(text)) return

    console.log(`Deleting character <${charData.value.name}>`);
    let storedData = fetchStorage()
    const index = storedData.findIndex(el => el.name === charData.value.name)
    if(index !== -1){storedData.splice(index,1)}  //remove character
    localStorage.setItem('tormenta20', JSON.stringify(storedData))
    charData.value = null
  }

  //spell functions
  const newSpell = id => ({id,history:new Date().getTime(),edits:{}})   //history: miliseconds since 1970
  const charSpells = computed(() => charData.value?.spells || []) //?. prevents errors if null, similar to 'charData.value?charData.value.spells:[]'

  //computed properties are read-only, instead, mutate 'charData.value.spells'
  const addRemoveSpell = spellId => {
    const index = charData.value.spells.findIndex(el => el.id === spellId)
    if(index !== -1){charData.value.spells.splice(index,1)}  //remove spell
    else{charData.value.spells.push(newSpell(spellId))}  //add spell object to charSpells array
  }

  return { clearStorage, charList, charData, charSpells, createChar, saveChar, loadChar, clearChar, deleteChar, addRemoveSpell }
})


// const fetchStorage = () => {
//   const storedData = (() => {
//     try{
//       const data = localStorage.getItem('tormenta20');
//       if(data) return JSON.parse(data) || []
//     }
//     catch(error){console.error('Error parsing localStorage:', error)}
//     return [];
//   })();

//   return storedData;
// }



// const fetchStorage = () => {
//   let storedData = null;
//   const checkStorage = () => {  
//     if(storedData) return storedData
//     console.log('Parsing localStorage!\n')
//     try{storedData = JSON.parse(localStorage.getItem('tormenta20')) || []}
//     catch(error){console.error('Error parsing localStorage!\n',error)}
//     return storedData
//   } 
//   return checkStorage()
// }