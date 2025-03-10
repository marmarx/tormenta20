import { defineStore } from "pinia";
import { ref, computed } from "vue";

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

  const spellNumber = computed(() => allSpells.value ? allSpells.value.length : 0);
  const spellAlphabet = computed(() => allSpells.value ? allSpells.value.map(spell => spell.Nome.charAt(0)) : []);

  const spellProperties = ref({ 'Tipo': ref([]), 'Círculo': ref([]), 'Escola': ref([]), 'Publicação': ref([]) })  //equal to filterCheck const in filterStore.js
  Object.keys(spellProperties.value).forEach(key => {
    spellProperties.value[key] = computed(() => 
      allSpells.value 
        ? [...new Set(allSpells.value.flatMap(spell => Array.isArray(spell[key]) ? spell[key] : [spell[key]]))].sort()  //will always return an array
        : []
    );
  });
  
  return { allSpells, spellNumber, spellAlphabet, spellProperties, fetchSpells };
});

  // const spellTypes =    computed(() => allSpells.value ? [...new Set(allSpells.value.map(spell => spell.Tipo))].sort() : []);
  // const spellSchools =  computed(() => allSpells.value ? [...new Set(allSpells.value.map(spell => spell.Escola))].sort() : []);
  // const spellLevels =   computed(() => allSpells.value ? [...new Set(allSpells.value.map(spell => spell.Círculo))] : []);
  // const spellPub =      computed(() => allSpells.value ? [...new Set(allSpells.value.map(spell => spell.Publicação))].sort() : []);
  //return { allSpells, spellNumber, spellTypes, spellSchools, spellLevels, spellPub, spellAlphabet, fetchSpells };