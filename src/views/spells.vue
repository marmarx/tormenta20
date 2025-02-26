<script setup>
import {ref,computed} from 'vue'
import layout from '@/composables/layout.vue'
import titles from '@/composables/title.vue'
import tabs from '@/composables/tabs.vue'
import spellList from '@/components/spell-list.vue'

import {spellNumber} from '@/stores/spellsStore'
import {spells} from '@/stores/localStorage'
const charSpellsList = spells;
console.log(charSpellsList.value)

const selected_tab = ref();
const change_tab = value => selected_tab.value = value;

const add_remove = (key) => {
  if(charSpellsList.value.includes(key)){charSpellsList.value.splice(charSpellsList.value.indexOf(key),1)}
  else{charSpellsList.value.push(key);charSpellsList.value.sort((a,b) => a - b)}
}

import spellDetails from '@/components/spell-details.vue'
import spellEdit from '@/components/spell-edit.vue'
import { useRoute } from 'vue-router';
const route = useRoute();
const comp1 = computed(()=>route.params.id?spellDetails:null)
const comp2 = computed(()=>route.path.includes('edit')?spellEdit:null)
</script>

<template>
<layout>
  <template #layout1>
    <titles>Magias</titles>
    <tabs @tab="change_tab">
      <template #tab1>Pessoal ({{ charSpellsList.length }})</template>
      <template #tab2>Restantes ({{ spellNumber - charSpellsList.length }})</template>
    </tabs>
    <spellList v-if="!selected_tab" :list="charSpellsList" @add_remove="add_remove" />
    <spellList v-else :all="true" :list="charSpellsList" @add_remove="add_remove" />
  </template>
  <template #layout2 v-if="comp1">
    <component :is="comp1"></component>
  </template>
  <template #layout3 v-if="comp2">
    <component :is="comp2"></component>  
  </template>
</layout>
</template>