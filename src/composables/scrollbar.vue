<script setup>
import { removeAccents } from '@/stores/utility'
import { computed, watch } from 'vue'

const props = defineProps({orderedSpellsList:Array,beingScrolled:Boolean,list:Array})
const emit = defineEmits(['update:modelValue'])

import {useSortStore} from '@/stores/sortStore'
const sortStore = useSortStore()

const indexerAvoid = ['Publicação']
const indexer = item => {
  if(!sortStore.sortBy||indexerAvoid.includes(sortStore.sortBy)) return null
  if(sortStore.sortBy==='Nome') return removeAccents(item.Nome.charAt(0))
  if(sortStore.sortBy==='Escola') return removeAccents(item.Escola.substring(0,4))
  if(sortStore.sortBy==='Adicionada em...') {
    const orderMap = new Map(props.list.map(spell => [spell.id, spell.history]));
    const history = orderMap.get(item.id); //get the history in orderMap
    const date = new Date(history);
    return history ? `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` : null
  }
  return item[sortStore.sortBy]
}

//'set' is assigned 'new Set', a new empty Set used to track values and returns the subfunction
//the subfunction checks if 'set' has 'value', if not add 'value' to 'set' and then return 'value', otherwise 'value' isn't added to 'set' and return '-'
const scrollBar = computed(() => props.orderedSpellsList
  ? props.orderedSpellsList.map((set => val => !set.has(indexer(val)) && set.add(indexer(val)) ? indexer(val) : null)(new Set))
  : []
);

let scrollTimeout = null
const isScrolled = computed(() => props.beingScrolled)
const handleScroll = () => {
  if (scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => emit('update:modelValue',false),2000) //since props are read-only, emit an event to update it on the parent
}
watch(isScrolled,(newVal) => {if(newVal) handleScroll()})
</script>

<template>
  <div class="scrollBar" :class="{viewBar:isScrolled}">
      <div v-for="(item,index) in scrollBar" :key="`scrollbar-${index}-${item}`" class="scrollItem" :item="item"></div>
  </div>
</template>

<style>
.scrollBar{
  position:absolute;right:6px;top:0;
  min-width:15px;height:100%;padding-right:6px;
  display:flex;flex-direction:column;
  color:var(--color-washed);opacity:0;transition:all .2s ease-in-out
}
.scrollBar:hover,.viewBar{opacity:.8}
.scrollItem{position:relative;height:100%}
.scrollItem:after{
  content:attr(item);display:block;
  position:absolute;right:0;top:0;
  width:fit-content;
  font-size:.8em;align-content:center;text-align:right;white-space:nowrap;
  padding:1px 7px;border-radius:10px;margin-left:auto;
  background:var(--gray-washed)
}
</style>