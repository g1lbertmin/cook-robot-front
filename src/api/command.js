import { api } from '@/api'

export function postCommand(command) {
  return api({
    url: '/command',
    method: 'post',
    data: {
      command,
    },
  })
}
