/*!
 * Breathing Halftone
 * Images go whoa with lots of floaty dots
 * http://breathing-halftone.desandro.com
 */

(function (window) {
  'use strict'

  // ----- lets ----- //

  const Halftone = window.BreathingHalftone = window.BreathingHalftone || {}

  // -------------------------- Vector -------------------------- //

  function Vector(x, y) {
    this.set(x || 0, y || 0)
  }

  Vector.prototype.set = function (x, y) {
    this.x = x
    this.y = y
  }

  Vector.prototype.add = function (v) {
    this.x += v.x
    this.y += v.y
  }

  Vector.prototype.subtract = function (v) {
    this.x -= v.x
    this.y -= v.y
  }

  Vector.prototype.scale = function (s) {
    this.x *= s
    this.y *= s
  }

  Vector.prototype.multiply = function (v) {
    this.x *= v.x
    this.y *= v.y
  }

  // custom getter whaaaaaaat
  Object.defineProperty(Vector.prototype, 'magnitude', {
    get() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    },
  })

  // ----- class functions ----- //

  Vector.subtract = function (a, b) {
    return new Vector(a.x - b.x, a.y - b.y)
  }

  Vector.add = function (a, b) {
    return new Vector(a.x + b.x, a.y + b.y)
  }

  Vector.copy = function (v) {
    return new Vector(v.x, v.y)
  }

  Halftone.Vector = Vector
})(window);

(function (window) {
  'use strict'

  // ----- lets ----- //

  const TAU = Math.PI * 2

  function getNow() {
    return new Date()
  }

  // --------------------------  -------------------------- //

  const Halftone = window.BreathingHalftone || {}
  const Vector = Halftone.Vector

  // -------------------------- Particle -------------------------- //

  function Particle(properties) {
    this.channel = properties.channel
    this.origin = properties.origin
    this.parent = properties.parent
    this.friction = properties.friction

    this.position = Vector.copy(this.origin)
    this.velocity = new Vector()
    this.acceleration = new Vector()

    this.naturalSize = properties.naturalSize
    this.size = 0
    this.sizeVelocity = 0
    this.oscSize = 0
    this.initSize = 0
    this.initSizeVelocity = (Math.random() * 0.5 + 0.5)
    * this.parent.options.initVelocity

    this.oscillationOffset = Math.random() * TAU
    this.oscillationMagnitude = Math.random()
    this.isVisible = false
  }

  Particle.prototype.applyForce = function (force) {
    this.acceleration.add(force)
  }

  Particle.prototype.update = function () {
  // stagger starting
    if (!this.isVisible && Math.random() > 0.03)
      return

    this.isVisible = true

    this.applyOriginAttraction()

    // velocity
    this.velocity.add(this.acceleration)
    this.velocity.scale(1 - this.friction)
    // position
    this.position.add(this.velocity)
    // reset acceleration
    this.acceleration.set(0, 0)

    this.calculateSize()
  }

  Particle.prototype.render = function (ctx) {
    let size = this.size * this.oscSize
    // apply initSize with easing
    const initSize = Math.cos(this.initSize * TAU / 2) * -0.5 + 0.5
    size *= initSize
    size = Math.max(0, size)
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, size, 0, TAU)
    ctx.fill()
    ctx.closePath()
  }

  Particle.prototype.calculateSize = function () {
    if (this.initSize !== 1) {
      this.initSize += this.initSizeVelocity
      this.initSize = Math.min(1, this.initSize)
    }

    const targetSize = this.naturalSize * this.getChannelValue()

    // use accel/velocity to smooth changes in size
    const sizeAcceleration = (targetSize - this.size) * 0.1
    this.sizeVelocity += sizeAcceleration
    // friction
    this.sizeVelocity *= (1 - 0.3)
    this.size += this.sizeVelocity

    // oscillation size
    const now = getNow()
    const opts = this.parent.options
    let oscSize = (now / (1000 * opts.oscPeriod)) * TAU
    oscSize = Math.cos(oscSize + this.oscillationOffset)
    oscSize = oscSize * opts.oscAmplitude + 1
    this.oscSize = oscSize
  }

  Particle.prototype.getChannelValue = function () {
    let channelValue
    // return origin channel value if not lens
    const position = this.parent.options.isChannelLens ? this.position : this.origin
    if (this.parent.options.isChannelLens) {
      channelValue = this.parent.getPixelChannelValue(position.x, position.y, this.channel)
    }
    else {
      if (!this.originChannelValue)
        this.originChannelValue = this.parent.getPixelChannelValue(position.x, position.y, this.channel)

      channelValue = this.originChannelValue
    }

    return channelValue
  }

  Particle.prototype.applyOriginAttraction = function () {
    const attraction = Vector.subtract(this.position, this.origin)
    attraction.scale(-0.02)
    this.applyForce(attraction)
  }

  Halftone.Particle = Particle
})(window);

