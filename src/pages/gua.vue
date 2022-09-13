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
  <div class="gossip">
    <n-button type="primary" @click="askDivination">
      算卦
    </n-button>
    <n-button type="primary" @click="onShow">
      八卦阵
    </n-button>
    <div v-if="!isShow" class="content">
      <div class="left">
        <div class="leftTitle">
          {{ guaName }}
        </div>
        <!--        <div class="fontShow" v-for="(val,index) in yaoDetail" :key="index">{{ val }}</div> -->
      </div>
      <div class="showTime right">
        <div
          v-for="(val, index) in yaoArr" :key="index" class="yao" :title="yaoDetail[index]"
          @click="changeClassName(index)"
        >
          <div :class="val ? 'yang' : 'yin'" />
          <div class="yaoDetail">
            {{ yaoDetail[index] }}
          </div>
        </div>
      </div>
    </div>
    <!-- 爻层  -->
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
  //position: relative;
  .n-button{
    margin: 10px;
  }
  .baGua {
    position: relative;
    display: flex;
    justify-content: center;
    top: 100px;
    .planet {
      //position: absolute;
      //border: 2px solid #fff;
      //transform-style: preserve-3d;
      //width: 50vw;
      //height: 50vw;
      //display: flex;
      //align-items: center;
      //justify-content: center;
      transform: rotateZ(45deg);
      animation: planet-rotate 50s linear infinite;
      //border-radius: 50%;
      .ball {
        width: 25px;
        height: 25px;
        position: absolute;
        border-radius: 50%;
        background-color: yellowgreen;
        left: calc(50% - 12.5px);
        top: -50px;
        transform: rotateZ(-45deg); // 中和轨道的旋转
        //animation: self-rotate 180s linear infinite;
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
            background: white;
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
          background: white;
          border-radius: 100px 0 0 100px;
          transform: rotate(180deg);

          &:before {
            content: "";
            background: black;
            width: 100px;
            height: 100px;
            box-sizing: border-box;
            position: absolute;
            border: white solid 30px;
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

  .content {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;

    .left {
      width: 50%;
      font-size: 25px;
      margin-top: 50px;

      .leftTitle {
        position: absolute;
        right: 50%;
        transform: translate(50%);
        text-align: center;
        font-size: 400px;
        color: rgba(115, 124, 123, 0.5);
        cursor: default;
        transition-duration: 1s;
      }
    }

    .right {
      position: relative;

      .yaoDetail {
        position: absolute;
        width: 900px;
        height: 50px;
        right: 400px;
        font-size: 24px;
      }
    }

    .showTime {
      height: 600px;
      position: relative;
      vertical-align: middle;
      //display: flex;
      .yao:hover {
        transition-duration: 1s;
        background: #a4cab6;
      }
      .yao {
        right: 100px;
        margin-top: 20px;
        width: 300px;
        height: 50px;
        background: black;

        .yin {
          position: absolute;
          width: 20px;
          height: 50px;
          left: 50%;
          transform: translate(-50%, 0);
          background: white;
        }
        .yang {
          background: #2c3e50;
        }
      }
    }
  }
}
</style>
