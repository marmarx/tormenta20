import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useFilterStore = defineStore("filterStore", () => {
  const filterList = (fullList, all = 0, list) => {
    if (!fullList.value) return []; // full list is expected to be an array of objects [{},{},{}...]
    const ids = list.map(item => item.id); // extract ids from objects
    console.log('store2-here1');
    
    return all
      ? fullList.value.filter((_, i) => !ids.includes(i)) // all but list
      : ids.map(i => fullList.value[i]).filter(item => item !== undefined); // removes undefined
  };

  // Filter by text input
  const filterText = ref("");
  const filterCheck = reactive({ 'Tipo': [], 'Círculo': [], 'Escola': [], 'Publicação': [] });

  // Computed filtering based on text input
  const filterByText = (items) => {
    if (!items?.value) return [];
    return filterText.value
      ? items.value.filter(item => item.Nome.toLowerCase().includes(filterText.value.toLowerCase()))
      : items.value;
  };

  // Computed filtering based on checkbox selection
  const filterByCheck = (items) => {
    if (!items) return [];
    let filteredItems = items;

    Object.keys(filterCheck).forEach((key) => {
      if(filterCheck[key].length > 0){filteredItems = filteredItems.filter(item => item[key].some(e => filterCheck[key].includes(e)))}
    });
  
    return filteredItems;
  };

  // Combined filtering function
  const filterSearch = (list) => {
    console.log('store2-here2');
    let filteredList = filterByText(list);
    return filterByCheck({ value: filteredList })    // Ensuring reactivity
  };

  return { filterList, filterSearch, filterText, filterCheck };
});
