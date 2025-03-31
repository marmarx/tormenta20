<script setup>
const props = defineProps({purpose:String})
import flex from '@/composables/flex.vue'
import customChecklist from '@/composables/inputs/checklist.vue'
import customSelect from '@/composables/inputs/selectInput.vue'
import customInput from '@/composables/inputs/textInput.vue'

import {createFilterStore} from '@/stores/filterStore'
const filterStore = createFilterStore(props.purpose)();

import {useSpellsStore} from '@/stores/spellsStore'
const spellsStore = useSpellsStore()

import {useSortStore} from '@/stores/sortStore'
const sortStore = useSortStore()

import {orderOptions} from '@/stores/constantsStore'
</script>

<template>
<flex class="grow">
  <h2>Filtros</h2>
  <div class="overflow">
    <customInput v-model="filterStore.filterText" style="width:100%;max-width:unset">Nome</customInput>
    <flex class="flex-wrap">
      <customChecklist v-for="(value, key) in spellsStore.spellProperties" :options="value" v-model="filterStore.filterCheck[key]">{{key}}</customChecklist>
      <customSelect :options="orderOptions[purpose]" v-model="sortStore.sortBy" :reverse="true" style="width:100%;max-width:unset">
        <template #title>Ordenar</template>
        <template #default>Escolha como deseja ordenar...</template>
      </customSelect>
    </flex>
  </div>
</flex>
</template>

<style scoped>
.input{width:80%;max-width:300px}
.flex-wrap{flex-wrap:wrap;flex-direction:unset;justify-content:space-between}
</style>