(function (window) {
  'use strict'

  // ----- lets ----- //

  const TAU = Math.PI * 2
  const ROOT_2 = Math.sqrt(2)

  // ----- helpers ----- //

  const objToString = Object.prototype.toString
  const isArray = Array.isArray || function (obj) {
    return objToString.call(obj) === '[object Array]'
  }

  // extend objects
  function extend(a, b, isDeep) {
    for (const prop in b) {
      const value = b[prop]
      if (isDeep && typeof value === 'object' && !isArray(value)) {
      // deep extend
        a[prop] = extend(a[prop] || {}, value, true)
      }
      else {
        a[prop] = value
      }
    }
    return a
  }

  function insertAfter(elem, afterElem) {
    const parent = afterElem.parentNode
    const nextElem = afterElem.nextElementSibling
    if (nextElem)
      parent.insertBefore(elem, nextElem)
    else
      parent.appendChild(elem)
  }

  // -------------------------- supports -------------------------- //

  const supports = {};

  (function () {
  // check canvas support
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext && canvas.getContext('2d')
    supports.canvas = !!ctx
    if (!supports.canvas)
      return

    // check darker composite support
    canvas.width = 1
    canvas.height = 1
    ctx.globalCompositeOperation = 'darker'
    ctx.fillStyle = '#F00'
    ctx.fillRect(0, 0, 1, 1)
    ctx.fillStyle = '#999'
    ctx.fillRect(0, 0, 1, 1)
    const imgData = ctx.getImageData(0, 0, 1, 1).data
    supports.darker = imgData[0] === 153 && imgData[1] === 0
  })()

  // -------------------------- requestAnimationFrame -------------------------- //

  // https://gist.github.com/1866474

  let lastTime = 0
  const prefixes = 'webkit moz ms o'.split(' ')
  // get unprefixed rAF and cAF, if present
  let requestAnimationFrame = window.requestAnimationFrame
  let cancelAnimationFrame = window.cancelAnimationFrame
  // loop through vendor prefixes and get prefixed rAF and cAF
  let prefix
  for (let i = 0; i < prefixes.length; i++) {
    if (requestAnimationFrame && cancelAnimationFrame)
      break

    prefix = prefixes[i]
    requestAnimationFrame = requestAnimationFrame || window[`${prefix}RequestAnimationFrame`]
    cancelAnimationFrame = cancelAnimationFrame || window[`${prefix}CancelAnimationFrame`]
                            || window[`${prefix}CancelRequestAnimationFrame`]
  }

  // fallback to setTimeout and clearTimeout if either request/cancel is not supported
  if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function (callback) {
      const currTime = new Date().getTime()
      const timeToCall = Math.max(0, 16 - (currTime - lastTime))
      const id = setTimeout(() => {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }

    cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }

  // --------------------------  -------------------------- //

  const _Halftone = window.BreathingHalftone || {}
  const Vector = _Halftone.Vector
  const Particle = _Halftone.Particle

  // -------------------------- BreathingHalftone -------------------------- //

  function Halftone(img, options) {
  // set options
    this.options = extend({}, this.constructor.defaults, true)
    extend(this.options, options, true)

    this.img = img
    // bail if canvas is not supported
    if (!supports.canvas)
      return

    this.create()
  }

  Halftone.defaults = {
  // dot size
    dotSize: 1 / 40,
    dotSizeThreshold: 0.05,
    initVelocity: 0.02,
    oscPeriod: 3,
    oscAmplitude: 0.2,
    // layout and color
    isAdditive: false,
    isRadial: false,
    channels: ['red', 'green', 'blue'],
    isChannelLens: true,
    // behavoir
    friction: 0.06,
    hoverDiameter: 0.3,
    hoverForce: -0.02,
    activeDiameter: 0.6,
    activeForce: 0.01,
  }

  function makeCanvasAndCtx() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    return {
      canvas,
      ctx,
    }
  }

  Halftone.prototype.create = function () {
    this.isActive = true

    // create main canvas
    const canvasAndCtx = makeCanvasAndCtx()
    this.canvas = canvasAndCtx.canvas
    this.ctx = canvasAndCtx.ctx
    // copy over class
    this.canvas.className = this.img.className
    insertAfter(this.canvas, this.img)
    // hide img visually
    this.img.style.visibility = 'hidden'

    // fall back to lum channel if subtractive and darker isn't supported
    this.channels = !this.options.isAdditive && !supports.darker
      ? ['lum']
      : this.options.channels

    // create separate canvases for each color
    this.proxyCanvases = {}
    for (let i = 0, len = this.channels.length; i < len; i++) {
      const channel = this.channels[i]
      this.proxyCanvases[channel] = makeCanvasAndCtx()
    }

    this.loadImage()

    // properties
    this.canvasPosition = new Vector()
    this.getCanvasPosition()
    // hash of mouse / touch events
    this.cursors = {}
    // position -100,000, -100,000 so its not on screen
    this.addCursor('mouse', { pageX: -1e5, pageY: -1e5 })

    this.bindEvents()
  }

  Halftone.prototype.getCanvasPosition = function () {
    const rect = this.canvas.getBoundingClientRect()
    const x = rect.left + window.pageXOffset
    const y = rect.top + window.pageYOffset
    this.canvasPosition.set(x, y)
    this.canvasScale = this.width ? this.width / this.canvas.offsetWidth : 1
  }

  // -------------------------- img -------------------------- //

  Halftone.prototype.loadImage = function () {
  // hack img load
    const src = this.img.getAttribute('data-src') || this.img.src
    const loadingImg = new Image()
    loadingImg.onload = function () {
      this.onImgLoad()
    }.bind(this)
    loadingImg.src = src
    // set src on image, so we can get correct sizes
    if (this.img.src !== src)
      this.img.src = src
  }

  Halftone.prototype.onImgLoad = function () {
    this.getImgData()
    this.resizeCanvas()
    this.getCanvasPosition()
    // hide image completely
    this.img.style.display = 'none'
    this.getCanvasPosition()
    this.initParticles()
    this.animate()
  }

  Halftone.prototype.getImgData = function () {
  // get imgData
    const canvasAndCtx = makeCanvasAndCtx()
    const imgCanvas = canvasAndCtx.canvas
    const ctx = canvasAndCtx.ctx
    this.imgWidth = imgCanvas.width = this.img.naturalWidth
    this.imgHeight = imgCanvas.height = this.img.naturalHeight
    ctx.drawImage(this.img, 0, 0)
    this.imgData = ctx.getImageData(0, 0, this.imgWidth, this.imgHeight).data
  }

  Halftone.prototype.resizeCanvas = function () {
  // width & height
    const w = this.width = this.img.offsetWidth
    const h = this.height = this.img.offsetHeight
    // size properties
    this.diagonal = Math.sqrt(w * w + h * h)
    this.imgScale = this.width / this.imgWidth
    this.gridSize = this.options.dotSize * this.diagonal

    // set proxy canvases size
    for (const prop in this.proxyCanvases) {
      const proxy = this.proxyCanvases[prop]
      proxy.canvas.width = w
      proxy.canvas.height = h
    }
    this.canvas.width = w
    this.canvas.height = h
  }

  Halftone.prototype.initParticles = function () {
    const getParticlesMethod = this.options.isRadial
      ? 'getRadialGridParticles'
      : 'getCartesianGridParticles'

    // all particles
    this.particles = []
    // separate array of particles for each color
    this.channelParticles = {}

    const angles = { red: 1, green: 2.5, blue: 5, lum: 4 }

    for (let i = 0, len = this.channels.length; i < len; i++) {
      const channel = this.channels[i]
      const angle = angles[channel]
      const particles = this[getParticlesMethod](channel, angle)
      // associate with channel
      this.channelParticles[channel] = particles
      // add to all collection
      this.particles = this.particles.concat(particles)
    }
  }

  Halftone.prototype.animate = function () {
  // do not animate if not active
    if (!this.isActive)
      return

    this.update()
    this.render()
    requestAnimationFrame(this.animate.bind(this))
  }

  Halftone.prototype.update = function () {
  // displace particles with cursors (mouse, touches)

    for (let i = 0, len = this.particles.length; i < len; i++) {
      const particle = this.particles[i]
      // apply forces for each cursor
      for (const identifier in this.cursors) {
        const cursor = this.cursors[identifier]
        const cursorState = cursor.isDown ? 'active' : 'hover'
        const forceScale = this.options[`${cursorState}Force`]
        const diameter = this.options[`${cursorState}Diameter`]
        const radius = diameter / 2 * this.diagonal
        const force = Vector.subtract(particle.position, cursor.position)
        let distanceScale = Math.max(0, radius - force.magnitude) / radius
        // easeInOutSine
        distanceScale = Math.cos(distanceScale * Math.PI) * -0.5 + 0.5
        force.scale(distanceScale * forceScale)
        particle.applyForce(force)
      }

      particle.update()
    }
  }

  Halftone.prototype.render = function () {
  // clear
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.fillStyle = this.options.isAdditive ? 'black' : 'white'
    this.ctx.fillRect(0, 0, this.width, this.height)

    // composite grids
    this.ctx.globalCompositeOperation = this.options.isAdditive ? 'lighter' : 'darker'

    // render channels
    for (let i = 0, len = this.channels.length; i < len; i++) {
      const channel = this.channels[i]
      this.renderGrid(channel)
    }
  }

  const channelFillStyles = {
    additive: {
      red: '#FF0000',
      green: '#00FF00',
      blue: '#0000FF',
      lum: '#FFF',
    },
    subtractive: {
      red: '#00FFFF',
      green: '#FF00FF',
      blue: '#FFFF00',
      lum: '#000',
    },
  }

  Halftone.prototype.renderGrid = function (channel) {
    const proxy = this.proxyCanvases[channel]
    // clear
    proxy.ctx.fillStyle = this.options.isAdditive ? 'black' : 'white'
    proxy.ctx.fillRect(0, 0, this.width, this.height)

    // set fill color
    const blend = this.options.isAdditive ? 'additive' : 'subtractive'
    proxy.ctx.fillStyle = channelFillStyles[blend][channel]

    // render particles
    const particles = this.channelParticles[channel]
    for (let i = 0, len = particles.length; i < len; i++) {
      const particle = particles[i]
      particle.render(proxy.ctx)
    }

    // draw proxy canvas to actual canvas as whole layer
    this.ctx.drawImage(proxy.canvas, 0, 0)
  }

  Halftone.prototype.getCartesianGridParticles = function (channel, angle) {
    const particles = []

    const w = this.width
    const h = this.height

    const diag = Math.max(w, h) * ROOT_2

    const gridSize = this.gridSize
    const cols = Math.ceil(diag / gridSize)
    const rows = Math.ceil(diag / gridSize)

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let x1 = (col + 0.5) * gridSize
        let y1 = (row + 0.5) * gridSize
        // offset for diagonal
        x1 -= (diag - w) / 2
        y1 -= (diag - h) / 2
        // shift to center
        x1 -= w / 2
        y1 -= h / 2
        // rotate grid
        let x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle)
        let y2 = x1 * Math.sin(angle) + y1 * Math.cos(angle)
        // shift back
        x2 += w / 2
        y2 += h / 2

        const particle = this.initParticle(channel, x2, y2)
        if (particle)
          particles.push(particle)
      }
    }

    return particles
  }

  Halftone.prototype.getRadialGridParticles = function (channel, angle) {
    const particles = []

    const w = this.width
    const h = this.height
    const diag = Math.max(w, h) * ROOT_2

    const gridSize = this.gridSize

    const halfW = w / 2
    const halfH = h / 2
    const offset = gridSize
    const centerX = halfW + Math.cos(angle) * offset
    const centerY = halfH + Math.sin(angle) * offset

    const maxLevel = Math.ceil((diag + offset) / gridSize)

    for (let level = 0; level < maxLevel; level++) {
      const max = level * 6 || 1
      for (let j = 0; j < max; j++) {
        const theta = TAU * j / max + angle
        const x = centerX + Math.cos(theta) * level * gridSize
        const y = centerY + Math.sin(theta) * level * gridSize
        const particle = this.initParticle(channel, x, y)
        if (particle)
          particles.push(particle)
      }
    }

    return particles
  }

  Halftone.prototype.initParticle = function (channel, x, y) {
  // don't render if coords are outside image
  // don't display if under threshold
    const pixelChannelValue = this.getPixelChannelValue(x, y, channel)
    if (pixelChannelValue < this.options.dotSizeThreshold)
      return

    return new Particle({
      channel,
      parent: this,
      origin: new Vector(x, y),
      naturalSize: this.gridSize * ROOT_2 / 2,
      friction: this.options.friction,
    })
  }

  const channelOffset = {
    red: 0,
    green: 1,
    blue: 2,
  }

  Halftone.prototype.getPixelChannelValue = function (x, y, channel) {
    x = Math.round(x / this.imgScale)
    y = Math.round(y / this.imgScale)
    const w = this.imgWidth
    const h = this.imgHeight

    // return 0 if position is outside of image
    if (x < 0 || x > w || y < 0 || y > h)
      return 0

    const pixelIndex = (x + y * w) * 4
    let value
    // return 1;
    if (channel === 'lum') {
      value = this.getPixelLum(pixelIndex)
    }
    else {
    // rgb
      const index = pixelIndex + channelOffset[channel]
      value = this.imgData[index] / 255
    }

    value = value || 0
    if (!this.options.isAdditive)
      value = 1 - value

    return value
  }

  Halftone.prototype.getPixelLum = function (pixelIndex) {
  // thx @jfsiii
  // https://github.com/jfsiii/chromath/blob/master/src/chromath.js
    const r = this.imgData[pixelIndex + 0] / 255
    const g = this.imgData[pixelIndex + 1] / 255
    const b = this.imgData[pixelIndex + 2] / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    return (max + min) / 2
  }

  // ----- bindEvents ----- //

  Halftone.prototype.bindEvents = function () {
    this.canvas.addEventListener('mousedown', this, false)
    this.canvas.addEventListener('touchstart', this, false)
    window.addEventListener('mousemove', this, false)
    window.addEventListener('touchmove', this, false)
    window.addEventListener('touchend', this, false)
    window.addEventListener('resize', this, false)
  }

  Halftone.prototype.unbindEvents = function () {
    this.canvas.removeEventListener('mousedown', this, false)
    this.canvas.removeEventListener('touchstart', this, false)
    window.removeEventListener('mousemove', this, false)
    window.removeEventListener('touchmove', this, false)
    window.removeEventListener('touchend', this, false)
    window.removeEventListener('resize', this, false)
  }

  Halftone.prototype.handleEvent = function (event) {
    const method = `on${event.type}`
    if (this[method])
      this[method](event)
  }

  Halftone.prototype.onmousedown = function (event) {
    event.preventDefault()
    this.cursors.mouse.isDown = true
    window.addEventListener('mouseup', this, false)
  }

  Halftone.prototype.ontouchstart = function (event) {
    event.preventDefault()
    for (let i = 0, len = event.changedTouches.length; i < len; i++) {
      const touch = event.changedTouches[i]
      const cursor = this.addCursor(touch.identifier, touch)
      cursor.isDown = true
    }
  }

  /**
 * @param {MouseEvent or Touch} cursorEvent - with pageX and pageY
 */
  Halftone.prototype.addCursor = function (identifier, cursorEvent) {
    const position = this.setCursorPosition(cursorEvent)
    const cursor = this.cursors[identifier] = {
      position,
      isDown: false,
    }
    return cursor
  }

  /**
 * @param {MouseEvent or Touch} cursorEvent - with pageX and pageY
 * @param {Vector} position - optional
 */
  Halftone.prototype.setCursorPosition = function (cursorEvent, position) {
    position = position || new Vector()
    position.set(cursorEvent.pageX, cursorEvent.pageY)
    position.subtract(this.canvasPosition)
    position.scale(this.canvasScale)
    return position
  }

  Halftone.prototype.onmousemove = function (event) {
    this.setCursorPosition(event, this.cursors.mouse.position)
  }

  Halftone.prototype.ontouchmove = function (event) {
  // move matching cursors
    for (let i = 0, len = event.changedTouches.length; i < len; i++) {
      const touch = event.changedTouches[i]
      const cursor = this.cursors[touch.identifier]
      if (cursor)
        this.setCursorPosition(touch, cursor.position)
    }
  }

  Halftone.prototype.onmouseup = function () {
    this.cursors.mouse.isDown = false
    window.removeEventListener('mouseup', this, false)
  }

  Halftone.prototype.ontouchend = function (event) {
  // remove matching cursors
    for (let i = 0, len = event.changedTouches.length; i < len; i++) {
      const touch = event.changedTouches[i]
      const cursor = this.cursors[touch.identifier]
      if (cursor)
        delete this.cursors[touch.identifier]
    }
  }

  function debounceProto(_class, methodName, threshold) {
  // original method
    const method = _class.prototype[methodName]
    const timeoutName = `${methodName}Timeout`

    _class.prototype[methodName] = function () {
      const timeout = this[timeoutName]
      if (timeout)
        clearTimeout(timeout)

      const args = arguments

      this[timeoutName] = setTimeout(() => {
        method.apply(this, args)
        delete this[timeoutName]
      }, threshold || 100)
    }
  }

  Halftone.prototype.onresize = function () {
    this.getCanvasPosition()
  }

  debounceProto(Halftone, 'onresize', 200)

  // ----- destroy ----- //

  Halftone.prototype.destroy = function () {
    this.isActive = false
    this.unbindEvents()

    this.img.style.visibility = ''
    this.img.style.display = ''
    this.canvas.parentNode.removeChild(this.canvas)
  }

  // --------------------------  -------------------------- //

  Halftone.Vector = Vector
  Halftone.Particle = Particle
  window.BreathingHalftone = Halftone
})(window)
