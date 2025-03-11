<template>
<div class="trash"></div>
</template>

<style scoped>
.trash{
  width:10px;height:12px;color:currentColor;
  border:2px solid transparent;margin:auto;
  border-bottom-left-radius:1px;border-bottom-right-radius:1px;
  box-shadow:0 0 0 2px,inset -2px 0 0,inset 2px 0 0;
}
.trash:before{
  width:10px;height:4px;
  border:2px solid;margin:-8px 0 0 -2px;
  border-bottom:transparent;
  border-top-left-radius:2px;border-top-right-radius:2px;
}
.trash:after{
  width:20px;height:2px;
  margin:-4px 0 0 -7px;border-radius:3px;
  background:currentColor;
}
</style>