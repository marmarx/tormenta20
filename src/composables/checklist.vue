<script setup>
const props = defineProps({modelValue:Array, options:Array})
const emit = defineEmits(["update:modelValue"])

const updateSelection = (option, isChecked) => {
  const newValue = isChecked ? [...props.modelValue, option] : props.modelValue.filter((item) => item !== option);  //add or remove option
  emit("update:modelValue", newValue); //emit updated array
}
</script>

<template>
  <div class="input">
    <p v-if="$slots.default"><slot></slot></p>
    <label v-for="option in options" :key="`checkbox-${option}`" :for="`checkbox-${option}`">
      {{ option }}  <!-- isNaN(option)?option:`Nível ${option}` -->
      <input type="checkbox" :id="`checkbox-${option}`" :value="option" :checked="modelValue.includes(option)" @change="updateSelection(option, $event.target.checked)" />
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<style scoped>
label,input,.checkmark{cursor:pointer;pointer-events:auto}
label{
  position:relative;width:100%;display:block;
  padding:0 45px 0;margin:.5em -2%;
  font-size:1em;color:currentColor;
  -webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;
}
input{opacity:0;width:100%;height:100%}
input,.checkmark{position:absolute;left:0;top:0}
.checkmark{
  width:22px;height:22px;
  border:2px solid #dbdbdb;border-radius:4px;margin:0 .8em 0 .5em;
  color:var(--color)!important;background:var(--el-back-color);
  transition:all .3s
}
label:hover input ~ .checkmark,label:focus input ~ .checkmark,label input:checked ~ .checkmark{background:var(--el-back-hover)}

.checkmark:after{
  content:'';display:none;width:8px;height:13px;
  position:absolute;left:1px;top:1px;
  border:1px solid var(--t20-color);border-width:0 2px 2px 0;
  transform-origin:bottom left;transform:rotate(45deg) translate(-2.5px,-4px);
}
label input:checked ~ .checkmark:after{display:block}
p{font-size:1em;line-height:1em;padding:.5em 0;font-weight:600}
</style>