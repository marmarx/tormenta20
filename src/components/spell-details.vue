<script setup>
import flex from '@/composables/flex.vue'
import btn from '@/composables/button.vue'

import {ref,computed,onMounted,watch} from 'vue'
import {useRoute,useRouter} from 'vue-router';
const route = useRoute();
const id = computed(() => route.params.id);

const router = useRouter();
const edit_spell = () => router.push(`/magias/${id.value}/editar`) //router.currentRoute.value.params.id

const spellList = ref(null)
import {useSpellStore} from '@/stores/spellsStore'
const fetchSpells = async () => spellList.value = await useSpellStore(0,[id.value]).then(data => data[0])
onMounted(fetchSpells); //Fetch spells when component is mounted
watch(() => [id.value],fetchSpells,{deep:true});

const pms = lvl => lvl<2?1:(lvl<3?3:(lvl<4?6:(lvl<5?10:15)))
const mod_pms = (key) => isNaN(key)?key:(`${key} PM${key>1?'s':''}`)
const avoid = ['id','Nome','Tipo','Círculo','Escola','mod','Publicação']
</script>

<template>
  <p v-if="!spellList">Loading spell details...</p>
  <flex v-else>
    <h2>{{ spellList.Nome }}</h2>
    <p class="tac">{{`${pms(spellList.Círculo)} PM${spellList.Círculo>1?'s':''} • ${spellList.Tipo} • ${spellList.Escola} ${spellList.Círculo}`}}</p>

    <div v-for="(value, key) in spellList" :key="key">
      <p v-if="(!avoid.includes(key))"><b>{{ key==='Descrição'?'':`${key}:` }}</b> <span v-html="value"></span></p>
    </div>

    <p v-for="mod in spellList.mod">
      <b>{{ mod_pms(Object.keys(mod).join()) }}:</b>  <span v-html="mod[Object.keys(mod)]"></span>
    </p>
    <p v-if="spellList.Publicação"><i>Publicação:</i> {{spellList.Publicação}}</p>
    <btn @click="edit_spell()">Editar magia</btn>
  </flex>
</template>

<style scoped>
h2{
  font-family:'tormenta20';font-size:2.4em;font-weight:500;
  line-height:1.2em;letter-spacing:4px;text-align:center;
  color:var(--t20-color);filter:var(--bright);
}
p{font-size:.95em;margin:.1em 0;line-height:2.2em}
</style>

<!--
  <flex v-else>
    <div class="item" v-for="item in spellList" v-bind:key="`spell-${item.Nome}`">
      <checkbox @click="$emit('add_remove',item.id)" :checkmarked="!all"/>
      <div class="item-click" @click="open_details(item.id)">
        <p class="item-title">{{ item.Nome }}</p>
        <p class="item-subtitle"></p>
        <div class="item-icon"><div :class="`ac_${item.Ação}`"></div>
      </div>
    </div></div>
  </flex>
-->