<script setup>
defineProps({modelValue:String, placeholder:String})
</script>

<template>
<div class="input">
  <p v-if="$slots.default"><slot></slot></p>
  <textarea :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue',$event.target.value)"></textarea>
</div>
</template>

<style scoped>
p{font-size:1em;line-height:1em;padding:.5em 0;font-weight:600}
</style>  