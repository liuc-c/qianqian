// 生成概率相等的随机数
export function randomNum(max, min) {
  if (max < min) {
    max = max ^ min
    min = max ^ min
    max = max ^ min
  }
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/* 求任意数字的和 */
export function sum() {
  let res = 0
  for (let i = 0; i < arguments.length; i++)
    res += arguments[i]
  return res
}
// 获取时间差
export function diffTime(newTime, oldTime) {
  // 如果新时间大于老时间则
  const maxTime = newTime > oldTime ? newTime : oldTime
  const minTime = newTime > oldTime ? oldTime : newTime
  const poor = Math.ceil((maxTime.getTime() - minTime.getTime()) / 1000)
  return {
    day: Math.floor(poor / (60 * 60 * 24)),
    hours: Math.floor((poor % (60 * 60 * 24)) / (60 * 60)),
    minutes: Math.floor((poor % (60 * 60)) / 60),
    seconds: Math.floor(poor % 60),
  }
}
/* 判断是否为质数 */
export function isPrimeNumber(a) {
  const i = 0
  for (let i = 2; i <= a / 2; i++) {
    if (a % i === 0)
      break
  }
  if (i > a / 2)
    return true
  else
    return false
}

/* 求一个数字的阶乘 */
export function factorial(a) {
  let res = 1
  for (let i = a; i > 0; i--)
    res *= i
  return res
}

