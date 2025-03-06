<script setup>
defineProps({check:{type:String,required:true}})
const model = defineModel()
// const update = () => model.includes(event.target.value)?model.splice(model.indexOf(event.target.value),1):model.push(event.target.value)
</script>

<template>
  <label :for="check" :value="check">
    <slot>Generic checkbox</slot>
    <input type="checkbox" :id="check" :value="check" v-model="model">
    <span class="checkmark"></span>
  </label>
</template>

<style scoped>
label,input,.checkmark{cursor:pointer}
label{
  position:relative;
  width:100%;display:block;
  padding:0 45px 0;margin:.5em -2%;
  font-size:1em;color:currentColor;cursor:pointer;
  -webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;
}
input,.checkmark{position:absolute;left:0;top:0}
input{opacity:0;width:100%;height:100%}
.checkmark{
  width:22px;height:22px;
  border:2px solid #dbdbdb;border-radius:4px;margin:0 .8em 0 .5em;
  color:var(--color)!important;background:var(--el-back-color);
  transition:all .3s;pointer-events:auto
}
label:hover input ~ .checkmark,label:focus input ~ .checkmark,label input:checked ~ .checkmark{background:var(--el-back-hover)}

.checkmark:after{
  content:'';display:none;width:8px;height:13px;
  position:absolute;left:1px;top:1px;
  border:1px solid var(--t20-color);border-width:0 2px 2px 0;
  transform-origin:bottom left;transform:rotate(45deg) translate(-2.5px,-4px);
}
label input:checked ~ .checkmark:after{display:block}
</style>