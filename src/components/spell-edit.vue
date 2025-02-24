<script setup>
import {useRoute} from 'vue-router'
const route = useRoute()

import {computed} from 'vue'
const id = computed(() => route.params.id)


</script>

<template>
  <p>Hello Spell Edit {{ id }}</p>
</template>