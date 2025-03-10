import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore("filterStore", () => {
  const filterList = (fullList, activeTab = 0, list) => {
    if (!fullList.value) return [];   //full list is expected to be an array of objects [{},{},{}...]
    const ids = list.map(item => item.id);  //extract ids from objects
    
    return activeTab
      ? fullList.value.filter((_, i) => !ids.includes(i))
      : ids.map(i => fullList.value[i]); // .filter(item => item !== undefined)  // Removes undefined
  };

  //filter by text input
  const filterText = ref('');
  const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, '');

  const filterByText = (items) => {
    if (!items.value) return [];

    const normalizedFilterText = removeAccents(filterText.value.trim().toLowerCase());
    if (!normalizedFilterText) return items.value.map(e => ({ ...e, Nome: e.Nome.replace(/<\/?b>/g, '') }));  //remove any residual </?b> tags

    const regex = new RegExp(normalizedFilterText, 'gi');

    // return items.value
    // .filter(item => removeAccents(item.Nome.toLowerCase()).includes(normalizedFilterText))
    // .map(item => {return { ...item, Nome: item.Nome.replace(/<\/?b>/g, '').replace(regex, "<b>$1</b>")}});   //although simpler, this won't match accents and specialcharacters

    return items.value
    .filter(item => removeAccents(item.Nome.toLowerCase()).includes(normalizedFilterText))
    .map(item => {
      let originalText = item.Nome.replace(/<\/?b>/g, ''); //remove existing </?b> tags from filtered itens
      let normalizedText = removeAccents(originalText.toLowerCase());
      let charArray = originalText.split('');
  
      let indexes = [...normalizedText.matchAll(regex)].map(match => match.index);
      for (let i = indexes.length-1; i>=0; i--){   //add </?b> tags one by one in reverse to prevent unwanted changes to the next item position/index
        charArray.splice(indexes[i] + filterText.value.length, 0, '</b>');
        charArray.splice(indexes[i], 0, '<b>');
      }
  
      return { ...item, Nome: charArray.join('') };
    });
  };

  //filter by checkbox selection
  const filterCheck = ref({ 'Tipo': [], 'Círculo': [], 'Escola': [], 'Publicação': [] });

  const filterByCheck = (items, key) => {
    if (!items.value) return [];
    if (!filterCheck.value[key] || filterCheck.value[key].length === 0) return items.value;

    return items.value.filter(item => {
      if (Array.isArray(item[key])) return item[key].some(e => filterCheck.value[key].includes(e));
      return filterCheck.value[key].includes(item[key]);
    });
  };

  const filterSearch = (fullList, activeTab, list) => {
    let filteredList = ref(filterList(fullList, activeTab, list));
    filteredList.value = filterByText(filteredList);
    Object.keys(filterCheck.value).forEach((key) => filteredList.value = filterByCheck(filteredList, key));
    return filteredList.value;
  };

  return { filterList, filterSearch, filterText, filterCheck };
});