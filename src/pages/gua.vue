<script setup>
// 引入自己写的方法 一个是获取随机数 一个是求和
import { randomNum, sum } from '@/utils/utils'
// 取四个随机数
// 模仿3个硬let arr = [];
// 把三枚硬币的和放入每一次的和放入数组
const arrSum = []
// 三个硬币抛一次获得一个爻(yao 第二声),抛六次整合后得到一个卦象
for (let i = 0; i < 6; i++) {
  // 清空arr数组
  const arr = []
  // 模仿3个硬币，每次抛一个硬币获取1个随机数，并存入数组
  for (let j = 0; j < 3; j++) {
    // 这里定义每一次抛的结果为2或3
    const number = randomNum(2, 3)
    // 把随机获取的随机数放入数组
    arr.push(number)
  }
  // 把抛三次硬币的结果的和放入一个数组
  // 从左往右数，数组的最后一个为第一个随机数和，倒数第二个为第二个随机数的和，依次类推
  arrSum.unshift(sum(...arr))
}
// 币获取2个随机数的数组

// 遍历获取到的数组实现卦象
// 6属阴 7属阳 9属阳 8属阴
// 阴阳表示符
// 阴 --
// 阳 ——
const arr = ref([])
arr.value.push('***** 卦象展示 *****')
arrSum.forEach((item, index) => {
  if (gua === 0)
    arr.value.push('***** 上卦 *****')
  else if (gua === 3)
    arr.value.push('***** 下卦 *****')

  if (item === 7 || item === 9)
    arr.value.push('***** —— *****')
  else
    arr.value.push('***** -- *****')
})
</script>

<template>
  <p v-for="(value, index) in arr" :key="gua">
    {{ value }}
  </p>
</template>

<style scoped>

</style>
