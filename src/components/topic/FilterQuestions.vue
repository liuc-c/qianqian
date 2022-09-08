<script lang="ts" setup>
import { useTopicTypeArr } from '@/composables/useFilterQuestions'
import { useTopicLoad } from '@/composables/useTopic'

const { active } = defineProps<{ active: boolean }>()
const emits = defineEmits<{
  (event: 'update:active', active: boolean): void
}>()
const { topicLoading } = useTopicLoad()
const handleUpdateChecked = (item: any) => {
  item.isShow = !item.isShow
}

const { topicTypeArr } = useTopicTypeArr()
const selectAll = (flag = true) => {
  topicTypeArr.value = topicTypeArr.value.map((item) => {
    item.isShow = flag
    return item
  })
}

const closeDrawer = () => {
  emits('update:active', false)
}
</script>

<template>
  <n-drawer-content title="题型">
    <n-spin :show="topicLoading">
      <n-space class="mb-5">
        <n-button size="tiny" type="success" @click="selectAll()">
          全选
        </n-button>
        <n-button size="tiny" type="success" @click="selectAll(false)">
          全不选
        </n-button>
        <n-button size="tiny" type="success" @click="closeDrawer()">
          关闭
        </n-button>
      </n-space>
      <n-space item-style="display: flex;">
        <n-checkbox
          v-for="item in topicTypeArr" :key="item.typeCode" :checked="item.isShow" :label="`${item.label} （ ${item.count} 题 ）`"
          @update:checked="handleUpdateChecked(item)"
        />
      </n-space>
    </n-spin>
  </n-drawer-content>
</template>

<style scoped>
</style>
