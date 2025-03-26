<script setup>
const props = defineProps({purpose:String})

import flex from '@/composables/flex.vue'
import tabs from '@/composables/tabs.vue'
import spellList from '@/components/spells/list.vue'

import { useCharacterStore } from '@/stores/characterStore'   // import {spells} from '@/stores/localStorage'
const storeCharacter = useCharacterStore()    // const charSpellsList = spells;
const charSpellsList = storeCharacter.charSpells

import { ref, computed } from 'vue'

import {createFilterStore} from '@/stores/filterStore'
const filterStore = createFilterStore(props.purpose)()
const numberCharList = computed(() => filterStore.numberCharList)
const numberFullList =  computed(() => filterStore.numberFullList)

const selected_tab = ref();
const change_tab = value => selected_tab.value = value;
const addRemove = spellId => storeCharacter.addRemoveSpell(spellId)
</script>

<template>
  <flex>
    <h2>Magias</h2>
    <tabs @tab="change_tab">
      <template #tab1>Pessoal ({{ numberCharList }})</template>
      <template #tab2>Restantes ({{ numberFullList }})</template>
    </tabs>
    <spellList v-if="!selected_tab" :list="charSpellsList" @add_remove="addRemove" :purpose="props.purpose" />
    <spellList v-else :activeTab="true" :list="charSpellsList" @add_remove="addRemove" :purpose="props.purpose" />
  </flex>
</template>