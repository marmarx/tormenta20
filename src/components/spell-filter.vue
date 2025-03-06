<script setup>
import t20box from '@/composables/t20box.vue'
import checklist from '@/composables/checklist.vue'

import {useFilterStore} from '@/stores/filterStore'
const filterStore = useFilterStore()

import {useSpellsStore} from '@/stores/spellsStore'
const spellsStore = useSpellsStore();
// { allSpells, spellNumber, spellTypes, spellSchools, spellLevels, spellPub, spellAlphabet, fetchSpells }

import {ref,watchEffect} from 'vue'
const checkedTypes = ref([]);
watchEffect(() => checkedTypes,console.log('filterType',checkedTypes),{deep:true});
</script>

<template>
<h2>Filtros</h2>
<t20box>
  <div class="input">
    <p>Nome</p>
    <input type="text" v-model="filterStore.filterText" required/>
  </div>
  <div class="input">
    <p>Tipo</p>
    <checklist v-for="type in spellsStore.spellTypes" :check="type" v-model="checkedTypes">{{ type }}</checklist>
  </div>
</t20box>
</template>

<style scoped>
input{padding:.8em 1.3em}
p{font-size:1em;line-height:1em;padding:.5em 0;font-weight:600}
</style>

<!--
filtros:
- nome (texto)
- tipo (checkbox)
- escola (checkbox)
- nível (checkbox)
- publicacao (checkbox)

sort (select):
- nome: A-Z/Z-A (str)
- escola  (str)
- nivel (num)
- publicação (str)
- history (num)
-->