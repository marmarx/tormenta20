// import {ref,watch,computed} from 'vue'
// // import { onBeforeRouteLeave } from 'vue-router';

// // const charList = ref([])
// // const char = ref(null)
// const newCharacter = val => ({name:val,spells:[]})
// // const currentCharacter = ref(newCharacter(''))

// // const fetchStorage = () => {
// //   try{return JSON.parse(localStorage.getItem('tormenta20')) || []}
// //   catch(error){console.error('Error parsing localStorage!\n',error);return []}
// // }

// // const listChar = () => {
// //   const storedData = fetchStorage()
// //   return storedData.map(item => item.name)
// // }
// // charList.value = listChar();

// const newChar = val => currentCharacter.value = newCharacter(val)

// // const loadChar = val => {
// //   console.log(`Loading character <${val}>`);
// //   const storedData = fetchStorage()
// //   currentCharacter.value = storedData.find(el => el.name === val) || newCharacter(val)
// // }

// // const saveChar = () => {
// //   if(!char.value) return
// //   console.log(`Saving character <${char.value}>`);

// //   let storedData = fetchStorage()
// //   const index = storedData.findIndex(el => el.name === char.value);

// //   if(index !== -1){storedData[index] = currentCharacter.value}  //updated existing character
// //   else{storedData.push(currentCharacter.value)} //add new character

// //   localStorage.setItem('tormenta20',JSON.stringify(storedData))
// // }
// watch(currentCharacter,saveChar,{deep:true})
// window.addEventListener('beforeunload', saveChar)
// // onBeforeRouteLeave(() => {saveChar()})

// watch(char, (newVal,oldVal) => {
//   if(oldVal) saveChar()
//   if(charList.value.includes(newVal)){loadChar(newVal)}
//   else{newChar(newVal);charList.value.push(newVal)}
// })

// const clear = () => {
//   if(char.value) saveChar()
//   char.value = null
//   currentCharacter.value = newCharacter('')
// }
// const deleteStorage = () => localStorage.clear()

// //test start
// //deleteStorage()
// //clear()
// char.value = 'Boreas'
// //test end

// export default currentCharacter
// // export const spells = computed(() => currentCharacter.value?.spells || [])  //?. prevents errors if null