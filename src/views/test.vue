<script setup>
import { ref, computed, onMounted } from "vue";

import {useSpellsStore} from '@/stores/spellsStore'   //import {useSpellStore} from '@/stores/old_spellsStore'
const spellsStore = useSpellsStore();

const allSpells = ref(null);
const fetchSpells = async () => { allSpells.value = await spellsStore.fetchSpells() }
onMounted(fetchSpells); // Fetch spells when component is mounted

import { useFilterStore } from "@/stores/filterStore2";
const filterStore = useFilterStore();
filterStore.filterCheck.value = {
  ...filterStore.filterCheck.value,
  Tipo: ['Universal']
}

const filteredItems = computed(() => filterStore.filterSearch(allSpells));
</script>

<template>
  <div v-for="item in filteredItems" :key="item.id">
    {{ item.Nome }}
  </div>
</template>