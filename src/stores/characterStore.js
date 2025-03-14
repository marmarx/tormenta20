// stores/characterStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCharacterStore = defineStore('characterStore', () => {
  const fetchStorage = () => {
    try{return JSON.parse(localStorage.getItem('tormenta20')) || []}
    catch(error){console.error('Error parsing localStorage!\n',error);return []}
  }

  //State: declare reactive state variables
  const charData = ref(null)  // Current character being viewed/edited
  const charList = computed(() => fetchStorage().map(item => item.name))// List of characters 

  //Actions: functions to interact with the state
  const loadChar = name => {
    if (charData.value) saveChar()
    console.log(`Loading character <${name}>`)
    const storedData = fetchStorage()
    charData.value = storedData.find(el => el.name === name) || { name, spells: [] }
  }
  const newChar = loadChar

  const saveChar = () => {
    if (!charData.value) return
    console.log(`Saving character <${charData.value.name}>`);
    let storedData = fetchStorage()
    const index = storedData.findIndex(el => el.name === charData.value.name)

    if(index !== -1){storedData[index] = charData.value}  //updated existing character
    else{storedData.push(charData.value)} //add new character

    localStorage.setItem('tormenta20', JSON.stringify(storedData))
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

  return { clearStorage, charList, charData, charSpells, newChar, saveChar, loadChar, clearChar, deleteChar, addRemoveSpell }
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