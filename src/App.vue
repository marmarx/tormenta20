<script setup>
import { useCharacterStore } from '@/stores/characterStore'
import navigation from '@/views/navigation.vue'
const storeCharacter = useCharacterStore()

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