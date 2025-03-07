<script setup>
import layout from '@/composables/layout.vue'
import titles from '@/composables/title.vue'
import tabs from '@/composables/tabs.vue'

import filtro from '@/components/spell-filter.vue'
import spellList from '@/components/spell-list.vue'

import { useSpellsStore } from '@/stores/spellsStore'
const storeSpells = useSpellsStore()
const spellNumber = computed(() => storeSpells.spellNumber)

import { useCharacterStore } from '@/stores/characterStore'   // import {spells} from '@/stores/localStorage'
const storeCharacter = useCharacterStore()    // const charSpellsList = spells;
const charSpellsList = storeCharacter.charSpells

const addRemove = spellId => storeCharacter.addRemoveSpell(spellId)

import {ref,computed} from 'vue'
const selected_tab = ref();
const change_tab = value => selected_tab.value = value;

import { useRoute } from 'vue-router';
const route = useRoute();

import spellDetails from '@/components/spell-details.vue'
import spellEdit from '@/components/spell-edit.vue'
//const comp1 = computed(() => route.params.id?spellDetails:null)
const comp2 = computed(() => route.path.includes('edit')?spellEdit:spellDetails)
</script>

<template>
<layout>
  <template #layout1><filtro></filtro></template>
  <template #layout2>
    <titles>Magias</titles>
    <tabs @tab="change_tab">
      <template #tab1>Pessoal ({{ charSpellsList.length }})</template>
      <template #tab2>Restantes ({{ spellNumber - charSpellsList.length }})</template>
    </tabs>
    <spellList v-if="!selected_tab" :list="charSpellsList" @add_remove="addRemove" />
    <spellList v-else :all="true" :list="charSpellsList" @add_remove="addRemove" />
  </template>
  <template #layout3 v-if="comp2"><component :is="comp2"></component></template>
</layout>
</template>