<script setup>
defineProps({number:Number})
</script>

<template>
  <div>Moin, ich bin component B<br><br>{{ number }}</div>
</template>

<style scoped>
div{text-align:center;width:100%;height:100%;font-size:2em}
/* div{background:blue} */
</style>