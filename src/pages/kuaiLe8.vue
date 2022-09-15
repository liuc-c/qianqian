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
  if (number.value < 0 || number.value > 20) {
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
      <n-input v-model:value.number="number" placeholder="请输入1-20之间的一个数" />
    </n-space>
    <n-button type="info" @click="luckyDraw">
      抽奖
    </n-button>
    <n-card title="中奖号码" :hoverable="true" size="large">
      <p>
        <em op75 text-sm> 兰博基尼，指日可待！！！</em>
      </p>
      <span v-for="(item, index) in numberArr" :key="index" p-2>
        第{{ index + 1 }}位数字：{{ item }}
      </span>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
  .box{
    height: 25rem;
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    justify-content: space-between;
    align-items: center;
  .n-card {
        background-color: #ee3f4d;
        max-width: 400px;
        line-height:1rem;
        font-size: 1rem;
        span{
          display: flow-root;
          text-align:left;
        }
      }
  }
</style>

<route lang="yaml">
meta:
  title: 快乐8
</route>
