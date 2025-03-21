<template>
<div class="export"></div>
</template>

<style>
.export{
  position:relative;
  width:11px;height:9px;color:#000;
  margin-left:4px;margin-top:7px;border:solid 1px currentColor;border-radius:1px
}

.export:before,.export:after{content:'';position:absolute}

.export:before{
  top:-5px;left:2px;
  width:1px;height:8px;
  border-left:solid 3px white;border-right:solid 3px white;
  background-color:currentColor
}

.export:after{
  top:-5px;left:3px;
  width:4px;height:4px;
  border-top:solid 1px currentColor;border-right:solid 1px currentColor;
  -webkit-transform:rotate(-45deg);transform:rotate(-45deg)
}
</style>