<script setup>
import { computed } from 'vue';

const data = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };

const keyPairs = computed(() => {
  const entries = Object.keys(data);
  return entries.reduce((acc, item, index) => {
    if (index % 2 === 0) {
      acc.push([item, entries[index + 1] || null]); // Pair with the next item or null
    }
    console.log(acc)
    return acc;
  }, []);
});
</script>

<template>
  <div v-for="(pair, index) in keyPairs" :key="index">
    <div v-if="pair[0]">
      <strong>{{ pair[0] }}:</strong> {{ pair[1] }}
    </div>
  </div>
</template>