<template>
<div class="pencilbox"><div class="pencil"></div></div>
</template>

<style scoped>
.pencilbox{
  position:relative;
  width:15px;height:15px;
  border:2px var(--color-main) solid;margin:auto;
  cursor:pointer; transform:scale(.8)
}
.pencilbox:before{
  position:absolute;top:-2px;right:-2px;
  display:block;width:10px;height:11px;
  background:#fff
}

.pencil{
  position:relative;top:-15px;
  display:inline-block;width:25px;height:36px;
  padding:0 7px;margin-top:-4px;
  vertical-align:middle;cursor:pointer
}
.pencil:before{
  position:absolute;top:50%;left:50%;
  width:3px;height:5px;
  background-color:var(--color-main);
  box-shadow:1px 0px 0px var(--color-main),
      2px 0px 0px var(--color-main),
      3px 0px 0px var(--color-main),
      -1px 0px 0px var(--color-main),
      -2px 0px 0px var(--color-main),
      -3px 0px 0px var(--color-main),
      -3.3px 0px 0px var(--color-main),
      7px 0px 0px var(--color-main);
  transform:translate(-2px,-3px) rotate(-45deg);
}
.pencil:after{
  position:absolute;top:50%;left:50%;font-size:1px;
  border:solid 3em transparent;border-left-width:0;border-right-width:5em;border-right-color:var(--color-main);
  transform:translate(-9px,3px) rotate(-45deg)
}
.pencilbox:before,.pencil:before,.pencil:after{content:''}
</style>