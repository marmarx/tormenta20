<template>
<div class="layout">
  <div class="layout-third"><slot name="first"></slot></div>
  <div class="layout-third"><slot name="second"></slot></div>
  <div class="layout-third"><slot name="third"></slot></div>
</div>
</template>

<style>
.layout{display:flex;flex-direction:row;max-height:calc(100vh - 64px)}
.layout-third{width:33.3333%;padding:0 5em;overflow-y:scroll}
</style>

<!--
<layout>
  <template #first>

  </template>
  <template #second>
    
  </template>
  <template #third>
    
  </template>
</layout>
-->