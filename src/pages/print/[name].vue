<script lang="ts" setup>
import { getList } from '@/api/print/topic'

const props = defineProps<{ name: string }>()
const topic = ref([])

const getTopicList = async () => {
  const { name } = props
  document.title = name
  const subjectArr = name.split('-')
  if (subjectArr.length === 3) {
    const url = `${subjectArr[0]}/${subjectArr[1]}/${subjectArr[2]}`
    topic.value = await loadJson(url) as []
  }
  else { topic.value = [] }
}

onBeforeMount(async () => {
  await getTopicList()
})

// 当路由参数变化时，页面数据无法更新的时候
watchEffect(() => {
  // 加载数据
  getTopicList()
})

async function loadJson(url: string) {
  // 加载
  try {
    return await getList(`/json/医学电子书包/${url}.json`)
  }
  catch (e) {
    return []
  }
}
</script>

<template>
  <Topic :name="props.name" :topic="topic" />
</template>

<route lang="yaml">
meta:
  title: 其他
</route>
