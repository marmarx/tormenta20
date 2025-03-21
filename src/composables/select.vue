<script setup>
defineProps({modelValue:[String,Number], options:Array})

import checkSingle from '@/composables/checksingle.vue'
import {useSortStore} from '@/stores/sortStore'
const sortStore = useSortStore()
</script>

<template>
<div class="input">
  <p v-if="$slots.title"><slot name="title"></slot></p>
  <div class="select">
    <select @change="$emit('update:modelValue',$event.target.value)" required>
      <option v-if="$slots.default" value selected disabled><slot name="default">Escolha uma opção...</slot></option>
      <option v-for="option in options" :value="option" :selected="modelValue===option">{{ option }}</option>
    </select>
    <checkSingle option="Ordem reversa" v-model="sortStore.reverse"></checkSingle>
  </div>

</div>
</template>

<style scoped>
p{font-size:1em;line-height:1em;padding:.5em 0;font-weight:600}
.select{position:relative}
.select::after{content:"▼";font-size:.8em;position:absolute;top:1px;right:10px;transform:translateY(50%)}
</style>