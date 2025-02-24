<script setup>
import spells from '@/stores/localStorage'
</script>

<template>
    <router-view />
  <nav>
    <router-link to="/">Início</router-link>
    <router-link to="/personagem">Personagem</router-link>
    <router-link to="/magias">Magias</router-link>
  </nav>
</template>

<style>
nav{position:fixed;display:flex;flex-direction:column;left:0;top:50%;transform:translateY(-50%);margin-left:15px}
a{margin:15px}
.third{width:33.3333%;padding:0 5em}
@media (min-width:1201px) and (max-width:1650px){.third{width:49.9999%}} /* 1201px < screen < 1650 => 50% */
@media (max-width:1200px){.third{width:100%}} /* screen < 1200px => 100% */
</style>