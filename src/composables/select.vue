<script setup>
defineProps({modelValue:String, options:Array})
</script>

<template>
<div class="input">
  <select @change="$emit('update:modelValue',$event.target.value)" required>
    <option value="" selected disabled><slot name="default">Escolha uma opção...</slot></option>
    <option v-for="option in options" :value="option" :selected="modelValue===option">{{ option }}</option>
  </select>
</div>
</template>

<style scoped>
@import '@/assets/input.css';
</style>