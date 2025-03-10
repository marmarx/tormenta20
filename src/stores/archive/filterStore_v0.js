// //This version is proven to be very demanding and freezes the app

// import { defineStore } from "pinia";
// import { ref } from "vue";

// export const useFilterStore = defineStore("filterStore", () => {
//   const filterList = (fullList, all = 0, list) => {
//     if (!fullList.value) return []; // full list is expected to be an array of objects [{},{},{}...]
//     const ids = list.map(item => item.id); // extract ids from objects
    
//     return all
//       ? fullList.value.filter((_, i) => !ids.includes(i)) // all but list
//       : ids.map(i => fullList.value[i]); // list only   .filter(item => item !== undefined) //removes undefined    
//   }
 
//   //filter 'Nome' by text input
//   const filterText = ref('')
//   const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g,'')

//   const filterByText = (items) => {
//     if(!items.value) return []

//     items.value.forEach(e => e.Nome = e.Nome.replaceAll('<b>','').replaceAll('</b>',''))
//     if(!filterText.value||filterText.value==='') return items.value

//     const normalizedFilterText = removeAccents(filterText.value.toLowerCase())
//     let result = items.value.filter(item => removeAccents(item.Nome.toLowerCase()).includes(normalizedFilterText))
//     result.forEach(e => {
//       let indexes = [...removeAccents(e.Nome).matchAll(new RegExp(normalizedFilterText,'gi'))].map(match => match.index);
//       e.Nome = e.Nome.split('');
//       for (let i=indexes.length-1; i>=0; i--){       
//         e.Nome.splice(indexes[i] + filterText.value.length,0,'</b>')
//         e.Nome.splice(indexes[i],0,'<b>')
//       }
//       e.Nome = e.Nome.join('')
//     });
//     return result
//   }

//   //filter 'Tipo', 'Círculo', 'Escola', 'Publicação' by checkbox selection
//   const filterCheck = ref({ 'Tipo': [], 'Círculo': [], 'Escola': [], 'Publicação': [] })  //equal to spellProperties const in spellsStore.js

//   const filterByCheck = (items,key) => {
//     if (!items.value) return [];
//     if(!filterCheck.value[key]||filterCheck.value[key].length===0) return items.value

//     return items.value.filter(item => {
//       if(Array.isArray(item[key])) return item[key].some(e => filterCheck.value[key].includes(e))
//       return filterCheck.value[key].includes(item[key]);
//     })
//   }

//   const filterSearch = (fullList, all = 0, list) => {
//     let filteredList = ref([])
//     filteredList.value = filterList(fullList, all, list)
//     filteredList.value = filterByText(filteredList)
//     Object.keys(filterCheck.value).forEach((key) => filteredList.value = filterByCheck(filteredList, key))
//     return filteredList.value
//   }

//   return { filterList, filterSearch, filterText, filterCheck }
// });