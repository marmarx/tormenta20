<script setup>
defineProps({checkmarked:Boolean})
const checkmark = () => event.target.classList.toggle('checkmarked')
</script>

<template>
<div class="checkbox-cont">
  <div class="checkmark" :class="checkmarked?'checkmarked':''" @click="checkmark"></div>
</div>
</template>

<style>
.checkbox-cont{position:relative;width:15%;margin-left:-2%;height:100%;display:flex}
.checkmark{
  position:relative;float:left;width:22px;height:22px;
  border:2px solid #dbdbdb;border-radius:4px;margin:13px auto;
  color:var(--color-main)!important;background:var(--el-back-color);
  cursor:pointer
}
.checkmarked:after{
  content:'';display:block;width:8px;height:13px;
  border:1px solid var(--t20-color);border-width:0 2px 2px 0;
  transform-origin:bottom left;transform:rotate(45deg) translate(-2.5px,-4px);
}
</style>