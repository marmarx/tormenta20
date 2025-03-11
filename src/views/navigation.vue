<script setup>
import { defineAsyncComponent } from 'vue';
const views = ['Personagem', 'Magias'] //'Combate','Pericias','Poderes','Condicoes','Equipamentos','Anotacoes','Dados','Configuracoes'
const icons = views.map(view => defineAsyncComponent(() => import(`@/icons/menu/nav${view}.vue`)))

import {useRoute} from 'vue-router'
const route = useRoute()
const isActive = view => route.path.startsWith(view.toLowerCase())
</script>

<template>
<nav>
  <router-link v-for="(view,i) in views" :key="`nav-${view}`" :to="`/${view.toLowerCase()}`" :class="{'router-link-active':isActive(`/${view.toLowerCase()}`)}">
    <div class="navicon"><component :is="icons[i]"></component></div>
    <div class="navtext">{{view}}</div>
  </router-link>
</nav>
</template>

<style scoped>
nav{
  display:flex;flex-direction:column;
  position:fixed;left:0;top:50%;transform:translateY(-50%);
  background:var(--back-color);padding:15px 0;box-shadow:0 0 10px rgba(0,0,0,.4)
}

a{
  display:flex;flex-direction:row;align-items:center;
  height:50px;padding:0 25px;
  color:currentColor;opacity:.7;
  text-decoration:none;cursor:pointer;
}
a:hover,a:focus{opacity:1}
a *{transition:all .2s}

.navicon{display:flex;width:28px;height:28px;align-items:center;color:var(--unfocused-color)}
svg,path{color:currentColor;fill:currentColor;filter:brightness(var(--bright));width:100%;height:100%}

.navtext{
  max-width:0;padding:0;opacity:0;
  font-size:1em;line-height:1em;
  overflow:hidden;white-space:nowrap;
  transition:all .2s ease
}
nav:hover .navtext,nav:focus .navtext{opacity:1;max-width:200px;padding:0 10px}

.router-link-active{opacity:1}
.router-link-active .navicon{color:var(--t20-color)!important}
.router-link-active svg,path{fill:var(--t20-color)!important}
.router-link-active .navtext{font-weight:600}
</style>