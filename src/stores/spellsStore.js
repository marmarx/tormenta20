import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { editKeys, mainProperties, customOrder } from '@/stores/constantsStore'

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
        .catch(error => console.log('Spells JSON failed to load:\n',error))
        allSpells.value = data
    }
    return allSpells.value
  }

  const spellProperties = mainProperties.spells
  Object.keys(spellProperties.value).forEach(key => {
    spellProperties.value[key] = computed(() => {
      if(!allSpells.value) return []

      const uniqueValues = [...new Set(allSpells.value.flatMap(item => Array.isArray(item[key]) ? item[key] : [item[key]]))]

      return customOrder.spells.hasOwnProperty(key)
        ? uniqueValues.sort(sortStore.sortCustom(key,'spells'))
        : uniqueValues.sort()
    });
  });

  const spellEditKeys = editKeys.spells

  const updateSpell = (id, key, value) => {
    const spell = charSpells.value.find(spell => spell.id == id);
    if(spell){
      if(value === spell.original[key]) delete spell.edits[key]
      else spell.edits[key] = value
    }
  }
  
  return { allSpells, spellProperties, spellEditKeys, fetchSpells };
})