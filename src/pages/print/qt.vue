<script lang="ts" setup>
import data from '../../../public/json/qt.json'

const topic = ref(data)
</script>

<template>
  <Topic :topic="topic" />
</template>

<route lang="yaml">
meta:
  title: 其他
</route>
