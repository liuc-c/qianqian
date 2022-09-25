/*
 * @Author: TBlac 1253592833@qq.com
 * @Date: 2022-09-21 15:00:37
 * @LastEditors: TBlac 1253592833@qq.com
 * @LastEditTime: 2022-09-21 16:46:26
 * @FilePath: \testd:\workSpace\小游戏\粒子特效\html5-canvas-pixel-image\js\scripts.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
(function (window) {
  'use strict'

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
  window.onload = init
})(window)
