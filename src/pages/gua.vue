<script setup>
import { getList } from '@/api/print/topic'
// 引入自己写的方法 一个是获取随机数 一个是求和
import { randomNum, sum } from '@/utils/utils'

const active = ref('')
// 用于接收后台传输卦相关的数据
const data = ref([])
// 用于显示的数组
const yaoArr = ref([])
// 爻辞
const yaoDetail = ref([])
// 卦名
const guaName = ref('')
// 卦的解析
const guaDetail = ref('')
// 设置显示或隐藏
const isShow = ref(false)
// 初始化
onMounted(() => {
  getInfo()
  // 手机端适应
})
// 手机端适配
// 显示图片
function onShow() {
  isShow.value = !isShow.value
  // 去掉卦象和卦辞
  yaoDetail.value = []
  yaoArr.value = []
  guaName.value = ''
}
// 请请求数据
async function getInfo() {
// 请求数据
  await getList('/json/卦象/gua.json').then((res) => {
    // 把后台传递的数据赋值给data
    data.value = res.gua
  },
  ).catch((error) => {
    return { error }
  })
}

// 点击每个爻时触发事件
function changeClassName(index) {
  const arr = yaoArr.value
  arr[index] = arr[index] ? 0 : 1
  yaoArr.value = []
  arr.forEach((item) => {
    yaoArr.value.push(item)
  })
  jieXi()
}

// 解析数据
function jieXi() {
  // 遍历64卦数据
  const yaoObj = data.value.find((item) => {
    // 把yaoArr转换为字符串
    return item['gua-xiang'] === yaoArr.value.join('')
  })
  // 把爻辞存入数组中
  yaoDetail.value = yaoObj['yao-detail'].slice().reverse()
  // 存储卦名
  guaName.value = yaoObj['gua-name']
  // 存入卦的解析
  guaDetail.value = yaoObj['gua-detail']
}

// 点击算卦获取卦值
function askDivination() {
  isShow.value = false
  // 取四个随机数
  // 模仿3个硬币获取2个随机数的数组
  let arr = []
  // 把三枚硬币的和放入每一次的和放入数组
  const arrSum = []
  // 三个硬币抛一次获得一个爻(yao 第二声),抛六次整合后得到一个卦象
  for (let i = 0; i < 6; i++) {
    // 清空arr数组
    arr = []
    // 模仿3个硬币，每次抛一个硬币获取1个随机数，并存入数组
    for (let j = 0; j < 3; j++) {
      // 这里定义每一次抛的结果为2或3
      const number = randomNum(2, 3)
      // 把随机获取的随机数放入数组
      arr.push(number)
    }
    // 把抛三次硬币的结果的和放入一个数组
    // 从左往右数，数组的最后一个为第一个随机数和，倒数第二个为第二个随机数的和，依次类推
    arrSum.push(sum(...arr))
  }
  // 转换为1或0的数组表示每个爻
  yaoArr.value = arrSum.map((item) => {
    if (item === 7 || item === 9)
      return 1
    else
      return 0
  })
  //  解析数据
  jieXi()
}
</script>

<template>
  <!--  <div class="aaa" /> -->
  <div class="gossip">
    <n-button type="primary" @click="askDivination">
      算卦
    </n-button>
    <n-button type="primary" @click="onShow">
      八卦阵
    </n-button>
    <!--    卦名    -->
    <div class="guaName">
      {{ guaName }}
    </div>
    <!--   卦象和爻辞   -->
    <div
      v-for="(val, index) in yaoArr" :key="index" class="yao" :title="yaoDetail[index]"
      @click="changeClassName(index)"
    >
      <!--    卦象      -->
      <div class="guaXiang">
        <div :class="val ? 'yang' : 'yin'" />
      </div>
      <!--    卦辞      -->
      <div class="yaoDetail">
        {{ yaoDetail[index] }}
      </div>
    </div>
    <!-- 八卦阵  -->
    <div v-show="isShow" class="baGua">
      <div class="planet">
        <!--  旋转的爻    -->
        <div class="ball" />
        <!-- 八卦图形 -->
        <div class="guaImg">
          <div class="left" />
          <div class="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gossip {
  height: 100vh;
  //卦的标题
  .guaName{
    font-size: 4rem;
    color: rgba(115, 124, 123, 0.5);
    cursor: default;
    transition-duration: 1s;
  }
    //卦辞
    //鼠标移动到卦象时变色
    .yao:hover{
      height: 100px;
      transition-duration: 1s;
      cursor:pointer;
      //transform: 0.1;
    }
    //卦象
    .yao {
      margin-top: 1rem;
      //background: black;
      display: flex;
      flex-direction: column;
      align-items: center;
      .guaXiang{
        background-color: black;
        position: relative;
        width: 300px;
        height: 50px;
        .yin {
          //margin-top: -1px;
          position: absolute;
          top: -1px;
          width: 25px;
          height: 52px;
          left: 50%;
          transform: translate(-50%, 0);
          background: white;
        }
        .yang {
          background: #2c3e50;
          //height: 52px;
        }
      }
    }
    //卦辞
    .yaoDetail {
      //margin-top: 5px;
      height: 50px;
      font-size: 0.9rem;
    }
  //按钮
  .n-button{
    margin: 10px;
  }
  //八卦阵
  .baGua {
    position: relative;
    display: flex;
    justify-content: center;
    top: 100px;
    .planet {
      transform: rotateZ(45deg);
      animation: planet-rotate 50s linear infinite;
      .ball {
        width: 25px;
        height: 25px;
        position: absolute;
        border-radius: 50%;
        background-color: yellowgreen;
        left: calc(50% - 12.5px);
        top: -50px;
        transform: rotateZ(-45deg); // 中和轨道的旋转
      }
      .guaImg {
        width: 200px;
        height: 200px;
        position: relative;
        .left {
          width: 50%;
          height: 100%;
          background: black;
          border-radius: 100px 0 0 100px;
          position: relative;

          &:before {
            content: "";
            background: #e2e1e4;
            width: 100px;
            height: 100px;
            box-sizing: border-box;
            position: absolute;
            border: black solid 30px;
            border-radius: 50%;
            z-index: 1;
            left: 50%;
          }
        }

        .right {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          background: #e2e1e4;
          border-radius: 100px 0 0 100px;
          transform: rotate(180deg);

          &:before {
            content: "";
            background: black;
            width: 100px;
            height: 100px;
            box-sizing: border-box;
            position: absolute;
            border: #e2e1e4 solid 30px;
            border-radius: 50%;
            z-index: 1;
            left: 50%;
          }
        }
      }
    }

  }
  // 公转动画
  @keyframes planet-rotate {
    0% {
      transform: scaleY(1) rotate(0);
    }
    100% {
      transform: scaleY(1) rotate(360deg);
    }
  }
  @keyframes rotate {
    0% {
      transform: rotateZ(0deg); //从零度开始
    }
    50% {
      transform: rotateZ(180deg); //从零度开始
    }
    100% {
      transform: rotateZ(360deg); //从零度开始
    }
  }
}
</style>
