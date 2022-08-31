import axios from '@/utils/axios'

export const getList = (url: string) => {
  return axios.get(url)
}
