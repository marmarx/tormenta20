import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFilterStore = defineStore("filterStore", () => {
  const filterList = (fullList, all = 0, list) => {
    if (!fullList.value) return []; // full list is expected to be an array of objects [{},{},{}...]
    const ids = list.map(item => item.id); // extract ids from objects
    
    return all
      ? fullList.value.filter((_, i) => !ids.includes(i)) // all but list
      : ids.map(i => fullList.value[i]); // list only   .filter(item => item !== undefined) //removes undefined    
  };
 
  //filter 'Nome' by text input
  const filterText = ref('')
  const filterByText = (items) => computed(() => { 
    if (!items.value) return [];
    return filterText.value
      ? items.value.filter(item => item.Nome.toLowerCase().includes(filterText.value.toLowerCase()))
      : items.value;
  });

  //filter 'Tipo', 'Círculo', 'Escola', 'Publicação' by checkbox selection
  const filterCheck = ref({ 'Tipo': ref([]), 'Círculo': ref([]), 'Escola': ref([]), 'Publicação': ref([]) })  //equal to spellProperties const in spellsStore.js

  const filterByCheck = (items,key) => computed(() => {
    if (!items.value) return [];
    console.log('filterCheck.value[key].value',filterCheck.value[key].value);
    
    return filterCheck.value[key].value.length>0
      ? items.value.filter(item => item[key].some(e => filterCheck.value[key].value.includes(e)))
      : items.value
  });

  const filterSearch = (list) => {
    let filteredList = filterByText(list);
    //Object.keys(filterCheck.value).forEach((key) => filteredList = filterByCheck(filteredList,key))
    return filteredList
  }

  return { filterList, filterSearch, filterText, filterCheck }
});