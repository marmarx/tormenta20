<script setup>
import flex from '@/composables/flex.vue'
import btn from '@/composables/button.vue'
import pencil from '@/icons/buttonIcons/pencil.vue'

import {ref,computed,onMounted,watch} from 'vue'
import {useRouter,useRoute} from 'vue-router';
const route = useRoute();
const router = useRouter();
const edit_spell = () => router.push(`${router.currentRoute.value.path}/editar`)

import {useSpellsStore} from '@/stores/spellsStore'   //import {useSpellStore} from '@/stores/old_spellsStore'
const spellsStore = useSpellsStore();

const allSpells = ref(null);
const fetchSpells = async () => { allSpells.value = await spellsStore.fetchSpells() }
onMounted(fetchSpells); //fetch spells when component is mounted

import {useFilterStore} from '@/stores/filterStore'
const filterStore = useFilterStore()

const spellList = computed(() => filterStore.filterList(allSpells,0,[{id:Number(route.params.id)}])[0])

const pms = lvl => lvl<2?1:(lvl<3?3:(lvl<4?6:(lvl<5?10:15)))
const mod_pms = (key) => isNaN(key)?key:(`${key} PM${key>1?'s':''}`)
const avoid = ['id','Nome','Tipo','Círculo','Escola','mod','Publicação']
</script>

<template>
  <flex v-if="spellList">
    <h2>{{ spellList.Nome }}</h2>
    <p class="tac">{{`${pms(spellList.Círculo)} PM${spellList.Círculo>1?'s':''} • ${spellList.Tipo} • ${spellList.Escola} ${spellList.Círculo}`}}</p>
    <div class="grow">
      <div class="flex-over overflow">
        <pencil v-if="0" @click="edit_spell(spellList.id)"/>  <!-- v-if! -->
        <div v-for="(value, key) in spellList" :key="key">
          <p v-if="(!avoid.includes(key))"><b>{{ key==='Descrição'?'':`${key}:` }}</b> <span v-html="value"></span></p>
        </div>
        <p v-for="mod in spellList.mod"><b>{{ mod_pms(Object.keys(mod).join()) }}:</b>  <span v-html="mod[Object.keys(mod)]"></span></p>
        <p v-if="spellList.Publicação"><i>Publicação:</i> {{ Array.isArray(spellList.Publicação)?spellList.Publicação.join(', '):spellList.Publicação }}</p>
      </div>
    </div>
  </flex>
  <flex v-else class="h100">
    <p class="tac">Clique em uma magia para ver e editar</p>
  </flex>
</template>

<style>
p{font-size:.95em;margin:.1em 0;line-height:2.2em}
.flex-over{display:flex;flex-direction:column}
.h100{height:100%}
</style>