<script setup>
import buttonIcon from '@/composables/buttonIcon.vue'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { toSentenceCase } from '@/stores/utility'
const props = defineProps({components:Array,purpose:String})

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
const visibleComponents = computed(() => props.components.slice(currentIndex.value, currentIndex.value + visibleCount.value))

// Navigation functions
const lastComponent = computed(() => currentIndex.value + visibleCount.value < props.components.length)
const transitionName = ref('')

const nextComponent = () => {if(lastComponent.value){transitionName.value = 'slide-left'; currentIndex.value++}}
const prevComponent = () => {if(currentIndex.value>0){transitionName.value = 'slide-right'; currentIndex.value--}}

import { useRoute } from 'vue-router';
const route = useRoute()
const id = computed(() => Number(route.path.match(/\d+/)))
if(id.value){nextComponent()}
watch(id,() => nextComponent())

const leftComponentName = computed(() => {
  if(currentIndex.value>0) return props.components[currentIndex.value - 1].__name
  return null
})

const rightComponentName = computed(() => {
  if(lastComponent.value) return props.components[currentIndex.value + visibleCount.value].__name
  return null
})

// Swipe Handling
let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (event) => touchStartX = event.touches[0].clientX

const handleTouchEnd = (event) => {
  touchEndX = event.changedTouches[0].clientX
  const diff = touchStartX - touchEndX

  if (diff > 50) nextComponent()
  else if (diff < -50) prevComponent()
}

const swipeContainer = ref(null);
onMounted(() => {
  window.addEventListener('resize', updateWidth)
  if (swipeContainer.value){
    swipeContainer.value.addEventListener('touchstart', handleTouchStart)
    swipeContainer.value.addEventListener('touchend', handleTouchEnd)
  }
});
onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
  if (swipeContainer.value){
    swipeContainer.value.removeEventListener('touchstart', handleTouchStart)
    swipeContainer.value.removeEventListener('touchend', handleTouchEnd)
  }
});
</script>

<template>
  <div ref="swipeContainer">
    <keep-alive>
      <transition-group :name="transitionName" tag="div" class="component-wrapper">
        <component v-for="comp in visibleComponents" :key="`${comp.__name}`" :is="comp" class="component" :purpose="props.purpose"></component>
      </transition-group>
    </keep-alive>
  </div>

  <div class="footnav">
    <buttonIcon v-if="leftComponentName" @clicked="prevComponent" :icon="leftComponentName" iconPos="left">{{toSentenceCase(leftComponentName)}}</buttonIcon>
    <buttonIcon v-if="rightComponentName" @clicked="nextComponent" :icon="rightComponentName" iconPos="right">{{toSentenceCase(rightComponentName)}}</buttonIcon>
  </div>

</template>

<style scoped>
.container{
  position:relative;width:100vw;height:100vh;
  overflow:hidden;touch-action:pan-x
}
.component-wrapper,.component{
  position:relative;width:100%;height:100%;
  display:flex;justify-content:center
}

.component{
  width:33.3333%;height:calc(100vh - 4em);
  padding:0 4em;justify-content:flex-start;
  transition:transform .5s ease-in-out,opacity .35s
}
@media (max-width:1730px){.component{width:49.9999%}}
@media (max-width:1035px){.component{width:100%}}

.slide-left-enter-active,.slide-right-enter-active{position:relative}
.slide-left-leave-active,.slide-right-leave-active{position:absolute;opacity:0}

.slide-left-enter-from,.slide-right-leave-to{transform:translateX(100%)}
.slide-left-leave-to,.slide-right-enter-from{transform:translateX(-100%)}

/* In a 3 components (A, B and C) scenario, when transitioning between components, Vue creates a copy of component B (thus having 4 components in total: A, B, B, C)
then adds '.slide-left-enter-active' and the '.slide-left-enter-to' classes to one copy and the '.slide-left-leave-active' and the '.slide-left-leave-to' classes to the second copy */
@media (min-width:1035px) and (max-width:1730px){
  .slide-left-leave-active:nth-child(3),
  .slide-right-leave-active:nth-child(1){display:none} /* ensure duplicated component disappears instantly */
}

.footnav{
  position:fixed;top:0;left:0;
  width:100%;height:6em;
  display:flex;flex-direction:row;justify-content:space-between;align-items:center;
  /* top:unset;bottom:0;height:4.4em;
  background:var(--black-mute) */
}
@media (min-width:1730px){.footnav{display:none}}
</style>

<!-- 1035px and 1730px -->