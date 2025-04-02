<script setup>
import{ ref, computed, onMounted, onUnmounted } from "vue";

import ComponentA from '@/test-enviroment/ComponentA.vue'
import ComponentB from '@/test-enviroment/ComponentB.vue'
import ComponentC from '@/test-enviroment/ComponentC.vue'
const components = [ComponentA, ComponentB, ComponentC]

const screenWidth = ref(window.innerWidth)
const updateWidth = () => screenWidth.value = window.innerWidth

// Function to update layout based on screen size
const visibleCount = computed(() => {
  if (screenWidth.value < 1035) return 1
  else if (screenWidth.value < 1730) return 2
  else return 3
})

// Navigation functions
const currentIndex = ref(screenWidth.value<1035?1:0) //component B must be shown on start, regardless of screensize
const translateX = computed(() => `translateX(-${currentIndex.value*33.3333}%)`)

// Navigation functions
const lastComponent = computed(() => currentIndex.value + visibleCount.value < components.length)
const visibleComponents = computed(() => Array.from({length: visibleCount.value}, (_, i) => currentIndex.value + i))

const nextComponent = () => {if(lastComponent.value) currentIndex.value++}
const prevComponent = () => {if(currentIndex.value > 0) currentIndex.value--}

const isActive = index => visibleComponents.value.includes(index) ? false : true

// Swipe Handling
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (event) => touchStartX = event.touches[0].clientX

const handleTouchEnd = (event) => {
  touchEndX = event.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;

  if (diff > 50) nextComponent()
  else if (diff < -50) prevComponent()
}

const swipeContainer = ref(null);
onMounted(() => {
  window.addEventListener("resize", updateWidth);
  if (swipeContainer.value){
    swipeContainer.value.addEventListener("touchstart", handleTouchStart);
    swipeContainer.value.addEventListener("touchend", handleTouchEnd);
  }
});
onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
  if (swipeContainer.value){
    swipeContainer.value.removeEventListener("touchstart", handleTouchStart);
    swipeContainer.value.removeEventListener("touchend", handleTouchEnd);
  }
});
</script>

<template>
  <div class="container" ref="swipeContainer">
    <div class="component-wrapper" :style="{ transform:translateX }">
      <component v-for="(comp,index) in components" :key="`${comp.name}-${index}`" :is="comp" :number="index" class="component" :class="{'fade-out':isActive(index)}"></component>
    </div>
    <button v-if="currentIndex>0" class="prev" @click="prevComponent">← Prev</button>
    <button v-if="lastComponent" class="next" @click="nextComponent">Next →</button>
  </div>
</template>

<style scoped>
.container{
  position:relative;width:100vw;height:100vh;
  overflow-X:hidden;touch-action:pan-x;
}
.component-wrapper,.component{
  position:relative;width:100%;height:100%;
  display:flex;justify-content:center;align-items:center;
}
@media (max-width:1730px){.component-wrapper{width:150%}}
@media (max-width:1035px){.component-wrapper{width:300%}}

.component-wrapper{transition:transform .5s ease-in-out}
.fade-out{transition:opacity .35s ease-in-out;opacity: 0}

button{
  position:absolute;top:15px;width:30%;
  padding:10px 15px;border:none;margin:unset;
  display:none;
  color:white;background:#007bff;
  cursor:pointer;
}
.prev{left:10px}
.next{right:10px}
@media (max-width:1730px){button{display:block}}
</style>