<script setup>
import tabs from '@/composables/tabs.vue'
import iconButton from '@/composables/iconButton.vue'
import spellList from '@/components/spell-list.vue'

import { useCharacterStore } from '@/stores/characterStore'   // import {spells} from '@/stores/localStorage'
const storeCharacter = useCharacterStore()    // const charSpellsList = spells;
const charSpellsList = storeCharacter.charSpells

import { ref, computed } from 'vue'

import {useFilterStore} from '@/stores/filterStore'
const filterStore = useFilterStore()
const numberCharList = computed(() => filterStore.numberCharList)
const numberFullList =  computed(() => filterStore.numberFullList)

const selected_tab = ref();
const change_tab = value => selected_tab.value = value;
const addRemove = spellId => storeCharacter.addRemoveSpell(spellId)

import { useNavStore } from '@/stores/navStore';
const navStore = useNavStore()
</script>

<template>
  <h2>Magias</h2>
  <tabs @tab="change_tab">
    <template #tab1>Pessoal ({{ numberCharList }})</template>
    <template #tab2>Restantes ({{ numberFullList }})</template>
  </tabs>
  <spellList v-if="!selected_tab" :list="charSpellsList" @add_remove="addRemove" />
  <spellList v-else :activeTab="true" :list="charSpellsList" @add_remove="addRemove" />
  <iconButton v-if="navStore.showNavBtn1" @clicked="navStore.setNavBtn1(true)" type="filter">Filtros</iconButton>
</template>