<script setup>
import checkbox from '@/composables/checkbox.vue'
import flex from '@/composables/flex.vue'
import { ref, onMounted, watch, computed } from 'vue'
const spellList = ref(null)
const props = defineProps({list:{type:Array,required:true},all:{type:Boolean,default:false}})
defineEmits(['add_remove'])

import {useSpellStore} from '@/stores/spellsStore'
const fetchSpells = async () => {
  spellList.value = await useSpellStore(props.all,props.list)
}
onMounted(fetchSpells); //Fetch spells when component is mounted
//Watch for changes in `list` and refetch; 'deep:true' is used to detect changes to an object's property, an array's elements, or nested structures (like objects inside arrays)
watch(() => props.list,fetchSpells,{deep:true});

const query = ref('')
const computedSpelllist = computed(() => query?spellList.value.filter((item) => item.Nome.toLowerCase().includes(query.value)):spellList.value)
const pms = lvl => lvl<2?1:(lvl<3?3:(lvl<4?6:(lvl<5?10:15)))

import {useRouter} from 'vue-router';
const router = useRouter();
const open_details = (id) => router.push(`/magias/${id}`)
const transX = computed(() => `translateX(${props.all?'-':''}25%)`)
</script>

<template>
  <input v-model="query" />
  <p v-if="!spellList">Loading spells...</p>
  <flex v-else>
    <TransitionGroup tag="div" name="slide">
      <div class="item-cont" v-for="item in computedSpelllist" v-bind:key="`spell-${item.id}`">
        <div class="item">
          <checkbox @click="$emit('add_remove',item.id)" :checkmarked="!all" />
          <div class="item-click" @click="open_details(item.id)">
            <p class="item-title">{{ item.Nome }}</p>
            <p class="item-subtitle">{{`${pms(item.Círculo)} PM${item.Círculo>1?'s':''} • ${item.Tipo} • ${item.Escola} ${item.Círculo}`}}</p>
            <div class="item-icon"><div :class="`ac_${item.Ação}`"></div></div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </flex>
</template>

<style>
@import '@/icons/actions.css';
.item{position:relative;width:100%;margin:.6em 0;display:inline-flex}
.item-click{cursor:pointer;width:100%}
.item-title{display:inline-flex;margin:auto 0;font-size:1em;font-weight:500}
.item-subtitle{font-size:.85em;margin:0}
.item-icon{display:flex;position:absolute;right:0;top:0;height:100%;aspect-ratio:1/1}

.slide-enter-active,.slide-leave-active .item{transition:all .25s ease-in-out}
.slide-enter-active .item,.slide-leave-active,.slide-move{transition:all .4s ease-in-out,position 1s ease-in-out;transition-delay:.2s}
.slide-leave-active{position:absolute;width:90%} /*move other elements smoothly */
.slide-enter-active{position:relative} /*move other elements smoothly */

.slide-enter-from .item,.slide-leave-to .item{opacity:0;transform:v-bind(transX)}
</style>