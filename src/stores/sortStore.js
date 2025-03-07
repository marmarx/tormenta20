import { ref } from 'vue'
import { defineStore } from "pinia";

export const useSortStore = defineStore("sortStore", () => {
  const sortNumber = (items,property) => items.sort((a,b) => a[property] - b[property])
  const sortString = (items,property) => items.sort((a,b) => a[property].localeCompare(b[property]))

  const sortBy = ref(null)
  const sorter = (char,items) => {   //'Nome','Círculo','Escola','Publicação','Adicionada em...'
    if(!sortBy.value) return items
    if(sortBy.value==='Adicionada em...') {
      const sorteredCharItems = sortNumber(char,'history')
      console.log('sorteredCharItems',sorteredCharItems)
      return sortNumber(items,sorteredCharItems.id)
    }
    if(sortBy.value==='Círculo') return sortNumber(items,sortBy.value)
    return sortString(items,sortBy.value)
  }

  return { sorter, sortBy };
}); 