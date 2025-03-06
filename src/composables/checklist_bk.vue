<script setup>
// const emits = defineEmits(['update:checkmark']);
const checkmark = () => {
  event.target.classList.toggle('checkmarked');
  // emits('update:modelValue',!event.target.classList.contains('checkmarked'))
}
</script>

<template>
<div class="checkbox-cont">
  <div class="checkmark" @click="checkmark"></div>
  <label for="checkmark"><slot /></label>
</div>
</template>

<style scoped>
input{display:none}
.checkbox-cont{position:relative;width:100%;margin:.5em -2%;height:100%;display:flex;color:currentColor}
.checkmark{
  position:relative;float:left;width:22px;height:22px;
  border:2px solid #dbdbdb;border-radius:4px;margin:0 .8em 0 .5em;
  color:var(--color)!important;background:var(--el-back-color);
  cursor:pointer
}
.checkmarked:after{
  content:'';display:block;width:8px;height:13px;
  border:1px solid var(--t20-color);border-width:0 2px 2px 0;
  transform-origin:bottom left;transform:rotate(45deg) translate(-2.5px,-4px);
}
label{position:relative;float:left;padding:0;color:currentColor}
</style>