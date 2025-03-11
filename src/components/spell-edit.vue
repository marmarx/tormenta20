<script setup>
import flex from '@/composables/flex.vue'
import {ref,computed,onMounted} from 'vue'

import {useRoute} from 'vue-router'
const route = useRoute()
const id = computed(() => route.params.id)

import { useCharacterStore } from '@/stores/characterStore'   // import {spells} from '@/stores/localStorage'
const storeCharacter = useCharacterStore()    // const charSpellsList = spells;
const charSpellsList = storeCharacter.charSpells

import {useSpellsStore} from '@/stores/spellsStore'   //import {useSpellStore} from '@/stores/old_spellsStore'
const spellsStore = useSpellsStore();
const spellProperties = computed(() => {
  let list = spellsStore.spellProperties
  // list['Ação'] = ref(['Nenhuma ação','Ação livre','Ação de movimento','Ação padrão','Ação completa','Reação'])
  return list
})

const allSpells = ref(null);
const fetchSpells = async () => { allSpells.value = await spellsStore.fetchSpells() }
onMounted(fetchSpells); // Fetch spells when component is mounted

import {useFilterStore} from '@/stores/filterStore'
const filterStore = useFilterStore()

const spellList = computed(() => filterStore.filterList(allSpells,0,[{id:Number(id.value)}])[0])

const edit = key => {
  const val = event.target.value;
  if(charSpellsList.edits[key]!=val&&spellList[key]!=val){charSpellsList.edits[key]=val}
}
const load = key => charSpellsList.edits[key]?charSpellsList.edits[key]:spellList[key]
const action = ['Nenhuma ação','Ação livre','Ação de movimento','Ação padrão','Ação completa','Reação','Outro (escrever)']
</script>

<template>
  <flex v-if="spellList">
    <h2>Editar Magia</h2>
    <div v-for="(_,key) in spellList" class="input">
      <textarea v-if="key==='Descrição'" @change="edit(key)" :placeholder="key">{{ load(key) }}</textarea>

      <select v-else-if="spellProperties.hasOwnProperty(key)" @change="edit(key)" :placeholder="key">
        <!-- <option v-for=""></option> -->
      </select>

      <input v-else type="text" @change="edit(key)" :placeholder="key">
    </div>
  </flex>
  <flex v-else class="h100">
    <p class="tac">Clique em uma magia para ver e editar</p>
  </flex>
</template>

<style scoped>
.h100{height:100%}
</style>