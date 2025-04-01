import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { uuidv4 } from '@/stores/utility'
import { t20color } from './t20colorStore'

export const useCharacterStore = defineStore('characterStore', () => {

  // -- Storage: functions to interact with localStorage --
  const fetchStorage = () => {
    try{return JSON.parse(localStorage.getItem('tormenta20')) || []}
    catch(error){console.error('Error parsing localStorage!\n',error);return []}
  }

  const saveStorage = data => localStorage.setItem('tormenta20', JSON.stringify(data))
  const clearStorage = () => {
    if(!charData.value) return;
    const text = `Seus dados são armazenados apenas localmente neste dispositivo, ou seja, nada é armazenado online ou em outro dispositivo. Tem certeza que deseja apagar todos os dados?\n\nAtenção: essa operação não poderá ser desfeita!`

    if(!confirm(text)) return;
    localStorage.setItem('tormenta20', JSON.stringify([]))
    charData.value = null
    console.log('--- All data deleted ---')
    createChar('Novo personagem')
  }

  // -- State: declare reactive state variables --
  const createCharList = () => fetchStorage().map(char => ({ id:char.id, name:char.name, basic:[ char.stats.raça, ...char.stats.classes
    .map(c => c.classe&&c.nível?`${c.classe} ${c.nível}`:'')
    .filter(c => c.trim()!='')]
  }))

  const charData = ref(null)  //current character being viewed/edited
  const charList = ref(createCharList())   //list of all characters in storage

  watch(charData,() => console.log(charData.value),{deep:true}) //debugging: watch for changes in charData

  //Actions: functions to interact with the state and storage
  const newChar = (name) => {
    const character = ref({
      id: uuidv4(),
      name,
      nível_total: 1,
      stats: {
        jogador: '',  //text
        atributos: {força: 0, destreza: 0, constituição: 0, inteligência: 0, sabedoria: 0, carisma: 0}, //number
        raça: 'Raça', //select
        origem: [], //select + checkbox
        classes: [{ classe: '', nível: 1 }],  //select, select
        distinção: [{ distinção: '', nível: 1 }],  //select, select
        divindade: [],  //select + checkbox
        tamanho: 'Tamanho', //select
        deslocamento: [{ tipo: 'Terrestre', velocidade: '9m 6q' }],  //select, select
        pv: '0',  //number
        pm: '0', //number
        experiência: '' //number
      },
      config: { color: '#b72a2b' },
      spells: [],
      poderes: []
    })

    return character.value
  }

  const nível_total = computed(() => charData.value.stats.classes.reduce((acc, el) => acc + el.nível, 0) + charData.value.stats.distinção.reduce((acc, el) => acc + el.nível, 0))

  const createChar = name => {
    console.log(`--- Creating new character ---`)
    let storedData = fetchStorage()

    const newCharacter = newChar(name)
    storedData.push(newCharacter)

    saveStorage(storedData)
    loadChar(newCharacter.id)
  }

  const loadChar = id => {
    if (charData.value) saveChar()

    const storedData = fetchStorage()
    charData.value = storedData.find(el => el.id === id) || null

    if(charData.value) console.log(`--- Loading character <${charData.value.name}> ---`)
    else console.log(`--- There are no characters in storage! ---`)
  }

  const saveChar = () => {
    if (!charData.value) return;
    console.log(`--- Saving character <${charData.value.name}> ---`)

    let storedData = fetchStorage()
    const index = storedData.findIndex(el => el.id === charData.value.id)

    charData.value.nível_total = nível_total.value

    if(index !== -1) storedData[index] = charData.value  //updated existing character
    else storedData.push(charData.value) //add new character

    saveStorage(storedData)
    charList.value = createCharList()
  }
  watch(charData,saveChar,{deep:true})
  window.addEventListener('beforeunload', saveChar)
  
  const clearChar = () => {
    if(charData.value) saveChar()
    charData.value = null
  }

  const deleteChar = () => {
    if(!charData.value) return;
    const text = `Tem certeza que deseja apagar o personagem <${charData.value.name}>?\n\nAtenção: essa operação não poderá ser desfeita!`

    if(!confirm(text)) return;
    console.log(`--- Deleting character <${charData.value.name}> ---`);

    let storedData = fetchStorage()
    const index = storedData.findIndex(el => el.id === charData.value.id)

    if(index !== -1){storedData.splice(index,1)}  //remove character
    saveStorage(storedData)

    charData.value = null;
    charList.value = createCharList()

    if(charList.value.length) loadChar(charList.value[0].id)
    else createChar('Novo personagem')
  }

  const renameChar = (newName) => {
    if (!charData.value) return;
    if (!newName.trim()) return alert("Nome inválido! Por favor, insira outro nome :)");
  
    let storedData = fetchStorage()
    const index = storedData.findIndex(el => el.id === charData.value.id)
    
    if (index === -1) return alert(`Personagem não encontrado!`);
    console.log(`--- Renaming character <${charData.value.name}> to <${newName}> ---`)
  
    storedData[index].name = newName //rename character in storage
    saveStorage(storedData)
      
    charData.value.name = newName //rename in memory
  
    charList.value = createCharList() //update charList to reflect the new name
  }

  const importChar = () => {
    if(!window.FileReader) return console.log('--- Browser not supported: cannot import ---')
    let reader = new FileReader()
    reader.onload = () => {
      console.log('--- File uploaded, reading file ---')
      charData.value = JSON.parse(event.target.result)
      console.log(`--- Imported character <${charData.value.name}> ---`)
    }
    reader.onerror = () => alert('Erro ao ler arquivo, por favor, tente novamente...')
    reader.readAsText(event.target.files[0])
  }

  const exportChar = () => {
    let filename = `${charData.value.name} - ${charList.value[0].basic.filter(Boolean).join(' - ')}.json`
    let filedata = JSON.stringify(charData.value, (_, value) => isNaN(value)?value:Number(value), 2)
    let file = new Blob([filedata], {type:'application/json'})  //for .txt use {type:'text/plain'}

    if(window.navigator.msSaveOrOpenBlob) return window.navigator.msSaveOrOpenBlob(file,filename) //IE 10+
    let a = document.createElement('a')
    let url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
    console.log('--- Exported character <${charData.value.name}> ---')
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

  return { clearStorage, charList, charData, charSpells, createChar, renameChar, saveChar, loadChar, clearChar, deleteChar, importChar, exportChar, addRemoveSpell }
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