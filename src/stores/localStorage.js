import {reactive,ref} from 'vue'

const tormenta20 = reactive({})
const character = ref('');

window.addEventListener("load", () => {
  const storedData = localStorage.getItem('tormenta20');
  if(storedData){Object.assign(tormenta20,JSON.parse(storedData))}
});

const save = () => {alert('you are leaving');localStorage.setItem('tormenta20',JSON.stringify(tormenta20))}
window.addEventListener("onbeforeunload",save)

const newChar = (char) => {if(!tormenta20[char]){tormenta20[char] = {spellsList:[]}}}
const load = (char) => character.value = char

//testing:
newChar('Alinnus')
load('Alinnus')

export default tormenta20[character.value];
export const spells = tormenta20[character.value].spellsList;

const chars = [];
Object.keys(tormenta20).forEach(key => chars.push(key))
export const characters = chars