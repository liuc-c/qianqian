<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
// 定义需要的变量
const value = ref('')
const results = ref(['请输入大于等于6的偶数'])
const message = useMessage()
// 判断这个数是否是质数
function isPrimeNumber(a) {
  let i = 2
  for (i; i <= a / 2; i++) {
    if (a % i === 0)
      break
  }
  return i > a / 2
}
// 点击按钮出发事件
function jisuan() {
  results.value = []
  // 判断输入数值是否满足条件
  if (value.value % 2 !== 0 || value.value < 6) {
    value.value = ''
    results.value.push('该数字不符合条件，请重新输入数字！！！')
    message.warning('这个数不是大于等于6的偶数')
  }
  else {
    fenjie(value.value)
  }
}
// 对输入的数进行分解
function fenjie(number) {
  for (let i = 2; i <= number / 2; i++) {
    if (isPrimeNumber(i) && isPrimeNumber(number - i)) {
      results.value.push(i)
      results.value.push(number - i)
      break
    }
  }
}
</script>

<template>
  <div class="box">
    <n-h1>哥德巴赫猜想</n-h1>
    <n-space justify="center" align="center">
      <n-input v-model:value.number="value" placeholder="请输入大于等于6的偶数" />
    </n-space>
    <n-card title="计算结果" :hoverable="true">
      <span v-for="(item, index) in results" :key="index" p-4>
        {{ item }}
      </span>
    </n-card>
    <n-button type="info" @click="jisuan">
      计算
    </n-button>
  </div>
</template>

<style scoped>
.n-card {
  max-width: 400px;
}
.box{
  display: flex;
  /*margin: auto;*/
  height: 300px;
  margin-top: 200px;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
</style>

<route lang="yaml">
meta:
  title: 哥德巴赫猜想
</route>
