function ScreenComponent() {
    this.inputs = {
      visible: true,
    }

    this.onInit = function() {
      const THREE = this.context.three
      this.camera = this.context.camera
      this.internalScene = new THREE.Scene()

      this.internalRenderer = new THREE.CSS3DRenderer()
      this.internalRenderer.domElement.style.position = 'fixed'
      this.internalRenderer.domElement.style.top = 0
      this.internalRenderer.domElement.style.left = 0
      this.internalRenderer.domElement.style.opacity = 0.3
      this.internalRenderer.domElement.style.background = 'red'
      this.internalRenderer.domElement.style.overflow = 'none'
      
      this.domElement = document.body.appendChild(this.internalRenderer.domElement)

      const iframe = document.createElement('iframe')
      iframe.src = '/website/genially.html'
      iframe.style.width = '500px'
      iframe.style.height = '400px'
      iframe.style.border = 'none'
      iframe.style.overflow = 'none'

			const object = new THREE.CSS3DObject(iframe)
			object.position.set(1, 1.25, 21.2)
      object.rotation.y = -0.1
      object.scale.x *= -1
      object.scale.multiplyScalar(0.004)
      this.internalScene.add(object)

      const dispatchToCanvas = e => { 
        const eventCopy = new e.constructor(e.type, e)
        this.context.renderer.domElement.dispatchEvent(eventCopy) 
      }

      this.domElement.addEventListener('pointerdown', dispatchToCanvas)
      this.domElement.addEventListener('pointermove', dispatchToCanvas)
      this.domElement.addEventListener('pointerup', dispatchToCanvas)

      this.onResize()
      window.addEventListener('resize', this.onResize.bind(this))
    }

    this.onEvent = function(type, data) {
    }

    this.onInputsUpdated = function(previous) {
    }

    this.onTick = function(tickDelta) {
      this.internalRenderer.render(this.internalScene, this.camera)
    }

    this.onDestroy = function() {
      document.removeChild(this.domElement)
    }

    this.onResize = function() {
      this.internalRenderer.setSize(window.innerWidth, window.innerHeight)
    }
}

export function ScreenComponentFactory() {
    return new ScreenComponent()
}