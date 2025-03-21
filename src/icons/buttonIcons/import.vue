<template>
<div class="import"></div>
</template>

<style>
.import{
  position:relative;
  width:11px;height:11px;color:currentColor;
  margin-left:4px;margin-top:5px;border:solid 1px currentColor;border-radius:1px
}

.import:before,.import:after{content:'';position:absolute}

.import:before{
  top:-4px;left:2px;
  width:1px;height:10px;
  border-left:solid 3px white;border-right:solid 3px white;
  background-color:currentColor;
}

.import:after{
  left:3px;top:1px;
  width:4px;height:4px;
  border-top:solid 1px currentColor;border-right:solid 1px currentColor;
  -webkit-transform:rotate(135deg);transform:rotate(135deg)
}
</style>