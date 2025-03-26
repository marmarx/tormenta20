<script setup>
import flex from '@/composables/flex.vue'
import buttonIcon from '@/composables/buttonIcon.vue'
// import t20 from '@/composables/t20color.vue'

import { computed } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'
const storeCharacter = useCharacterStore()

const activeChar = computed(() => {
  if (!storeCharacter.charData) return null
  return storeCharacter.charData.name
})
</script>

<template>
<flex class="grow">
  <h2>Personagens</h2>
  <div v-if="storeCharacter.charList" class="overflow" style="padding-top:1.5em">
    <div class="item-cont" v-for="char in storeCharacter.charList" :key="`char-${char.name}`" :name="char.name">
      <div class="item" :class="{ selectedChar:char.name == activeChar }" @click="storeCharacter.loadChar(char.name)">
        <p class="item-title bold" v-html="char.name"></p>
        <p class="item-subtitle">{{char.basic.join(' • ')}}</p>
      </div>
    </div>
  </div>
  <!-- <t20 /> -->
  <buttonIcon @clicked="storeCharacter.createChar('Personagem sem nome')" icon="import">Criar novo personagem</buttonIcon>
  <buttonIcon @clicked="storeCharacter.deleteChar(storeCharacter.charData.name)" icon="trash">Deletar personagem</buttonIcon>
</flex>
</template>

<style scoped>
.item-cont{width:100%;display:inline-flex;left:0}

.item{
  position:relative; width:100%;
  padding:0.8em 1.5em; border-left:5px solid transparent;border-radius:8px; margin:0.5em 0;
  display:flex;  align-items:center; flex-direction:column;
  background:var(--back-vanish);
  transition:background 0.3s ease, box-shadow 0.3s ease;
  cursor:pointer
}
.item:hover{background:var(--back-washed)}

.selectedChar{background:var(--t20-trans)!important;border-left: 5px solid var(--t20-hover)}
.item:hover,.selectedChar{box-shadow:0px 2px 5px var(--color-vanish)}

.item-title{
  display:inline-flex;overflow:hidden;margin:auto 0;
  font-size:1em;font-weight:bold;white-space:nowrap;text-overflow:ellipsis
}
.item-subtitle{font-size:.9em;margin:2px 0 0;color:var(--color-washed)}
</style>