<script setup>
defineEmits(['add_remove'])
const props = defineProps({
  list:{type:Array,required:true},  //[{id:1,history:0,edits:{}},{id:5,history:1,edits:{Nome:'Mini bola de fogo'}}]
  activeTab:{type:Boolean,default:false}
})

import checkbox from '@/composables/checkbox.vue'
import flex from '@/composables/flex.vue'
import btn from '@/composables/button.vue'
import { ref, computed, onMounted, watchEffect } from 'vue'

import {useRouter} from 'vue-router';
const router = useRouter();
const open_details = spellId => router.push(`/magias/${spellId}`)

import {useSpellsStore} from '@/stores/spellsStore'   //import {useSpellStore} from '@/stores/old_spellsStore'
const spellsStore = useSpellsStore();

const allSpells = ref(null);
const fetchSpells = async () => { allSpells.value = await spellsStore.fetchSpells() }
onMounted(fetchSpells); // Fetch spells when component is mounted

import {useFilterStore} from '@/stores/filterStore'
const filterStore = useFilterStore()

const filteredSpells = ref([]);
watchEffect(() => {
  if (!allSpells.value) return; // wait until spells are loaded
  filteredSpells.value = filterStore.filterSearch(allSpells, props.activeTab, props.list);
})

import {useSortStore} from '@/stores/sortStore'
const sortStore = useSortStore()  //'Nome','Círculo','Escola','Ação','Publicação','Adicionada em...'
const orderedSpellsList = computed(() => sortStore.sorter(props.list,filteredSpells.value))

const removeAccents = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
const indexer = item => {
  if(!sortStore.sortBy) return
  if(sortStore.sortBy==='Nome') return removeAccents(item.Nome.charAt(0))
  if(sortStore.sortBy==='Escola') return removeAccents(item.Escola.substring(0,4))
  if(sortStore.sortBy==='Adicionada em...') return `${getDate(item.history)}/${getMonth(item.history)}/${getYear(item.history)}`
  return item[sortStore.sortBy]
}
//'set' is assigned 'new Set', a new empty Set used to track values and returns the subfunction
//the subfunction checks if 'set' has 'value', if not add 'value' to 'set' and then return 'value', otherwise 'value' isn't added to 'set' and return '-'
const scrollBar = computed(() => orderedSpellsList.value
  ? orderedSpellsList.value.map((set => val => !set.has(indexer(val)) && set.add(indexer(val)) ? indexer(val) : '')(new Set))
  :[])

const beingScrolled = ref(false)
let scrollTimeout = null
const handleScroll = () => {
  beingScrolled.value = true
  if(scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {beingScrolled.value = false},1000)
}

const pms = lvl => lvl<2?1:(lvl<3?3:(lvl<4?6:(lvl<5?10:15)))
const transX = computed(() => `${props.activeTab?'-':''}25%`)
const create_spell = () => router.push(`/magias/${allSpells.value.length}/editar`)
</script>

<template>
  <p v-if="!allSpells">Carregando lista de magias...</p>
  <flex v-else class="grow">
    <!-- <b>very last allSpells</b><br>{{ allSpells[allSpells.length -1] }}<br> -->
    <!-- <b>orderedSpellsList</b><br>{{ orderedSpellsList }} -->
    <TransitionGroup tag="div" name="slide" class="overflow" @scroll="handleScroll">
      <div class="item-cont" v-for="item in orderedSpellsList" :key="`spell-${item.id}`">
        <div class="item">
          <checkbox @click="$emit('add_remove',item.id)" :checkmarked="!activeTab" />
          <div class="item-click" @click="open_details(item.id)">
            <p class="item-title" v-html="item.Nome"></p>
            <p class="item-subtitle">{{`${pms(item.Círculo)} PM${item.Círculo>1?'s':null} • ${item.Tipo} • ${item.Escola} ${item.Círculo}`}}</p>
            <div class="item-icon"><div :class="`ac_${item.Ação}`"></div></div>
          </div>
        </div>
      </div>
    </TransitionGroup>
    <div class="scrollBar" :class="{viewBar:beingScrolled}">
        <div v-for="(item,index) in scrollBar" :key="`scrollbar-${index}`" class="scrollItem" :item="item?item:null"></div>
    </div>
    <!-- <btn @click="create_spell">Criar Magia</btn> -->
  </flex>
</template>

<style>
@import '@/icons/actions.css';
.item-cont{width:100%;display:inline-flex;left:0}
.item{position:relative;width:100%;margin:.6em 0;display:inline-flex;top:0}
.item-click{cursor:pointer;width:100%}
.item-title{display:inline-flex;margin:auto 0;font-size:1em;font-weight:500;white-space:pre-wrap}
.item-subtitle{font-size:.85em;margin:0}
.item-icon{display:flex;position:absolute;right:0;top:0;height:100%;aspect-ratio:1/1}

.slide-enter-active,.slide-leave-active .item{left:0;transition:all .25s ease-in-out}
.slide-enter-active .item,.slide-leave-active,.slide-move{transition:all .3s ease;transition-delay:.2s}
.slide-leave-active .item{position:absolute;width:90%} /*move other elements smoothly */
.slide-enter-active .item{position:relative} /*move other elements smoothly */

.slide-enter-to .item,.slide-leave-from .item{opacity:1;transform:translate(0,-30%)}
.slide-enter-from .item,.slide-leave-to .item{opacity:0;transform:translate(v-bind(transX),-30%)}

.scrollBar{
  position:absolute;right:6px;top:0;
  min-width:15px;height:100%;padding-right:6px;
  display:flex;flex-direction:column;
  color:var(--sub-color);opacity:0;transition:all .2s ease-in-out
}
.scrollBar:hover,.viewBar{opacity:.8}
.scrollItem{position:relative;height:100%}
.scrollItem:after{
  content:attr(item);
  position:absolute;right:0;top:0;
  width:fit-content;
  font-size:.8em;align-content:center;text-align:right;white-space:nowrap;
  padding:1px 7px;border-radius:10px;margin-left:auto;
  background:var(--gray-washed)
}
</style>

<style scoped>
p{line-height:1.8em}
</style>