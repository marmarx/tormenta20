<script setup>
import {ref,computed} from 'vue'
import layout from '@/composables/layout.vue'
import titles from '@/composables/title.vue'
import tabs from '@/composables/tabs.vue'
import spellList from '@/components/spell-list.vue'

import {spellNumber} from '@/stores/spellsStore'
import {spells} from '@/stores/localStorage'
const charSpellsList = spells;

const selected_tab = ref(0);
const tab = value => selected_tab.value = value;

const add_remove = (key) => {
  if(charSpellsList.includes(key)){charSpellsList.splice(charSpellsList.indexOf(key),1)}
  else{charSpellsList.push(key);charSpellsList.sort((a,b) => a - b)}
}

import spellDetails from '@/components/spell-details.vue'
import spellEdit from '@/components/spell-edit.vue'
import { useRoute } from 'vue-router';
const route = useRoute();
const comp1 = computed(()=>route.params.id?spellDetails:'')
const comp2 = computed(()=>route.path.includes('edit')?spellEdit:'')
</script>

<template>
<layout>
  <template #first>
    <titles>Magias</titles>
    <tabs @tab="tab">
      <template #first>Pessoal ({{ charSpellsList.length }})</template>
      <template #second>Restantes ({{ spellNumber - charSpellsList.length }})</template>
    </tabs>
    <spellList v-if="!selected_tab" :list="charSpellsList" @add_remove="add_remove"/>
    <spellList v-else :all="true" :list="charSpellsList" @add_remove="add_remove"/>
  </template>
  <template #second>
    <component :is="comp1"></component>
  </template>
  <template #third>
    <component :is="comp2"></component>  
  </template>
</layout>
</template>