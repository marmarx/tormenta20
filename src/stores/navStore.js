import { defineStore } from "pinia"
import { ref, watch, computed } from 'vue'

export const useNavStore = defineStore("navStore", () => {

  const screenWidth = ref(window.innerWidth) //number
  window.addEventListener('resize',() => screenWidth.value = window.innerWidth)
  watch(screenWidth,() => console.log('Screen width changed:',screenWidth.value))

  const tabletWidth = 1730
  const phoneWidth = 1035

  const showComp1 = computed(() => screenWidth.value<phoneWidth?false:true)
  const showComp3 = computed(() => screenWidth.value<tabletWidth?false:true)

  const showNavBtn1 = computed(() => screenWidth.value<tabletWidth?true:false)
  const showNavBtn3 = computed(() => screenWidth.value<phoneWidth?true:false)

  watch(() => (showComp1,showComp3,showNavBtn1),() => console.log('show comps and navBtn:',showComp1.value,showComp3.value,showNavBtn1.value))

  const navBtn1 = ref(true)
  const navBtn2 = ref(false)

  const setNavBtn1 = (boolean) => navBtn1.value = boolean
  const setNavBtn2 = (boolean) => navBtn2.value = boolean

  return { screenWidth, showComp1, showComp3, showNavBtn1, showNavBtn3, navBtn1, navBtn2, setNavBtn1, setNavBtn2 }
})