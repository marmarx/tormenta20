<template>
<div class="layout">
  <div class="layout-third hid1"><slot name="layout1"></slot></div>
  <div class="layout-third     "><slot name="layout2"></slot></div>
  <div class="layout-third hid3"><slot name="layout3"></slot></div>
</div>
</template>

<style>
.layout{display:flex;flex-direction:row;height:calc(100vh - 16px)}

.layout-third{position:relative;width:33.3333%;min-width:500px;padding:0 3em 2.5em;display:flex;flex-direction:column}
@media (max-width:1730px){.layout-third{width:49.9999%;min-width:unset}}
@media (max-width:1035px){.layout-third{width:100%;min-width:unset;padding:0 0 2.5em}}

/* 1035px and 1730px */
@media (max-width:1730px){.hid3{display:none}}
@media (max-width:1035px){.hid1{display:none}}
</style>