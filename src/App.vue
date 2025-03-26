<script setup>
import navigation from '@/views/navigation.vue'

//watch(reverse,() => console.log('reverse',reverse.value))
//watch(beingWatched,function,{deep:true})
//watch(() => beingWatched,function,{deep:true})
//'deep:true' is used to detect changes to an object's property, an array's elements, or nested structures (like objects inside an array)
</script>

<template>
  <router-view />
  <navigation/>
</template>