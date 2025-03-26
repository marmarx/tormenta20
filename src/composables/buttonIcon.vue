<script setup>
import { shallowRef, watch, defineAsyncComponent } from 'vue';

const props = defineProps({icon:String,iconPos:String})

const icon = shallowRef(null);
const loadIcon = () => icon.value = defineAsyncComponent(() => import(`@/icons/buttonIcons/${props.icon}.vue`)) //computed doesn't work here
watch(() => props.icon,() => loadIcon(),{immediate:true}) // run immediately on mount
</script>

<template>
  <transition name="fade" tag="div">
    <div class="iconButton" :key="icon" :class="iconPos" @click="$emit('clicked')">
      <div class="icon"><component  v-if="icon" :is="icon"/></div>
      <p><slot>Button Icon</slot></p>
    </div>
  </transition>
</template>

<style scoped>
.icon{width:1.5em;display:flex}
.iconButton{
  position:relative;
  display:flex;justify-content:center;flex-direction:row;align-items:center;gap:1em;
  color:var(--black-mute);background:var(--white-washed);
  border:1px solid var(--black-washed);
  padding:.3em 1.5em;border-radius:12px;margin:1em 2em;
  outline:transparent solid 1px;transition:all .3s ease-in-out;
  cursor:pointer
  /* width:25%;padding:.3em .5em;margin:0 1em;border:none*/
}

.iconButton:hover,.iconButton:focus{
  background:var(--white-soft);
  border:1px solid var(--black-mute);outline:var(--black-mute) solid 1px
  /* border:none;outline:none */
}
.left,.right{position:absolute}
.left{left:0}.right{right:0;flex-direction:row-reverse}

.fade-enter-active,.opacity-leave-active{transition:opacity .2s}
.fade-enter-from,.opacity-leave-to{opacity:0}
</style>