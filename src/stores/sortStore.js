import { ref } from 'vue'
import { defineStore } from "pinia";

export const useSortStore = defineStore("sortStore", () => {
  const sortNumber = (items,property) => items.sort((a,b) => a[property] - b[property])
  const sortString = (items,property) => items.sort((a,b) => a[property].localeCompare(b[property]))

  const sortBy = ref(null)  //'Nome','Círculo','Escola','Publicação','Adicionada em...'
  const sortNumbers = ['Círculo']

  const sorter = (char,items) => {
    if(!sortBy.value) return items

    if(sortBy.value==='Adicionada em...'){  //special sorting case
      const sorteredCharItems = sortNumber(char,'history')
      const orderMap = new Map(sorteredCharItems.map((u, index) => [u.id, index]));

      items.sort((a, b) => {
        const indexA = orderMap.has(a.id) ? orderMap.get(a.id) : Infinity;
        const indexB = orderMap.has(b.id) ? orderMap.get(b.id) : Infinity;
        return indexA - indexB || a.id - b.id;
      });

      return items
    }

    if(sortNumbers.includes(sortBy.value)) return sortNumber(items,sortBy.value)
    return sortString(items,sortBy.value)
  }

  return { sorter, sortBy };
})