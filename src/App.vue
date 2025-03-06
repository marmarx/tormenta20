<script setup>
import { useCharacterStore } from '@/stores/characterStore'   // import {spells} from '@/stores/localStorage'
import navigation from '@/views/navigation.vue'
const storeCharacter = useCharacterStore()    // const charSpellsList = spells;

//storeCharacter.clearStorage()
storeCharacter.newChar('Aurora')
const charData = storeCharacter.charData
console.log(charData)

//watch (() => beingWatched,function,{deep:true}) is used to detect changes to an object's property, an array's elements, or nested structures (like objects inside an array)
</script>

<template>
  <router-view />
  <navigation/>
</template>

<style>
.third{width:33.3333%;padding:0 5em}
@media (min-width:1201px) and (max-width:1650px){.third{width:49.9999%}} /* 1201px < screen < 1650 => 50% */
@media (max-width:1200px){.third{width:100%}} /* screen < 1200px => 100% */
</style>