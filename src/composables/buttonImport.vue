<script setup>
import { ref, shallowRef, watch, defineAsyncComponent } from 'vue';

const props = defineProps({icon:String,iconPos:String})
const emit = defineEmits(["clicked"]);

const file = ref(null)
const icon = shallowRef(null);
const loadIcon = () => icon.value = defineAsyncComponent(() => import(`@/icons/buttonIcons/${props.icon}.vue`)) //computed doesn't work here
watch(() => props.icon,() => loadIcon(),{immediate:true}) // run immediately on mount
</script>

<template>
  <input ref="file" type="file" @change="$emit('clicked')" style="display:none"/>
  <transition name="fade" tag="div">
    <button class="iconButton" :key="icon" :class="iconPos" @click="file.click()">
      <div class="icon"><component  v-if="icon" :is="icon"/></div>
      <p><slot>Button Icon</slot></p>
    </button>
  </transition>
</template>

<style scoped>
@import '@/assets/buttonIcon.css';
</style>