<script setup>
import { shallowRef, watch, defineAsyncComponent } from 'vue';

const props = defineProps({icon:String,iconPos:String})

const icon = shallowRef(null);
const loadIcon = () => icon.value = defineAsyncComponent(() => import(`@/icons/buttonIcons/${props.icon}.vue`)) //computed doesn't work here
watch(() => props.icon,() => loadIcon(),{immediate:true}) // run immediately on mount
</script>

<template>
  <transition name="fade" tag="div">
    <button class="iconButton" :key="icon" :class="iconPos" @click="$emit('clicked')">
      <div class="icon"><component  v-if="icon" :is="icon"/></div>
      <p><slot>Button Icon</slot></p>
    </button>
  </transition>
</template>

<style scoped>
@import '@/assets/buttonIcon.css';
</style>