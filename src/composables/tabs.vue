<script setup>
defineEmits(['tab'])
</script>

<template>
<div class="tab_container">
  <input type="radio" id="tab1" class="tab" name="tab" checked @click="$emit('tab',0)">
  <label for="tab1"><slot name="first"></slot></label>
  <input type="radio" id="tab2" class="tab" name="tab" @click="$emit('tab',1)">
  <label for="tab2"><slot name="second"></slot></label>
  <div class="line"></div>
</div>
</template>

<style scoped>
.tab_container{display:flex;position:relative;margin-bottom:.6em}
.tab{display:none}
.tab:checked + label{background:var(--over-trans);opacity:1}
.tab#tab1:checked ~ .line{left:0%}
.tab#tab2:checked ~ .line{left:50%}
label{
	display:inline-block;position:relative;width:50%;height:2.2rem;
  font-size:1rem;line-height:2.2rem;text-align:center;
  background:var(--el-back-color);color:var(--color);opacity:.7;
  transition:0.25s background ease;
  cursor:pointer
}
label::after{
	content:"";display:block;width:100%;height:2px;
	position:absolute;left:0;bottom:0;
	background:#ccc;transition:0.25s ease
}
label:hover{opacity:1}
.line{
	position:absolute;left:0;top:2.2rem;
  width:50%;height:2px;margin-top:-2px;
  background:var(--t20-color);  
  transition:0.25s ease
}
</style>