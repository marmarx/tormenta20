<script setup>
import layout from '@/composables/layout.vue'
import titles from '@/composables/title.vue';
</script>

<template>
  <layout>
    <template #layout1>
      <titles>Equipamentos</titles>
    </template>
    <template #layout2>
      <component :is=""></component>
    </template>
    <template #layout3>
      <component :is=""></component>  
    </template>
  </layout>
  </template>