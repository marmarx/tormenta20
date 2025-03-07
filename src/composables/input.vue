<template>
<div class="input">
  <p><slot>Custom input</slot></p>
  <input type="text" @input="$emit('update:modelValue',$event.target.value)" required/>
</div>
</template>

<style scoped>
@import '@/assets/input.css';
input{padding:.8em 1.3em!important}
p{font-size:1em;line-height:1em;padding:.5em 0;font-weight:600}
</style>