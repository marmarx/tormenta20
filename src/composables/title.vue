<script setup>
import flex from '@/composables/flex.vue';
</script>

<template>
  <flex>
    <h1><slot>Título</slot></h1>
  </flex>
</template>

<style>
h1{
  font-family:'tormenta20';font-size:3em;font-weight:500;
  line-height:1.2em;letter-spacing:4px;
  margin:0 0 .6em;text-align:center;
  color:var(--t20-color);filter:var(--bright);
}
</style>