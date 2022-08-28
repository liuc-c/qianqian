<script lang="ts" setup>
import data from '../../../public/json/jzk.json'

const topic = ref(data)
</script>

<template>
  <Topic :topic="topic" />
</template>

<route lang="yaml">
meta:
  title: 急诊科
</route>
