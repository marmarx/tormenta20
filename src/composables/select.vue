<script setup>
defineProps({modelValue:String, options:Array})
</script>

<template>
<div class="input">
  <p><slot name="title"></slot></p>
  <div class="select">
    <select @change="$emit('update:modelValue',$event.target.value)" required>
    <option value="" selected disabled><slot name="default">Escolha uma opção...</slot></option>
    <option v-for="option in options" :value="option" :selected="modelValue===option">{{ option }}</option>
  </select>
  </div>

</div>
</template>

<style scoped>
@import '@/assets/input.css';
p{font-size:1em;line-height:1em;padding:.5em 0;font-weight:600}
.select{position:relative}
.select::after{content:"▼";font-size:.8em;position:absolute;top:50%;right:10px;transform:translateY(-50%)}
</style>