import { gsap } from 'gsap'
import type { Ref } from 'vue'
import { useTopic } from '@/composables/useTopic'

interface elementNode {
  x: number
  y: number
  node: HTMLElement
}

export const useTopicAnimeOfArr = (refs: Ref<HTMLElement[]>, watchValue: Ref) => {
  if (useTopic().topic.value.length < 300) {
    const boxes: elementNode[] = []
    onMounted(() => {
      for (let i = 0; i < refs.value.length; i++) {
        const node = refs.value[i]
        // // Initialize transforms on node
        gsap.set(node, { x: 0 })
        boxes[i] = {
          x: node.offsetLeft,
          y: node.offsetTop,
          node,
        }
      }
    })

    function layout() {
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i]
        const lastX = box.x
        const lastY = box.y
        box.x = box.node.offsetLeft
        box.y = box.node.offsetTop
        // Continue if box hasn't moved
        if (lastX === box.x && lastY === box.y)
          continue
        // Reversed delta values taking into account current transforms
        const x = lastX - box.x
        const y = lastY - box.y
        gsap.fromTo(box.node, { x, y }, { x: 0, y: 0, ease: 'ease' })
      }
    }

    watch(watchValue, async () => {
      await nextTick()
      layout()
    })
  }
}

