<script setup>
import { ref, computed } from "vue";

const showDropdown = ref(false);
const selectedOptions = ref([]);
const options = [
  { group: "Swedish Cars", value: "Volvo" },
  { value: "Saab" },
  { group: "German Cars",  value: "Mercedes" },
  { value: "Audi" }
];

// Detect mobile device
const isMobile = /Mobi|iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Remove an item when clicked inside the inline display
const removeItem = (value) => selectedOptions.value = selectedOptions.value.filter(v => v !== value);

// Check if an option is selected
const isSelected = (value) => selectedOptions.value.includes(value);

// Update selection when an option is checked
const toggleSelection = (value) => {
  if (isSelected(value)) selectedOptions.value = selectedOptions.value.filter(v => v !== value);
  else selectedOptions.value.push(value);
};

// Display text for selected items
import { useSlots } from 'vue'
const slots = useSlots()
const selectedText = computed(() => selectedOptions.value.length ? selectedOptions.value.join(", ") : (slots.default ? slots.default() : "Escolha uma ou mais opções..."));
</script>

<template>
  <!-- MOBILE: Use native <select> -->
  <select v-if="isMobile" v-model="selectedOptions" multiple required>
    <option value selected disabled>{{selectedText}}</option>
    <template v-for="opt in options" :key="opt.value">
      <optgroup v-if="opt.group">{{ opt.group }}</optgroup>
      <option :value="opt.value">{{ opt.value }}</option>
    </template>
  </select>

  <!-- DESKTOP: Custom dropdown -->
  <div v-else class="custom-select" @focus="showDropdown=true" @blur="showDropdown=false" tabindex="0">
    <div class="selected-items">
      <span v-for="value in selectedOptions" :key="value" @click.stop="removeItem(value)">{{ value }} ✖</span>
    </div>
    <div class="dropdown" @click.stop="this.parentNode.focus()" v-show="showDropdown">
      <label v-for="opt in options" :key="opt.value">
        <input type="checkbox" :checked="isSelected(opt.value)" @change="toggleSelection(opt.value)"/>
        {{ opt.value }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.custom-select{
  position:relative; display:inline-block;
  min-width:200px; min-height:27px;
  padding:5px; border:1px solid #ccc;
  cursor: pointer;
}
.custom-select:focus{
  outline:none; border-color:#007BFF;
}
.selected-items{display:flex; flex-wrap:wrap; gap:5px}
.selected-items span{
  background:#ddd;
  padding:3px 5px; border-radius:3px;
  cursor:pointer;
}
.dropdown{
  position:absolute; top:100%; left:0;
  width: 100%;
  background:white;
  padding:5px; border:1px solid #ccc;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}
label{display:flex; align-items:center; gap:5px; cursor:pointer}
</style>