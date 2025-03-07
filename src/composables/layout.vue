<!-- <script setup>
import { useMatchMedia } from './useMatchMedia';
const smallScreen = useMatchMedia('(max-width: 859px)');
</script> -->

<template>
<div class="layout">
  <div class="layout-third"><slot name="layout1"></slot></div>
  <div class="layout-third"><slot name="layout2"></slot></div>
  <div class="layout-third"><slot name="layout3"></slot></div>
</div>
</template>

<style>
.layout{display:flex;flex-direction:row;height:100vh}
.layout-third{width:33.3333%;padding:2em 3em 2.5em;display:flex;flex-direction:column}
@media (max-width:859px){.layout-third{width:100%;height:100%}}

.third{width:33.3333%;padding:0 5em}
@media (min-width:1201px) and (max-width:1650px){.third{width:49.9999%}} /* 1201px < screen < 1650 => 50% */
@media (max-width:1200px){.third{width:100%}} /* screen < 1200px => 100% */
</style>

<!--
<layout>
  <template #first>

  </template>
  <template #second>
    
  </template>
  <template #third>
    
  </template>
</layout>
-->