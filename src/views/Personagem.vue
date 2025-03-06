<script setup>
import layout from '@/composables/layout.vue'
import titles from '@/composables/title.vue'

import t20color from '@/composables/t20color.vue'
</script>

<template>
  <layout>
    <template #layout1>
      <titles>Personagem</titles>
      <t20color />
    </template>
    <template #layout2>
      <component :is=""></component>
    </template>
    <template #layout3>
      <component :is="">
      </component>  
    </template>
  </layout>
  </template>