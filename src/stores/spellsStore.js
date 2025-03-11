import { defineStore } from "pinia";
import { ref, computed } from "vue";

import {useSortStore} from '@/stores/sortStore'
const sortStore = useSortStore()

export const useSpellsStore = defineStore("spellsStore", () => {
  const allSpells = ref(null); 

  const fetchSpells = async () => {
    if(!allSpells.value){
      const data = await fetch('/db/spells.json')
        .then(response => response.json())
        .then(results => {
          console.log('Spells JSON loaded successfully!');
          return results
        })
        .catch(error => console.log('Spells JSON failed to load:\n',error));
      allSpells.value = data;
    }
    return allSpells.value;
  }

  const spellAlphabet = computed(() => allSpells.value ? allSpells.value.map(spell => spell.Nome.charAt(0)) : []);

  const spellProperties = ref({ 'Tipo': ref([]), 'Círculo': ref([]), 'Escola': ref([]), 'Ação': ref([]), 'Publicação': ref([]) })  //equal to filterCheck const in filterStore.js
  Object.keys(spellProperties.value).forEach(key => {
    spellProperties.value[key] = computed(() => {
      if(!allSpells.value) return []

      const uniqueValues = [...new Set(allSpells.value.flatMap(spell => Array.isArray(spell[key]) ? spell[key] : [spell[key]]))] //will always return an array
      return key==='Ação'
        ? uniqueValues.sort(sortStore.sortCustom(key))
        : uniqueValues.sort()
    });
  });
  
  return { allSpells, spellAlphabet, spellProperties, fetchSpells };
})

  // const spellTypes =    computed(() => allSpells.value ? [...new Set(allSpells.value.map(spell => spell.Tipo))].sort() : []);
  // const spellSchools =  computed(() => allSpells.value ? [...new Set(allSpells.value.map(spell => spell.Escola))].sort() : []);
  // const spellLevels =   computed(() => allSpells.value ? [...new Set(allSpells.value.map(spell => spell.Círculo))] : []);
  // const spellPub =      computed(() => allSpells.value ? [...new Set(allSpells.value.map(spell => spell.Publicação))].sort() : []);
  //return { allSpells, spellNumber, spellTypes, spellSchools, spellLevels, spellPub, spellAlphabet, fetchSpells };