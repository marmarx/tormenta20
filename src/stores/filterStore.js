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

  const filterText = ref('')

  //filter 'Nome' by text input
  const filterByText = (items) => computed(() => {
    if (!items.value) return [];
    return filterText.value
      ? items.value.filter(item => item.Nome.toLowerCase().includes(filterText.value.toLowerCase()))
      : items.value;
  });

  const filterBoolean = (items) => computed(() => {
    if (!items.value) return [];
    return []
  });

  return { filterText, filterList, filterByText, filterBoolean }
});




//  (props.all,props.list)