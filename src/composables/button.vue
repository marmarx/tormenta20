<template>
<button><slot>Click me!</slot></button>
</template>

<style>
button{
  display:inline-block;width:70%;
  font-size:1em;text-align:center;text-decoration:none;font-weight:600;
  color:var(--color-main);background:var(--el-back-color);
  padding:12px 26px;border:2px solid var(--color-main);border-radius:5px;margin:25px auto;
  transition:0.25s ease;cursor:pointer
}
button:hover{color:var(--back-washed);background:var(--color-main)}
</style>