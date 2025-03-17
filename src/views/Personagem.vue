<script setup>
import titles from '@/composables/title.vue'
import layout from '@/composables/layout.vue'

//import t20color from '@/composables/t20color.vue'<t20color />
</script>

<template>
<titles class="comp">Personagem</titles>
<layout>
  <template #layout1><component :is=""></component></template>
  <template #layout2><component :is=""></component></template>
  <template #layout3><component :is=""></component></template>
</layout>
</template>