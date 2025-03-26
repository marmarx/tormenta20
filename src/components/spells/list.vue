<script setup>
defineEmits(['add_remove'])
const props = defineProps({
  list:{type:Array,required:true},  //[{id:1,history:0,edits:{}},{id:5,history:1,edits:{Nome:'Mini bola de fogo'}}]
  activeTab:{type:Boolean,default:false},
  purpose:String
})

import checkbox from '@/composables/checkbox.vue'
import flex from '@/composables/flex.vue'
import scrollbar from '@/composables/scrollbar.vue'
import { ref, computed, watch, onMounted } from 'vue'

import {useSpellsStore} from '@/stores/spellsStore'   //import {useSpellStore} from '@/stores/old_spellsStore'
const spellsStore = useSpellsStore();

const allSpells = ref(null);
const fetchSpells = async () => { allSpells.value = await spellsStore.fetchSpells() }
onMounted(fetchSpells); // Fetch spells when component is mounted

import { useRouter } from 'vue-router';
const router = useRouter();
const open_details = spellId => router.push(`/magias/${spellId}`)

import {createFilterStore} from '@/stores/filterStore'
const filterStore = createFilterStore(props.purpose)();

const filteredSpells = computed(() => {
  if (!allSpells.value) return [];
  return filterStore.filterSearch(allSpells, props.activeTab, props.list);
});

import {useSortStore} from '@/stores/sortStore'
const sortStore = useSortStore()

const orderedSpellsList = ref([]);
//why not computed? Because 'list' changes aren't important, as 'filteredSpells' already changes when 'list' changes, also it must trigger when 'sortBy' and 'reverse' are changed
watch(() => [sortStore.sortBy, sortStore.reverse, filteredSpells.value],() => {
  orderedSpellsList.value = sortStore.sorter(props.list,filteredSpells.value,'spells')
},{deep:true});

const beingScrolled = ref(false)
const handleScroll = () => beingScrolled.value = true

const pms = lvl => lvl<2?1:(lvl<3?3:(lvl<4?6:(lvl<5?10:15)))
const transX = computed(() => `${props.activeTab?'-':''}25%`)
const create_spell = () => router.push(`/magias/${allSpells.value.length}/editar`)
</script>

<template>
  <p v-if="!allSpells">Carregando lista de magias...</p>
  <flex v-else class="grow">
    <TransitionGroup tag="div" name="slide" class="overflow" @scroll="handleScroll">
      <div class="item-cont" v-for="item in orderedSpellsList" :key="`spell-${item.id}`">
        <div class="item">
          <checkbox @click="$emit('add_remove',item.id)" :checkmarked="!activeTab" />
          <div class="item-click" @click="open_details(item.id)">
            <p class="item-title" v-html="item.Nome"></p>
            <p class="item-subtitle">{{`${pms(item.Círculo)} PM${item.Círculo>1?'s':''} • ${item.Tipo} • ${item.Escola} ${item.Círculo}`}}</p>
            <div class="item-icon"><div :class="`ac_${item.Ação}`"></div></div>
          </div>
        </div>
      </div>
    </TransitionGroup>
    <scrollbar :orderedSpellsList="orderedSpellsList" :list="list" :beingScrolled="beingScrolled" v-model="beingScrolled" />
    <!-- <btn @click="create_spell">Criar Magia</btn> -->
  </flex>
</template>

<style scoped>
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
</style>

<style scoped>
p{line-height:1.8em}
</style>