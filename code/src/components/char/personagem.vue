<script setup>
import flex from '@/composables/flex.vue'
import textInput from '@/composables/inputs/textInput.vue'
import numberInput from '@/composables/inputs/numberInput.vue'
import selectInput from '@/composables/inputs/selectInput.vue'
import selectCheckbox from '@/composables/inputs/selectCheckbox.vue'
import multiSelect from '@/composables/inputs/selectMulti.vue'
import atributes from '@/composables/atributes.vue'

import { useCharacterStore } from '@/stores/characterStore'
const storeCharacter = useCharacterStore()

//storeCharacter.clearStorage()

if(!storeCharacter.charData){
  if(storeCharacter.charList.length == 0) storeCharacter.createChar('Novo personagem')
  else storeCharacter.loadChar(storeCharacter.charList[0].id)
}

import { races, origens, classes, distinções, níveis, divindades, tamanhos, deslocamentos } from '@/stores/constantsStore'
</script>

<template>
  <flex class="grow">
    <h2>{{storeCharacter.charData.name?storeCharacter.charData.name:'Personagem'}}</h2>
    <div class="overflow" style="padding-top:1.5em">
      <textInput placeholder="Nome do personagem" v-model="storeCharacter.charData.name" @update:modelValue="storeCharacter.renameChar">Nome</textInput>
      <textInput placeholder="Jogador" v-model="storeCharacter.charData.stats.jogador">Jogador</textInput>
      <atributes />

      <selectInput :options="races" v-model="storeCharacter.charData.stats.raça">
        <template #title>Raça</template>
        <template #default>Escolha uma raça...</template>
      </selectInput>

      <selectCheckbox :options="origens" v-model="storeCharacter.charData.stats.origem">
        <template #title>Origem</template>
        <template #default>Escolha uma ou mais origens...</template>
      </selectCheckbox>


      <multiSelect :select0="classes" :select1="níveis" :properties="['classe','nível']" :widths="['80%','20%']" v-model="storeCharacter.charData.stats.classes">
        <template #title>Classe</template>
        <template #text0>Adicione uma classe...</template>
        <template #text1>Nível</template>
      </multiSelect>

      <multiSelect :select0="distinções" :select1="níveis" :properties="['distinção','nível']" :widths="['80%','20%']" v-model="storeCharacter.charData.stats.distinção">
        <template #title>Distinção</template>
        <template #text0>Adicione uma distinção...</template>
        <template #text1>Nível</template>
      </multiSelect>


      <selectCheckbox :options="divindades" v-model="storeCharacter.charData.stats.divindade">
        <template #title>Divindade</template>
        <template #default>Escolha uma ou mais divindades...</template>
      </selectCheckbox>

      <selectInput :options="tamanhos" v-model="storeCharacter.charData.stats.tamanho">
        <template #title>Tamanho</template>
        <template #default>Escolha um tamanho...</template>
      </selectInput>


      <multiSelect :select0="deslocamentos.tipo" :select1="deslocamentos.velocidade" :properties="['tipo','velocidade']" :widths="['50%','50%']" v-model="storeCharacter.charData.stats.deslocamento">
        <template #title>Deslocamento</template>
        <template #text0>Tipo</template>
        <template #text1>Velocidade</template>
      </multiSelect>

      
      <!-- pv: min/max bar -->
      <!-- pm: min/max bar -->
      <numberInput min="0" max="210000" placeholder="Pontos de experiência" v-model="storeCharacter.charData.stats.experiência">Experiência</numberInput>
    </div>
  </flex>
</template>