import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore("filterStore", () => {
  const filterList = (fullList, all = 0, list) => {
    if (!fullList.value) return [];   //full list is expected to be an array of objects [{},{},{}...]
    const ids = list.map(item => item.id);  //extract ids from objects
    
    return all
      ? fullList.value.filter((_, i) => !ids.includes(i))
      : ids.map(i => fullList.value[i]); // .filter(item => item !== undefined)  // Removes undefined
  };

  //filter by text input
  const filterText = ref('');
  const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, '');

  const filterByText = (items) => {
    if (!items.value) return [];

    const normalizedFilterText = removeAccents(filterText.value.trim().toLowerCase());
    if (!normalizedFilterText) return items.value.map(e => ({ ...e, Nome: e.Nome.replace(/<\/?b>/g, '') }));

    return items.value
      .filter(item => removeAccents(item.Nome.toLowerCase()).includes(normalizedFilterText))
      .map(item => {
        const regex = new RegExp(`(${filterText.value})`, "gi");
        return { ...item, Nome: item.Nome.replace(/<\/?b>/g, '').replace(regex, "<b>$1</b>")}
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

  const filterSearch = (fullList, all = 0, list) => {
    let filteredList = ref(filterList(fullList, all, list));
    filteredList.value = filterByText(filteredList);
    Object.keys(filterCheck.value).forEach((key) => filteredList.value = filterByCheck(filteredList, key));
    return filteredList.value;
  };

  return { filterList, filterSearch, filterText, filterCheck };
});