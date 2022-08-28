<script lang="ts" setup>
import data from '../../../public/json/zzjhs.json'

const topic = ref(data)
</script>

<template>
  <Topic :topic="topic" />
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  title: 重症监护室
</route>
