<script setup>
import '@/pages/particleEffects/js/breathing-halftone.pkgd'
const BreathingHalftone = window.BreathingHalftone

let isInited = false

let halftone

// options for each demo
const demoOptions = {
  'ikun1': {},

  'ncsu': {
    dotSizeThreshold: 0.1,
    isAdditive: true,
    isRadial: true,
    friction: 0.04,
    hoverDiameter: 0.8,
    hoverForce: 0.007,
    activeDiameter: 0.8,
    activeForce: -0.007,
  },

  'the-look': {
    dotSize: 1 / 70,
    initVelocity: 0.05,
    oscAmplitude: 0,
    friction: 0.05,
    channels: ['lum'],
  },
}

function init() {
  // init once
  if (isInited)
    return
  isInited = true

  // hide all demo images
  document.querySelector('.hero').className += ' is-active'

  const thumbnailRail = document.querySelector('.thumbnails')
  let activeName, activeDemo

  function initHalftone(name) {
    // do not re-init
    if (name === activeName)
      return

    // hide active demo
    if (activeDemo)
      activeDemo.style.display = 'none'

    // stop previous halftone
    if (halftone)
      halftone.destroy()

    const demo = document.querySelector(`.demo.${name}`)
    demo.style.display = 'block'
    const img = demo.querySelector('img')
    const opts = demoOptions[name]
    halftone = new BreathingHalftone(img, opts)
    window.halftone = halftone
    activeName = name
    activeDemo = demo
  }

  initHalftone('ikun1')

  thumbnailRail.addEventListener('click', onThumbnailClick, false)

  function onThumbnailClick(event) {
    if (event.target.nodeName !== 'IMG')
      return

    const name = event.target.getAttribute('data-name')
    // console.log(name)
    initHalftone(name)
    thumbnailRail.querySelector('.is-selected').className = ''
    event.target.className = 'is-selected'
  }
}
document.addEventListener('DOMContentLoaded', init, false)
onMounted(() => {
  init()
  // 手机端适应
})
</script>

<template>
  <div class="container">
    <div id="content">
      <div style="text-align:center;clear:both;" />
      <div class="hero">
        <div class="demo ikun1">
          <img class="halftone" src="@/pages/particleEffects/img/ikun_012.jpg">
        </div>
        <div class="demo ikun2">
          <img class="halftone" src="@/pages/particleEffects/img/ikun_116.jpg">
        </div>
        <div class="demo ikun3">
          <img class="halftone" src="@/pages/particleEffects/img/ikun_138.jpg">
        </div>
        <div class="thumbnails">
          <img data-name="ikun1" class="is-selected" src="@/pages/particleEffects/img/ikun_012.jpg">
          <img data-name="ikun2" src="@/pages/particleEffects/img/ikun_116.jpg">
          <img data-name="ikun3" src="@/pages/particleEffects/img/ikun_138.jpg">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(css/normalize.css);
@import url(css/styles.css);
</style>
