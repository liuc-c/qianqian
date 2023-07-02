<script lang="ts" setup>
defineProps(['updateLog'])
</script>

<template>
  <n-timeline class="mb-2">
    <template v-for="item in updateLog.sort((a, b) => b.time - a.time)">
      <n-timeline-item
        :time="item.updateTime"
        :type="item.newCount === item.deleteCount ? '' : (item.newCount > item.deleteCount ? 'success' : 'error')"
      >
        <template #default>
          <n-text type="success">
            新增 {{ item.newCount }} 题
          </n-text>
          <n-text class="ml-2" type="error">
            删除 {{ item.deleteCount }} 题
          </n-text>
        </template>
      </n-timeline-item>
    </template>
  </n-timeline>
</template>

<style scoped></style>
