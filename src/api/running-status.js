import { api } from '@/api'

export function getRunningStatus() {
  return api({
    url: '/running-status',
    method: 'get',
  })
}
