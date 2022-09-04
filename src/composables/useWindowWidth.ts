import * as _ from 'lodash'
import type { Ref } from 'vue'
const windowWidth = ref<number>(500)
export const useWindowWidth = (): Ref<number> => {
  windowWidth.value = window.innerWidth
  function update() { windowWidth.value = window.innerWidth }
  const debounceUpdate = _.debounce(update, 500)
  onMounted(() => { window.addEventListener('resize', debounceUpdate) })
  onUnmounted(() => { window.removeEventListener('resize', debounceUpdate) })
  return windowWidth
}

