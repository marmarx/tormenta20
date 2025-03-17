<script setup>
import titles from '@/composables/title.vue'
import layout from '@/composables/layout.vue'

const show = ref(true)
window.addEventListener('resize', () => show.value = window.innerWidth>=1730?true:false)
watch(show,() => console.log('hide',show.value))

import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();

import filtro from '@/components/spell-filter.vue'
import main from '@/components/spell-main.vue'
import spellDetails from '@/components/spell-details.vue'
import spellEdit from '@/components/spell-edit.vue'
const comp3 = computed(() => route.path.includes('edit')?spellEdit:spellDetails)
</script>

<template>
<titles class="comp">Magias</titles>
<layout>
  <template v-if="show" #layout1><component :is="filtro"></component></template>
  <template             #layout2><component :is="main"></component></template>
  <template v-if="show" #layout3><component :is="comp3"></component></template>
</layout>
</template>