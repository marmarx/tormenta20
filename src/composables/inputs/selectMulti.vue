<script setup>
import{computed } from 'vue';
const props = defineProps({modelValue:Array, select0:Array, select1:Array, properties:Array, widths:Array})
const emit = defineEmits(["update:modelValue"]);

const selectedItems = computed({
  get: () => props.modelValue,
  set: (newVal) => emit("update:modelValue", newVal),
})

const updateProperty = (index, key, value) => {
  const newSelection = [...selectedItems.value];
  newSelection[index] = {...newSelection[index], [key]: value };
  selectedItems.value = newSelection;
}

const addItem = () => {
  const item = Object.fromEntries(props.properties.map(prop => [prop, '']));
  selectedItems.value = [...selectedItems.value, item];
}

const removeItem = (index) => selectedItems.value = selectedItems.value.filter((_, i) => i !== index)

const isDisabled = (option) => (props.properties[0]==='classe'||props.properties[0]==='distinção')
 ? (selectedItems.value.some(obj => obj[props.properties[0]] === option) || option.includes('--'))
 : false
</script>

<template>
  <div class="input">
    <p v-if="$slots.title"><slot name="title"></slot></p>
    <div class="select-group">
      <div v-for="(item, index) in selectedItems" :key="index" class="item">
        <select :style="{width:widths[0]}" v-model="item[properties[0]]" @change="updateProperty(index, properties[0], $event.target.value)" required>
          <option value="" disabled selected><slot name="text0"></slot></option>
          <option v-for="opt in select0" :key="opt" :value="opt" :disabled="isDisabled(opt)">{{ opt }}</option>
        </select>

        <select :style="{width:widths[1]}" v-model="item[properties[1]]" @change="updateProperty(index, properties[1], $event.target.value)" required>
          <option value="" disabled selected><slot name="text1"></slot></option>
          <option v-for="lvl in select1" :key="lvl" :value="lvl">{{ lvl }}</option>
        </select>

        <button @click="removeItem(index)">✖</button>
      </div>
      <button @click="addItem"><div class="cross"></div><p> Adicionar</p></button>
    </div>
  </div>
</template>

<style scoped>
.select-group{display: flex; flex-direction:column; gap:10px}
.item{display:flex; gap:10px; align-items:center}
button{
  display:flex; align-items:center; justify-content:center;
  width: unset; min-width:30px; padding:.3em; border-radius:5px; border:0; margin: 0;
  cursor:pointer; background:var(--gray-washed);

}
button:hover,button:focus{background:var(--gray-semiwashed)}
.cross{position:relative;width:2px;height:2px;padding:0 1.8em;margin-top:-2px}
.cross:before,.cross:after{content:'';position:absolute;top:50%;left:50%;width:2px;height:2px;background:var(--color-main)}
.cross:before{height:18px;margin-top:-8px}.cross:after{width:18px;margin-left:-8px}
</style>
