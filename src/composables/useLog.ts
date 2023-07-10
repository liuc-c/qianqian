import { useToggle } from '@vueuse/core'
import logsJson from '@/utils/log.json'

export const [showLogs, toggleLog] = useToggle(false)

export const logList = ref(logsJson)
