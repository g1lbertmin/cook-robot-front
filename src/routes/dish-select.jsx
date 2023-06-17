import {
  Box,
  Card,
  Divider,
  Modal,
  Pagination,
  Tab,
  Tabs,
  TextField,
  IconButton,
} from '@mui/material'
import '@/styles/dish-select.scss'
import { useEffect, useState } from 'react'
import {
  getDishes,
  getDishesCount,
  getStarredDishes,
  getStarredDishesCount,
  getDish,
} from '@/api/dish'

import { Edit, Favorite, PlayArrow, RamenDining } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import appStore from '@/stores/app-store'
import machineStore from '@/stores/machine-store'
import { cloneDeep, debounce } from 'lodash'
import { updateDish } from '../api/dish'
import { produce } from 'immer'

export default function DishSelect() {
  const [tabValue, setTabValue] = useState(0)
  const [dishes, setDishes] = useState([])
  const [starredDishes, setStarredDishes] = useState([])

  const [page, setPage] = useState(1)
  const [dishCount, setDishCount] = useState(0)
  const [starredDishCount, setStarredDishCount] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  const [open, setOpen] = useState(false)
  const [dish, setDish] = useState(null)

  const [searchedDishInitials, setSearchedDishInitials] = useState('')

  const navigate = useNavigate()

  const [setEditingDish, setSelectedDish, setSnackbarInfo] = appStore(
    (state) => [
      state.setEditingDish,
      state.setSelectedDish,
      state.setSnackbarInfo,
    ]
  )

  const [machineSetDish, isMachineRunning] = machineStore((state) => [
    state.setDish,
    state.isMachineRunning,
  ])

  useEffect(() => {
    getDishesCount('').then((res) => {
      setPageCount(res.data)
      setDishCount(res.data)
    })

    setPage(1)
    getDishes(1, 10, '').then((res) => {
      setDishes(res.data)
    })

    getStarredDishesCount('').then((res) => {
      setStarredDishCount(res.data)
    })
  }, [])

  const handleTabValueChange = (_event, newValue) => {
    setTabValue(newValue)
    setPage(1)

    if (newValue === 0) {
      getDishesCount(searchedDishInitials).then((res) => {
        setPageCount(res.data)
      })

      getDishes(1, 10, searchedDishInitials).then((res) => {
        setDishes(res.data)
      })
    } else if (newValue === 1) {
      getStarredDishesCount(searchedDishInitials).then((res) => {
        setPageCount(res.data)
      })

      getStarredDishes(1, 10, searchedDishInitials).then((res) => {
        setStarredDishes(res.data)
      })
    }
  }

  const handlePageChange = (_event, newValue) => {
    setPage(newValue)

    if (tabValue === 0) {
      getDishes(newValue, 10, searchedDishInitials).then((res) => {
        setDishes(res.data)
      })
    } else if (tabValue === 1) {
      getStarredDishes(newValue, 10, searchedDishInitials).then((res) => {
        setStarredDishes(res.data)
      })
    }
  }

  const showRequirementNames = (requirements) => {
    const names = []
    for (let requirement of requirements) {
      if (names.indexOf(requirement.name) > -1) continue
      names.push(requirement.name)
    }
    return names.length === 0 ? '无' : names.join(' ')
  }

  const handleEditDish = () => {
    setEditingDish(dish)
    navigate('/dish-edit')
  }

  const handleInputChange = (event) => {
    const newValue = event.target.value
    setSearchedDishInitials(newValue)
    handleInputChangeDebounce(newValue)
  }

  const handleInputChangeDebounce = debounce((value) => {
    getDishesCount(value).then((res) => {
      setPageCount(res.data)
      setDishCount(res.data)
    })

    getStarredDishesCount(value).then((res) => {
      setStarredDishCount(res.data)
    })

    if (tabValue === 0) {
      getDishes(page, 10, value).then((res) => {
        console.log('here')
        setDishes(res.data)
      })
    } else if (tabValue === 1) {
      getStarredDishes(page, 10, value).then((res) => {
        setStarredDishes(res.data)
      })
    }
  }, 500)

  const getFavorateDishList = () => {
    getStarredDishes(1, 10, searchedDishInitials).then((res) => {
      setStarredDishes(res.data)
    })
    getStarredDishesCount(searchedDishInitials).then((res) => {
      setStarredDishCount(res.data)
    })
  }

  const DishCard = ({ dish }) => {
    const handleClickCard = () => {
      getDish(dish.id).then((res) => {
        console.log(res.data)
        setDish(res.data)
        setOpen(true)
      })
    }

    return (
      <Card className="dish-card" onClick={handleClickCard}>
        <img src={dish.image} />
        <div className="dish-title">{dish.name}</div>
      </Card>
    )
  }

  const handleFavorite = () => {
    const newDish = produce(dish, (draft) => {
      draft.is_starred = !draft.is_starred
    })
    updateDish(newDish).then((res) => {
      console.log(res)
      setDish(newDish)
      getFavorateDishList()
    })
  }

  const routeToRunningControl = () => {
    if (isMachineRunning) {
      setSnackbarInfo('"当前已有菜品正在炒制，请稍后')
      // return
    } else {
      machineSetDish(cloneDeep(dish))
    }

    setSelectedDish(dish)
    navigate('/running')
  }

  return (
    <div className="dish-select-wrapper">
      <div className="search-box-wrapper">
        <TextField
          placeholder="输入菜品名称首字母搜索"
          fullWidth
          value={searchedDishInitials}
          onChange={handleInputChange}
        ></TextField>
      </div>
      <Tabs value={tabValue} onChange={handleTabValueChange} className="tabs">
        <Tab
          label={`预制菜品（${dishCount}）`}
          className="tab"
          icon={<RamenDining fontSize="small" sx={{ mr: '13px' }} />}
        />
        <Tab
          label={`收藏菜品（${starredDishCount}）`}
          className="tab"
          icon={<Favorite fontSize="small" sx={{ mr: '13px' }} />}
        />
      </Tabs>
      {tabValue === 0 && (
        <div className="card-wrapper">
          {dishes.map((dish) => (
            <DishCard dish={dish} key={dish.id} />
          ))}
        </div>
      )}
      {tabValue === 1 && (
        <div className="card-wrapper">
          {starredDishes.map((dish) => (
            <DishCard dish={dish} key={dish.id} />
          ))}
        </div>
      )}
      <Pagination
        count={Math.ceil(pageCount / 10)}
        shape="rounded"
        page={page}
        onChange={handlePageChange}
        className="pagination"
      ></Pagination>
      {dish && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box className="dish-modal-box">
            <img src={dish.image} />
            <div className="dish-detail">
              <div className="line-1">
                <div className="dish-name">{dish.name}</div>
                <div className="cook-time">
                  预计需要{parseInt(dish.cook_time / 60)}分{dish.cook_time % 60}
                  秒
                </div>
              </div>
              <div className="line-2">食材</div>
              <div className="line-3">
                {showRequirementNames(dish.steps.ingredients)}
              </div>
              <div className="line-4">调料</div>
              <div className="line-5">
                {showRequirementNames(dish.steps.seasonings)}
              </div>
            </div>
            <Divider />
            <div className="icon-wrap">
              <IconButton onClick={handleEditDish}>
                <Edit className="edit-icon" />
              </IconButton>
              <IconButton onClick={handleFavorite}>
                <Favorite
                  className="favorite-icon"
                  sx={{ color: dish.is_starred ? 'red' : 'gray' }}
                />
              </IconButton>
              <IconButton onClick={routeToRunningControl}>
                <PlayArrow className="play-arrow-icon" />
              </IconButton>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  )
}
