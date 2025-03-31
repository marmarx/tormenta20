<script setup>
import layout from '@/composables/layout.vue'

import charLoader from '@/components/char/carregar.vue'
import charMain from '@/components/char/personagem.vue'
import empty from '@/components/empty.vue'
const components = [charLoader, charMain, empty]
</script>

<template>
  <layout :components="components" purpose="" />
</template>