<script setup>
import flex from '@/composables/flex.vue'
import buttonIcon from '@/composables/buttonIcon.vue'
import t20 from '@/composables/t20color.vue'

import { computed } from 'vue'

import { useCharacterStore } from '@/stores/characterStore'
const storeCharacter = useCharacterStore()

//storeCharacter.clearStorage()
//storeCharacter.createChar('Aurora')
//storeCharacter.createChar('Boreas')
//storeCharacter.createChar('Brisa')

const activeChar = computed(() => {
  if (!storeCharacter.charData) return null
  return storeCharacter.charData.name
})
</script>

<template>
<flex class="grow">
  <h2>Personagens</h2>
  <div v-if="storeCharacter.charList" class="overflow">
    <div class="item-cont" v-for="char in storeCharacter.charList" :key="`char-${char.name}`" :name="char.name">
      <div class="item" :class="{ selectedChar:char.name == activeChar }">
        <div class="item-click" @click="storeCharacter.loadChar(char.name)">
          <p class="item-title bold" v-html="char.name"></p>
          <p class="item-subtitle">{{char.basic.join(' • ')}}</p>
        </div>
      </div>
    </div>
  </div>
  <t20 />
  <buttonIcon @clicked="storeCharacter.createChar('Personagem sem nome')" icon="import">Criar novo personagem</buttonIcon>
  <buttonIcon @clicked="storeCharacter.deleteChar(storeCharacter.charData.name)" icon="trash">Deletar personagem</buttonIcon>
</flex>
</template>

<style scoped>
.item-cont{width:100%;display:inline-flex;left:0}
.item{position:relative;width:100%;padding:.6em 1.5em .3em;margin:.4em 0;display:inline-flex;top:0}
.item-click{cursor:pointer;width:100%;transition:color .3s}
.item-title{display:inline-flex;margin:auto 0;font-size:1em;font-weight:500;white-space:pre-wrap}
.item-subtitle{font-size:.85em;margin:0}
.selectedChar{background:var(--t20-trans)!important}
</style>