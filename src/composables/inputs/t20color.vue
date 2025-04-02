<script setup>
// import { useCharacterStore } from '@/stores/characterStore'
// const storeCharacter = useCharacterStore()
import { t20color } from '@/stores/t20colorStore'
</script>

<template>
  <div class="color-picker">
    <p>Escola uma cor:</p>
    <!-- <input type="color" v-model="storeCharacter.charData.config.color" /> -->
    <input type="color" v-model="t20color" />
  </div>
</template>

<style scoped>
.color-picker{display:flex;align-items:center;justify-content:space-evenly;margin:1em 0}
p{font-size:1em;line-height:1em;padding:.5em 0;font-weight:600}
</style>