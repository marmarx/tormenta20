<script setup>
import layout from '@/composables/layout.vue'

import spellFilter from '@/components/spells/filtros.vue'
import spellMain from '@/components/spells/lista.vue'
import spellDetails from '@/components/spells/detalhes.vue'
import spellEdit from '@/components/spells/editar.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()
const spellDetailsEdit = computed(() => route.path.includes('edit')?spellEdit:spellDetails)  //?spellEdit:spellDetails

const components = [spellFilter, spellMain, spellDetailsEdit.value] //spellDetailsEdit.value]
</script>

<template>
  <layout :components="components" purpose="spells" />
</template>