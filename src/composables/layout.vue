<template>
<div class="layout">
  <div class="layout-third hide"><slot name="layout1"></slot></div>
  <div class="layout-third     "><slot name="layout2"></slot></div>
  <div class="layout-third hide"><slot name="layout3"></slot></div>
</div>
</template>

<style>
.layout{display:flex;flex-direction:row;height:calc(100vh - 16px)}
@media (min-width:1730px){.layout{height:calc(100vh - 115px)}}

.layout-third{width:33.3333%;min-width:500px;padding:0 3em 2.5em;display:flex;flex-direction:column}
@media (max-width:1730px){.layout-third{width:100%;min-width:unset}.hide{display:none}}
</style>