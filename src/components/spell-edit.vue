<script setup>
import flex from '@/composables/flex.vue'
import customInput from '@/composables/input.vue'
import customSelect from '@/composables/select.vue'
import customTextArea from '@/composables/textarea.vue'
import spellMod from '@/components/spell-mod.vue'
import { ref,watch,watchEffect,computed,onMounted } from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()
const spellId = computed(() => Number(route.params.id))

//annonymous function, will always create a new object
const newSpell = ref((() => ({id:spellId.value,Nome:'Nova Magia',Tipo:'Universal',Círculo:1,Escola:'Abjuração',Ação:'Padrão',Publicação:'Criada pelo usuário'}))())
console.log('newSpell:',newSpell.value)

import { useSpellsStore } from '@/stores/spellsStore'
const spellsStore = useSpellsStore()
const allSpells = ref(null);
const fetchSpells = async () => { allSpells.value = await spellsStore.fetchSpells() }
onMounted(fetchSpells);

watchEffect(() => {
  if(!allSpells.value) return
  if(!allSpells.value.find(el => el.id === spellId.value)) allSpells.value.push(newSpell.value)
  console.log('allSpells updated:',allSpells.value[allSpells.length-1])
})

import { useCharacterStore } from '@/stores/characterStore'
const storeCharacter = useCharacterStore()
const charSpells = computed(() => storeCharacter.charSpells)

watchEffect(() => {
  console.log('charSpells.value',charSpells.value)
  if(!storeCharacter.charSpells) return
  if(storeCharacter.charSpells.findIndex(el => el.id === spellId.value)<0) storeCharacter.addRemoveSpell(spellId.value)
  console.log('charSpells updated:',charSpells.value)
})

const spellProperties = computed(() => {
  let list = { ...spellsStore.spellProperties }
  list['Ação'] = list['Ação'].filter(e => !/\d/.test(e)).concat('Outro (escrever)')
  //delete list['Publicação']
  return list
})
const keyPairs = computed(() => Array.from({length:Math.ceil(spellsStore.spellEditKeys.length/2)},(_, i) => [spellsStore.spellEditKeys[i*2],spellsStore.spellEditKeys[i*2+1] || null]))

watchEffect(() => console.log('newSpell updated:',newSpell.value))
watchEffect(() => console.log('charSpells updated:',charSpells.value))
//const a = setInterval(() => console.log('charSpells timeinterval:',charSpells.value),1000)

const delete_mod = () => {

}
</script>

<template>
  <flex v-if="newSpell.edits" class="grow">
    <h2>Editar Magia</h2>
    <div class="overflow">
      <customInput type="text" placeholder="Nome" v-model="newSpell.edits.Nome">Nome</customInput>

      <div v-for="(pair,index) in keyPairs" :key="`index-${index}`" class="flexy">
        <div v-for="un in pair" :key="`index-${index}-${un}`" class="half">
          <div v-if="spellProperties.hasOwnProperty(un)">
            <customSelect :options="spellProperties[un]" v-model="newSpell.edits[un]"><template #title>{{un}}</template><template #default>{{un}}</template></customSelect>
          </div>
          <div v-else>
            <customInput type="text" :placeholder="un" v-model="newSpell.edits[un]">{{ un }}</customInput>
          </div>
        </div>
      </div>
      <customTextArea placeholder="Descrição" v-model="newSpell.edits.Descrição">Descrição</customTextArea>
    <p class="label">Modificadores</p>
    <div v-for="obj in newSpell.edits.mod" :key="`edit-mod-${obj}`">
      <spellMod :obj="obj" @delete="delete_mod"></spellMod>
    </div>
    <p class="hint">Dica: utilize *texto* para <b>negrito</b> e _texto_ para <i>itálico</i>.</p>
  </div>
  </flex>
  <flex v-else class="h100">
    <p class="tac">Clique em Criar Magia para editar</p>
  </flex>
</template>

<style scoped>
.h100{height:100%}
.half{width:45.9999%}
.flexy{display:flex;justify-content:space-between}
p.label{font-size:1em;line-height:1em;padding:.5em 0;font-weight:600}
p.hint{font-size:.8em;text-align:center}
</style>