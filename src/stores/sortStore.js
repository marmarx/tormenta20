import { ref, watch } from 'vue'
import { defineStore } from "pinia";

export const useSortStore = defineStore("sortStore", () => {
  const sortNumber = (items,property) => items.sort((a,b) => a[property] - b[property])

  const sortString = (items, property) =>
    items.sort((a, b) => {
      const valA = Array.isArray(a[property]) ? a[property][0] : a[property];
      const valB = Array.isArray(b[property]) ? b[property][0] : b[property];
      return valA.localeCompare(valB);
    });

  const sortCustom = (key) => (a, b) => {
    const order = orderObj[key]
    const valueA = typeof a === 'object' && a !== null ? a[key] : a;
    const valueB = typeof b === 'object' && b !== null ? b[key] : b;

    const indexA = order.indexOf(valueA);
    const indexB = order.indexOf(valueB);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB  //if both elements are in the predefined order, sort by that order
    if (indexA !== -1) return -1 //if only one element is in the predefined order, prioritize it
    if (indexB !== -1) return 1

    return valueA.localeCompare(valueB) //if neither element is in the predefined order, sort alphabetically
  }

  const sortBy = ref(null)  //'Nome','Círculo','Escola','Ação','Publicação','Adicionada em...'
  const reverse = ref(false)
  const sortNumbers = ['Círculo']
  const orderObj = {'Ação':['Livre', 'Movimento', 'Padrão', 'Completa', 'Reação']}

  const sorterSelect = (char,items) => {
    if(!sortBy.value) return items

    if(sortBy.value==='Adicionada em...'){  //special sorting case
      const sorteredCharItems = sortNumber(char,'history')
      const orderMap = new Map(sorteredCharItems.map((spell, index) => [spell.id, index]));

      items.sort((a, b) => {
        const indexA = orderMap.has(a.id) ? orderMap.get(a.id) : Infinity;
        const indexB = orderMap.has(b.id) ? orderMap.get(b.id) : Infinity;
        return indexA - indexB || a.id - b.id;
      });

      return items
    }

    if(sortNumbers.includes(sortBy.value)) return sortNumber(items,sortBy.value)
    if(orderObj.hasOwnProperty(sortBy.value)) return items.sort(sortCustom(sortBy.value)) //sort using a specific order (see orderObj)
    return sortString(items,sortBy.value)
  }

  const sorter = (char,items) => reverse.value ? sorterSelect(char,items).reverse() : sorterSelect(char,items)

  return { sortCustom, sorter, sortBy, reverse };
})