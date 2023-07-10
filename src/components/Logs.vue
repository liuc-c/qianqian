<script lang="ts" setup>
import { logList, showLogs } from '@/composables/useLog'
import { useWindowWidth } from '@/composables/useWindowWidth'
const windowWidth = useWindowWidth()
const router = useRouter()

const go = (url: string) => {
  const tempUrl = url.split(' > ').join('-')
  if (windowWidth.value < 600)
    showLogs.value = false
  router.push(`/print/${tempUrl}`)
}
</script>

<template>
  <n-drawer v-model:show="showLogs" :width="windowWidth < 600 ? windowWidth : 600">
    <n-drawer-content closable title="更新日志">
      <n-timeline class="mb-2">
        <template v-for="item in logList.sort((a, b) => b.time - a.time)" :key="item.time">
          <template v-for="(log, logIndex) in item.logs.sort((a, b) => b.time - a.time)" :key="logIndex">
            <n-timeline-item
              :time="log.updateTime"
              :type="log.newCount === log.deleteCount ? '' : (log.newCount > log.deleteCount ? 'success' : 'error')"
            >
              <template #default>
                <n-button text type="info" @click="go(log.label)">
                  {{ log.label }}
                </n-button>
                <div class="mt-1 grid" style="grid-template-columns: repeat(2, 100px)">
                  <n-text :type="log.newCount === 0 ? '' : 'success'">
                    新增 {{ log.newCount }} 题
                  </n-text>
                  <n-text :type="log.deleteCount === 0 ? '' : 'error'">
                    删除 {{ log.deleteCount }} 题
                  </n-text>
                </div>
              </template>
            </n-timeline-item>
          </template>
        </template>
      </n-timeline>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
