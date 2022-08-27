<template>
  <button class="c-dark-btn" icon-btn @click="toggleDark()">
    <div dark:i-carbon-moon i-carbon-sun text-xl />
  </button>
  <n-back-top :right="20" />
</template>

<style>
.c-dark-btn{
  position: fixed ;
  top: 12px;
  right: 20px;
}
@media print {
  .n-back-top{
    display: none;
  }
}
</style>
