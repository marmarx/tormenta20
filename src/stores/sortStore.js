import { defineStore } from "pinia";

export const useSortStore = defineStore("sortStore", () => {
  const sortNumber = (items,property) => items.sort((a,b) => a[property] - b[property])
  const sortString = (items,property) => items.sort((a,b) => a[property].localeCompare(b[property]))

  return { sortNumber, sortString };
});