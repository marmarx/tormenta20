<script setup>
import flex from '@/composables/flex.vue'
import customInput from '@/composables/input.vue'
import customSelect from '@/composables/select.vue'
import customTextArea from '@/composables/textarea.vue'

import { useCharacterStore } from '@/stores/characterStore'
const storeCharacter = useCharacterStore()

if(!storeCharacter.charData){
  if(storeCharacter.charList.length == 0) storeCharacter.creatChar('Personagem sem nome')
  else storeCharacter.loadChar(storeCharacter.charList[0].name)
}
</script>

<template>
  <flex class="grow">
    <h2>{{storeCharacter.charData.name}}</h2>
    <div class="overflow" style="padding-top:1.5em">
      <customInput type="text" placeholder="Nome do personagem" v-model="storeCharacter.charData.name">Nome</customInput>
    </div>
  </flex>
  
  <!-- <div class="atributos">
    <div class="atributo" v-for="atributo in storeCharacter.charData.atributos" :key="`atributo-${atributo}`">
      <p>{{atributo}}</p>
      <input type="number" v-model="storeCharacter.charData.atributos[atributo]" />
    </div> -->
</template>