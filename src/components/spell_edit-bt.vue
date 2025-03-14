<script setup>
import flex from '@/composables/flex.vue'
import customInput from '@/composables/input.vue'
import customSelect from '@/composables/select.vue'
import customTextArea from '@/composables/textarea.vue'
import spellMod from '@/components/spell-mod.vue'
import { ref,watch,watchEffect,computed,onMounted } from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()
const id = computed(() => route.params.id)

import { useSpellsStore } from '@/stores/spellsStore'
const spellsStore = useSpellsStore();
const spellProperties = computed(() => {
  let list = { ...spellsStore.spellProperties }
  list['Ação'] = list['Ação'].filter(e => !/\d/.test(e)).concat('Outro (escrever)')
  delete list['Publicação']
  return list
})

const allSpells = ref(null);
const fetchSpells = async () => { allSpells.value = await spellsStore.fetchSpells() }
onMounted(fetchSpells);

import { useFilterStore } from '@/stores/filterStore'
const filterStore = useFilterStore()
const spellList = computed(() => filterStore.filterList(allSpells,0,[{id:Number(id.value)}])[0])

import { useCharacterStore } from '@/stores/characterStore'
const storeCharacter = useCharacterStore()
const charSpell = computed(() => ({...(structuredClone(storeCharacter.charSpells.find(item => item.id==id.value)) || {edits:{}}),id:allSpells.value.length}))
watchEffect(() => console.log('charSpell updated:',charSpell.value))

import { objectMap, boldify, unboldify } from '@/stores/utility'
const editSpell = ref({})
watchEffect(() => {if(spellList.value && charSpell.value) editSpell.value = {...objectMap(spellList.value,(v,k) => charSpell.value.edits[k]??v)}})
watch(editSpell,(newVal) => {
  console.log(storeCharacter.charSpells)
  Object.keys(newVal).forEach(key => {if(charSpell.value.edits[key]!==newVal[key]) storeCharacter.updateSpell(id.value,key,newVal[key])})
  console.log(storeCharacter.charSpells)
},{deep:true})

const keyPairs = computed(() => Array.from({length:Math.ceil(spellsStore.spellEditKeys.length/2)},(_, i) => [spellsStore.spellEditKeys[i*2],spellsStore.spellEditKeys[i*2+1] || null]))
</script>

<template>
  <flex v-if="spellList" class="grow">
    <h2>Editar Magia</h2>
    <div class="overflow">
      <customInput type="text" placeholder="Nome" v-model="editSpell.Nome">Nome</customInput>

      <div v-for="(pair,index) in keyPairs" :key="`index-${index}`" class="flexy">
        <div v-for="un in pair" :key="`index-${index}-${un}`" class="half">
          <div v-if="spellProperties.hasOwnProperty(un)">
            <customSelect :options="spellProperties[un]" v-model="editSpell[un]"><template #title>{{un}}</template><template #default>{{un}}</template></customSelect>
          </div>
          <div v-else>
            <customInput type="text" :placeholder="un" v-model="editSpell[un]">{{ un }}</customInput>
          </div>
        </div>
      </div>
      <customTextArea placeholder="Descrição" v-model="editSpell.Descrição">Descrição</customTextArea>
    <p class="label">Modificadores</p>
    <div v-for="obj in spellList.mod" :key="`edit-mod-${obj}`">
      <spellMod :obj="obj" @delete=""></spellMod>
    </div>
    <p class="hint">Dica: utilize *texto* para <b>negrito</b> e _texto_ para <i>itálico</i>.</p>
  </div>
  </flex>
  <flex v-else class="h100">
    <p class="tac">Clique em uma magia para ver e editar</p>
  </flex>
</template>

<style scoped>
.h100{height:100%}
.half{width:45.9999%}
.flexy{display:flex;justify-content:space-between}
p.label{font-size:1em;line-height:1em;padding:.5em 0;font-weight:600}
p.hint{font-size:.8em;text-align:center}
</style>