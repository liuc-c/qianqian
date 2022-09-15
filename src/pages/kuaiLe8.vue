<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { randomNum } from '@/utils/utils'
// 获取输入的数字
const number = ref('')
const numberArr = ref([])
const message = useMessage()
function luckyDraw() {
  // 清空数组内的值
  numberArr.value = []
  getRandomNumber()
}
// 获取几个随机数
function getRandomNumber() {
  if (number.value <= 0 || number.value > 20) {
    message.warning('请输入1-20之间的数字！')
    return 0
  }

  // 创建叔数组来装随机生成的数字
  for (let i = 0; i < number.value; i++)
    numberArr.value.push(randomNum(80, 1))

  numberArr.value = numberArr.value.map((item) => {
    if (item < 10)
      return `${0}${item}`
    else
      return `${item}`
  })
}
</script>

<template>
  <div class="box">
    <p>
      <em op75 text-sm>操作步骤：输入1-20之间的数字，点击抽奖，得到中奖号码！！！</em>
    </p>
    <n-space justify="center" align="center">
      <n-input v-model:value.number="number" placeholder="输入1-20之间的一个数" />
    </n-space>
    <n-button type="info" @click="luckyDraw">
      抽奖
    </n-button>
    <n-card title="中奖号码" :hoverable="true" size="large">
      <p>
        <em op75 text-sm> 兰博基尼，指日可待</em>
      </p>
      <n-space :size="15">
        <!--        <span class="luckyNumberIndex">第{{ index + 1 }}位数字</span> -->
        <n-tag v-for="(item, index) in numberArr" :key="index" type="error">
          {{ item }}
        </n-tag>
      </n-space>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
  .box{
    height: 35rem;
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    justify-content: space-around;
    align-items: center;
  .n-card {
        max-width: 14.6rem;
        line-height:1rem;
        font-size: 1rem;
        font-family: sans-serif;
    .n-tag{
      margin-top: 25px;
    }
      }
  }
</style>

<route lang="yaml">
meta:
  title: 彩票快乐8
</route>
