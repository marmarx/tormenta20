<script setup>
import flex from '@/composables/flex.vue'
import buttonIcon from '@/composables/buttonIcon.vue'
import buttonImport from '@/composables/buttonImport.vue'
import t20color from '@/composables/inputs/t20color.vue'

import { computed } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'
const storeCharacter = useCharacterStore()

const activeChar = computed(() => {
  if (!storeCharacter.charData) return null
  return storeCharacter.charData.id
})
</script>

<template>
<flex class="grow">
  <h2>Personagens</h2>
  <div v-if="storeCharacter.charList" class="overflow" style="padding-top:1.5em;min-height:300px">
    <div class="item-cont" v-for="char in storeCharacter.charList" :key="`char-${char.name}`" :name="char.name">
      <div class="item" :class="{ selectedChar:char.id == activeChar }" @click="storeCharacter.loadChar(char.id)">
        <p class="item-title bold" v-html="char.name"></p>
        <p class="item-subtitle">{{char.basic.filter(Boolean).join(' • ')}}</p>
      </div>
    </div>
  </div>
  <buttonIcon @clicked="storeCharacter.createChar('Personagem sem nome')" icon="pencil">Novo personagem</buttonIcon>
  <buttonIcon @clicked="storeCharacter.deleteChar" icon="erase">Apagar personagem</buttonIcon>
  <!-- <buttonIcon @clicked="" icon="print">Imprimir ficha</buttonIcon> -->
  <buttonImport @clicked="storeCharacter.importChar" icon="import">Importar personagem</buttonImport>
  <buttonIcon @clicked="storeCharacter.exportChar" icon="export">Exportar personagem</buttonIcon>
  <buttonIcon @clicked="storeCharacter.clearStorage" icon="trash">Apagar todos os dados</buttonIcon>
  <t20color/>
</flex>
</template>

<style scoped>
.item-cont{width:100%;display:inline-flex;left:0}

.item{
  position:relative; width:100%;
  padding:0.8em 1.5em; border-left:5px solid transparent;border-radius:8px; margin:0.5em 0;
  display:flex;  align-items:center; flex-direction:column;
  background:var(--back-vanish); box-shadow:0px 2px 5px var(--color-vanish);
  transition:background 0.3s ease, box-shadow 0.3s ease;
  cursor:pointer
}
.item:hover{background:var(--back-washed)}

.selectedChar{background:var(--t20-trans)!important;border-left: 5px solid var(--t20-hover)}
.item:hover{background:var(--gray-vanish)}

.item-title{
  display:inline-flex;overflow:hidden;margin:auto 0;
  font-size:1em;font-weight:bold;white-space:nowrap;text-overflow:ellipsis
}
.item-subtitle{font-size:.9em;margin:2px 0 0;color:var(--color-washed)}
</style>