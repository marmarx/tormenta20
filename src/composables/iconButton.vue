<script setup>
const props = defineProps({type:String})

import { defineAsyncComponent } from 'vue';
const icon = defineAsyncComponent(() => import(`@/icons/buttonIcons/${props.type}.vue`))
</script>

<template>
<div v-if="type" class="iconButton" @click="$emit('clicked')">
  <icon/><p><slot>Botão</slot></p>
</div>
</template>

<style scoped>
.iconButton{
  position:absolute;top:3px;left:0;gap:.4em;
  display:flex;justify-content:center;flex-direction:row;align-items:center;align-content:center;
  cursor:pointer;
  color:var(--plain-color);background:var(--el-back-color);
  padding:.2em .8em;border:1px solid var(--sub-color);border-radius:12px;margin:1.6em 0 0 3em;
  outline:transparent solid 1px;transition:all 300ms ease-in-out;
}
.iconButton:hover,.iconButton:focus{background:var(--el-back-hover);border:1px solid var(--plain-color);outline:var(--plain-color) solid 1px}
</style>