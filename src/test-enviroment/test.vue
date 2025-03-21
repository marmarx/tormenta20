<!-- Winner: best UX and best hardware usage -->

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

// Compute visible components
const currentIndex = ref(screenWidth.value<1035?1:0) //component B must be shown on start, regardless of screensize
const visibleComponents = computed(() => components.slice(currentIndex.value, currentIndex.value + visibleCount.value))

// Navigation functions
const lastComponent = computed(() => currentIndex.value + visibleCount.value < components.length)
const transitionName = ref("")

const nextComponent = () => {if(lastComponent.value){transitionName.value = "slide-left"; currentIndex.value++}}
const prevComponent = () => {if(currentIndex.value > 0){transitionName.value = "slide-right"; currentIndex.value--}}

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
    <keep-alive>
      <transition-group :name="transitionName" tag="div" class="component-wrapper">
        <component v-for="(comp,index) in visibleComponents" :key="`${comp.name}-${index}`" :is="comp" :number="index" class="component"></component>
      </transition-group>
    </keep-alive>
    <button v-if="currentIndex>0" class="prev" @click="prevComponent">← Prev</button>
    <button v-if="lastComponent" class="next" @click="nextComponent">Next →</button>
  </div>
</template>

<style scoped>
.container{
  position:relative;width:100vw;height:100vh;
  overflow:hidden;touch-action:pan-x;
}
.component-wrapper,.component{
  position:relative;width:100%;height:100%;
  display:flex;justify-content:center;align-items:center;
}

.component{width:33.3333%;transition:transform .5s ease-in-out,opacity .35s}
@media (max-width:1730px){.component{width:49.9999%}}
@media (max-width:1035px){.component{width:100%}}

.slide-left-enter-active,.slide-right-enter-active{position:relative}
.slide-left-leave-active,.slide-right-leave-active{position:absolute;opacity:0}

.slide-left-enter-from,.slide-right-leave-to{transform:translateX(100%)}
.slide-left-leave-to,.slide-right-enter-from{transform:translateX(-100%)}

/* when transitioning between components, Vue creates a copy of component B (thus having 4 components in total: A, B, B, C)
then adds '.slide-left-enter-active' and the '.slide-left-enter-to' classes to one copy and the '.slide-left-leave-active' and the '.slide-left-leave-to' classes to the second copy */
@media (min-width:1035px) and (max-width:1730px){
  .slide-left-leave-active:nth-child(3),.slide-right-leave-active:nth-child(1){display:none} /* ensure duplicated component disappears instantly */
}

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
