import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

import { useCharacterStore } from "./characterStore";
const charStore = useCharacterStore()

import {useSortStore} from '@/stores/sortStore'
const sortStore = useSortStore()

export const useSpellsStore = defineStore("spellsStore", () => {
  const allSpells = ref(null);
  const dbSpells = ref(null);

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

  const spellProperties = ref({ 'Tipo': ref([]), 'Círculo': ref([]), 'Escola': ref([]), 'Ação': ref([]), 'Publicação': ref([]) })  //equal to filterCheck const in filterStore.js
  Object.keys(spellProperties.value).forEach(key => {
    spellProperties.value[key] = computed(() => {
      if(!allSpells.value) return []

      const uniqueValues = [...new Set(allSpells.value.flatMap(spell => Array.isArray(spell[key]) ? spell[key] : [spell[key]]))]
      return key==='Ação'
        ? uniqueValues.sort(sortStore.sortCustom(key))
        : uniqueValues.sort()
    });
  });

  const spellEditKeys = ['Tipo','Círculo', 'Escola','Ação','Alvo','Alcance','Área','Efeito','Duração','Resistência']

  const updateSpell = (id, key, value) => {
    const spell = charSpells.value.find(spell => spell.id == id);
    if(spell){
      if(value === spell.original[key]) delete spell.edits[key]
      else spell.edits[key] = value
    }
  }
  
  return { allSpells, spellProperties, spellEditKeys, fetchSpells };
})