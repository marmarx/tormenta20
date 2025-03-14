<script setup>
import trash from '@/icons/trash.vue'
defineProps({obj:Object})
</script>

<template>
<div class="flexline">
  <div class="w2"></div>
  <div class="w7"></div>
  <div class="w1"><trash @click="$emit('delete')"/></div>
</div>
</template>

<style scoped>
.flexline{display:inline-flex}
.w2{width:20%}
.w7{width:70%}
.w1{width:10%;cursor:pointer}
</style>