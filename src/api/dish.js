import { api } from '@/api'

export function getDishes(page_index, page_size, initials) {
  return api({
    url: '/dishes/' + initials,
    method: 'get',
    params: {
      page_index,
      page_size,
    },
  })
}

export function getDishesCount(initials) {
  return api({
    url: '/dishes-count/' + initials,
    method: 'get',
  })
}

export function getStarredDishes(page_index, page_size, initials) {
  return api({
    url: '/starred-dishes/' + initials,
    method: 'get',
    params: {
      page_index,
      page_size,
    },
  })
}

export function getStarredDishesCount(initials) {
  return api({
    url: '/starred-dishes-count/' + initials,
    method: 'get',
  })
}

export function getDish(id) {
  return api({
    url: '/dish/' + id,
    method: 'get',
  })
}

export function updateDish(dish) {
  return api({
    url: '/dish/' + dish.id,
    method: 'put',
    data: { dish: dish },
  })
}

export function createDish(dish) {
  return api({
    url: '/dish/',
    method: 'post',
    data: { dish: dish },
  })
}

export function getSeasonings() {
  return api({
    url: "/seasonings",
    method: "get"
  });
}