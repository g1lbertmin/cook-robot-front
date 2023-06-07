import { api } from '@/api'

export function getIngredients() {
  return api({
    url: '/ingredients',
    method: 'get',
  })
}

export function getShapes() {
  return api({
    url: '/shapes',
    method: 'get',
  })
}
