<script setup>
const props = defineProps({icon:String,iconPos:String})

import { ref, watch, defineAsyncComponent } from 'vue';
const icon = ref(null);
const loadIcon = () => icon.value = defineAsyncComponent(() => import(`@/icons/buttonIcons/${props.icon}.vue`))
watch(() => props.icon,() => {loadIcon()},{immediate:true}) // run immediately on mount
</script>

<template>
<div class="iconButton" :class="iconPos" @click="$emit('clicked')">
  <component  v-if="icon&&iconPos==='left'" :is="icon"/>
  <p><slot>Botão</slot></p>
  <component  v-if="icon&&iconPos==='right'" :is="icon"/>
</div>
</template>

<style scoped>
.iconButton{
  position:absolute;width:25%;
  display:flex;justify-content:center;flex-direction:row;align-items:center;gap:1em;
  color:var(--black-mute);background:var(--white-washed);
  /* border:1px solid var(--black-washed); */
  padding:.3em .5em;border-radius:12px;margin:0 1em;
  outline:transparent solid 1px;transition:all .3s ease-in-out;
  cursor:pointer
}
.iconButton:hover,.iconButton:focus{
  background:var(--white-soft);
  /* border:1px solid var(--black-mute);outline:var(--black-mute) solid 1px */
}
.left{left:0}.right{right:0}
</style>