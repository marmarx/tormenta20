<script setup>
import flex from '@/composables/flex.vue'
import customChecklist from '@/composables/checklist.vue'
import customSelect from '@/composables/select.vue'
import customInput from '@/composables/input.vue'

import {useFilterStore} from '@/stores/filterStore'
const filterStore = useFilterStore()

import {useSpellsStore} from '@/stores/spellsStore'
const spellsStore = useSpellsStore()

import {useSortStore} from '@/stores/sortStore'
const sortStore = useSortStore()
</script>

<template>
<h2>Filtros</h2>
<flex class="grow">
  <div class="overflow">
    <customInput v-model="filterStore.filterText">Nome</customInput>
    <customChecklist v-for="(value, key) in spellsStore.spellProperties" :options="value" v-model="filterStore.filterCheck[key]">{{key}}</customChecklist>
    <customSelect :options="['Nome','Círculo','Escola','Ação','Publicação','Adicionada em...']" v-model="sortStore.sortBy">
      <template #title>Ordenar</template>
      <template #default>Escolha como deseja ordenar...</template>
    </customSelect>
    <customChecklist :options="['Ordem reversa']" v-model="sortStore.reverse"></customChecklist>
  </div>
</flex>
</template>

    <!--
    <customChecklist :options="spellsStore.spellTipo" v-model="checkedTipo">Círculo</customChecklist>
    <customChecklist :options="spellsStore.spellLevels" v-model="checkedLevels">Círculo</customChecklist>
    <customChecklist :options="spellsStore.spellSchools" v-model="checkedSchools">Escola</customChecklist>
    <customChecklist :options="spellsStore.spellPub" v-model="checkedPub">Publicação</customChecklist>
    -->