<script setup>
import flex from '@/composables/flex.vue'
import customInput from '@/composables/input.vue'
import customSelect from '@/composables/select.vue'
import customTextArea from '@/composables/textarea.vue'

import { useCharacterStore } from '@/stores/characterStore'
const storeCharacter = useCharacterStore()

//storeCharacter.clearStorage()

if(!storeCharacter.charData){
  if(storeCharacter.charList.length == 0) storeCharacter.createChar('Novo personagem')
  else storeCharacter.loadChar(storeCharacter.charList[0].id)
}
</script>

<template>
  <flex class="grow">
    <h2>{{storeCharacter.charData.name?storeCharacter.charData.name:'Personagem'}}</h2>
    <div class="overflow" style="padding-top:1.5em">
      <customInput type="text" placeholder="Nome do personagem" v-model="storeCharacter.charData.name" @update:modelValue="storeCharacter.renameChar">Nome</customInput>
      <customInput type="text" placeholder="Nome do jogador" v-model="storeCharacter.charData.stats.jogador">Jogador</customInput>
    </div>
  </flex>
  
  <!-- <div class="atributos">
    <div class="atributo" v-for="atributo in storeCharacter.charData.atributos" :key="`atributo-${atributo}`">
      <p>{{atributo}}</p>
      <input type="number" v-model="storeCharacter.charData.atributos[atributo]" />
    </div> -->
</template>