<script setup>
defineProps({number:Number})
</script>

<template>
  <div>Ciao, Io sono componente C<br><br>{{ number }}</div>
</template>

<style scoped>
div{text-align:center;width:100%;height:100%;font-size:2em}
/* div{background:green} */
</style>