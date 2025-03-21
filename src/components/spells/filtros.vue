<script setup>
import flex from '@/composables/flex.vue'
import customChecklist from '@/composables/checklist.vue'
import customSelect from '@/composables/select.vue'
import customInput from '@/composables/input.vue'
// import checkSingle from '@/composables/checksingle.vue'

import {useFilterStore} from '@/stores/filterStore'
const filterStore = useFilterStore()

import {useSpellsStore} from '@/stores/spellsStore'
const spellsStore = useSpellsStore()

import {useSortStore} from '@/stores/sortStore'
const sortStore = useSortStore()
</script>

<template>
<flex class="grow">
  <h2>Filtros</h2>
  <div class="overflow">
    <customInput v-model="filterStore.filterText" style="width:100%;max-width:unset">Nome</customInput>
    <flex class="flex-wrap">
      <customChecklist v-for="(value, key) in spellsStore.spellProperties" :options="value" v-model="filterStore.filterCheck[key]">{{key}}</customChecklist>
      <customSelect :options="['Nome','Círculo','Escola','Ação','Publicação','Adicionada em...']" v-model="sortStore.sortBy">
        <template #title>Ordenar</template>
        <template #default>Escolha como deseja ordenar...</template>
      </customSelect>
      <!-- <checkSingle option="Ordem reversa" v-model="sortStore.reverse"></checkSingle> -->
    </flex>
  </div>
</flex>
</template>

<style scoped>
.input{width:80%;max-width:300px}
.flex-wrap{flex-wrap:wrap;flex-direction:unset;justify-content:space-between}
</style>