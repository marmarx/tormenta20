// import { ref,computed } from "vue";

// const spellsStore = () => {
//   const allSpells = ref(null); // Global variable, retains value across function calls
//   const spellNumber = computed(() => allSpells.value?allSpells.value.length:219)

//   const fetchSpells = async () => {
//     if(!allSpells.value){
//       const data = await fetch('/db/spells.json')
//         .then(response => response.json())
//         .then(results => {
//           console.log('Spells JSON loaded successfully!');
//           return results
//         })
//         .catch(error => console.log('Spells JSON failed to load:\n',error));
//       allSpells.value = data;
//     }
//   }

//   const findSpells = async (all=0,list) => {
//     await fetchSpells();
//     if(!allSpells.value) return [];
//     if(all){return allSpells.value.filter((_,i) => !list.includes(i))}  //all but list
//     if(list){return list.map(i => allSpells.value[i])}  //list only
//   }
//   return [findSpells,spellNumber]
// }
// const [useSpellStore,spellNumber] = spellsStore();
// export {useSpellStore,spellNumber};