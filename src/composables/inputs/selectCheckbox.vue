<script setup>
const props = defineProps({modelValue:Array, options:Array})
const emit = defineEmits(["update:modelValue"])

import fakeCheckBox from '@/composables/inputs/fakeCheckbox.vue'
const isMobile = /Mobi|iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

import { ref, computed } from "vue";
const showDropdown = ref(false);
const dropdownRef = ref(null);
const selectedOptions = computed({
  get: () => props.modelValue,                        //const selectedOptions = ref(props.modelValue);
  set: (newVal) => emit("update:modelValue", newVal)  //watch(selectedOptions, (newVal) => emit('update:modelValue', newVal),{deep:true})  //$emit("update:modelValue", newValue)
})

const isSelected = (val) => selectedOptions.value.includes(val)
const removeItem = (val) => selectedOptions.value = selectedOptions.value.filter(v => v !== val)  //keep all, but 'val'

const toggleSelection = (val) => {
  if (isSelected(val)) removeItem(val)
  else selectedOptions.value.push(val)
}

const handleFocusOut = (event) => {
  if(dropdownRef.value && dropdownRef.value.contains(event.relatedTarget)) return; //if the new focused element is inside showDropdown, do nothing
  showDropdown.value = false;
};

//const slots = useSlots()
//const selectedText = computed(() => selectedOptions.value.length ? selectedOptions.value.join(", ") : (slots.default ? slots.default : "Escolha uma ou mais opções..."))
</script>

<template>
<div class="input">
  <p v-if="$slots.title"><slot name="title"></slot></p>
  <div class="select">
    

    <div v-if="isMobile">
      <select v-model="selectedOptions" size="1" multiple required>
        <!-- <option value selected disabled>{{ selectedText }}</option> -->
        <option value selected disabled><slot v-if="!selectedOptions.length"></slot></option>
        <option v-for="opt in options" :key="opt" :value="opt" :disabled="opt.includes('--')">{{ opt }}</option>
      </select>
      <div class="selected-items overlayed">
        <span v-for="value in selectedOptions" :key="value" @click.stop="removeItem(value)">{{ value }} ✖</span>
      </div>
    </div>

    <div v-else ref="dropdownRef" class="fakeinput" tabindex="0" @focusin="showDropdown = true" @focusout="handleFocusOut">
      <slot v-if="!selectedOptions.length"></slot>
      <div class="selected-items">
        <span v-for="value in selectedOptions" :key="value" @click.stop="removeItem(value)">{{ value }} ✖</span>
      </div>
      <div class="dropdown" v-show="showDropdown">
        <label v-for="opt in options" :key="opt">
          <span v-if="opt.includes('--')" class="group">{{ opt }}</span>
          <fakeCheckBox v-else :option="opt" :checked="isSelected(opt)" @click="toggleSelection(opt)"></fakeCheckBox>
        </label>
      </div>
    </div>

  </div>
</div>
</template>

<style scoped>
p{font-size:1em;line-height:1em;padding:.5em 0;font-weight:600}
select{padding:.75em 1.3em!important}
.select{position:relative}
.select::after{content:"▼";font-size:.8em;position:absolute;top:1px;right:10px;transform:translateY(50%)}
.select select{overflow-y:hidden}
.select option:nth-child(2){margin-top:15px}
 .group{padding:.5em 2.3em} /*font-weight:bold */

.fakeinput{
  position:relative; display:inline-block; align-content:center;
  width:100%; min-height:45.19px;
  padding:0 1.3em!important;
  color:var(--gray); cursor:pointer;
}
.selected-items{display:flex; flex-wrap:wrap; gap:5px}
.selected-items span{
  background:var(--t20-trans,#ddd);
  padding:3px 7px; border-radius:3px;
  cursor:pointer;
}
.overlayed{
  position:absolute; top:1px; left:1.35em; z-index:1;
  display:flex; align-items:center;
  height:calc(100% - 6px);
}
.overlayed span{height:fit-content}
.dropdown{
  position:absolute; top:100%; left:0;
  width: 100%; max-height:250px; overflow-y:scroll;
  background:var(--back-color);
  padding:5px; border:1px solid #ccc;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  z-index:1;
}
label{position:relative; display:flex; align-items:center; gap:5px; cursor:pointer; padding:0}
</style>


<!-- Chosen is a good alternative for desktop, but not quite as good on mobile: https://harvesthq.github.io/chosen/ -->