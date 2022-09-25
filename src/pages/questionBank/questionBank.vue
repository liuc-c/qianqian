<script setup>
import { getList } from '@/api/print/topic'
// 获取数据
const data = ref([])
const topicOfDryData = ref([])
// 请求一次数据然后对数据进行分发
// 请请求数据
async function getInfo() {
// 请求数据
  await getList('/json/医学电子书包/超声医学科/出科考试/重症医学科.json').then((res) => {
    // 把后台传递的数据赋值给data
    data.value = res
    console.log(data.value[0])
    // 处理数据题干数据
    data.value.forEach((item) => {
      topicOfDryData.value.push(item.topic)
    })
    // console.log(topicOfDryData.value)
  },
  ).catch((error) => {
    return { error }
  })
}
// 初始化
onMounted(() => {
  getInfo()
})
</script>

<template>
  <TopicOfDry :topic-of-dry-data="data" />
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  title: 高仿题库
</route>
