<script setup>
import t20box from '@/composables/t20box.vue'

import { useCharacterStore } from '@/stores/characterStore'
const storeCharacter = useCharacterStore()

import { atributes } from '@/stores/constantsStore'
</script>

<template>
  <t20box>
    <div class="atributos">
      <div class="atributo" v-for="atributo in atributes" :key="`atributo-${atributo}`">
        <p>{{atributo.slice(0,3).toUpperCase()}}</p>
        <input type="number" v-model="storeCharacter.charData.stats.atributos[atributo.toLowerCase()]" />
      </div>
    </div>
  </t20box>
</template>

<style scoped>
.atributos{
  width:100%;
  display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-evenly
}
.atributo{
  height:55px;margin:.5em .8em;
  display:flex;flex-direction:row;justify-content:space-evenly
}
p{font-size:1em;writing-mode:vertical-rl;transform:rotate(180deg);text-align:center}
input{max-width:90px;text-align:center;appearance:none;-webkit-appearance:none}
</style>