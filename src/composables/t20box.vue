<script setup>
import {t20border} from '@/stores/t20colorStore'
</script>

<template>
<div class="t20box"><slot></slot></div>
</template>

<style>
.t20box{
  width:100%;max-width:600px;
  padding:.5em 2em;border:30px solid transparent;margin:1.2em auto;
  color:var(--white);background-color:var(--t20-color);background-clip:padding-box;
  border-image:v-bind(t20border);
}
</style>