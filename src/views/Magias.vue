<script setup>
import layout from '@/composables/layout.vue'

import filter from '@/components/spell-filter.vue'
import main from '@/components/spell-main.vue'
import spellDetails from '@/components/spell-details.vue'
import spellEdit from '@/components/spell-edit.vue'

import { computed, watch } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();
const edit = computed(() => route.path.includes('edit')?spellDetails:spellDetails)  //?spellEdit:spellDetails
watch(edit,() => console.log('edit:',edit.value)) //spellDetails or spellDetails

import { useNavStore } from '@/stores/navStore';
const navStore = useNavStore()

const comp1 = computed(() => {
  if(navStore.screenWidth<1730){return navStore.navBtn1?filter:main}
  if(navStore.screenWidth<1035){return null}
  return filter
})

const comp2 = computed(() => {
  if(navStore.screenWidth<1730){return navStore.navBtn1?main:spellDetails}  //main, details-edit
  if(navStore.screenWidth<1035){return }  //main, filtro, details-edit
  return main
})

const comp3 = computed(() => {
  if(navStore.screenWidth<1730){return null} 
  return edit.value
})
</script>

<template>
<layout>
  <template v-if="navStore.showComp1" #layout1><component :is="comp1"></component></template>
  <template                           #layout2><component :is="comp2"></component></template>
  <template v-if="navStore.showComp3" #layout3><component :is="comp3"></component></template>
</layout>
</template>

<!-- 1035px and 1730px -->