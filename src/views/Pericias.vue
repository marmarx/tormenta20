<script setup>
import layout from '@/composables/layout.vue'
import titles from '@/composables/title.vue';
</script>

<template>
  <titles class="comp">Perícias</titles>
  <layout>
    <template #layout1><component :is=""></component></template>
    <template #layout2><component :is=""></component></template>
    <template #layout3><component :is=""></component></template>
  </layout>
  </template>