<script lang="ts" setup>
import { chapter, useTopicLoad } from '@/composables/useTopic'
const props = defineProps<{ active: boolean;windowWidth: number }>()
const emits = defineEmits<{ (event: 'update:active', active: boolean): void }>()
const router = useRouter()
const { topicLoading } = useTopicLoad()
const go = (url: string) => {
  if (props.windowWidth < 500)
    emits('update:active', false)
  router.push(`/print/${url}`)
}
</script>

<template>
  <n-drawer-content title="章节">
    <n-spin :show="topicLoading">
      <template v-for="item in chapter" :key="item.label">
        <n-h6 align-text prefix="bar" type="success">
          <n-text type="primary">
            {{ item.label }}
          </n-text>
        </n-h6>
        <template v-for="subItem in item.child" :key="subItem.label">
          <n-h6>
            <n-text type="info">
              {{ subItem.label }}
            </n-text>
          </n-h6>
          <div class="btn-box">
            <template v-for="btn in subItem.child" :key="btn.label">
              <n-button class="mr-3 mb-2" size="tiny" type="success" @click="go(`${item.label}-${subItem.label}-${btn.label}`)">
                {{ btn.label }}
              </n-button>
            </template>
          </div>
        </template>
      </template>
    </n-spin>
  </n-drawer-content>
</template>

<style scoped>
.btn-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.btn-box > button {
  background-color: var(--n-color);
}
</style>
