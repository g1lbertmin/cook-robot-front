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

import { Edit, Favorite, PlayArrow } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import useStore from '@/use-store'

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

  const navigate = useNavigate()

  const [setEditingDish] = useStore((state) => [state.setEditingDish])

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

    if (newValue === 0) {
      getDishesCount('').then((res) => {
        setPageCount(res.data)
      })

      setPage(1)

      getDishes(1, 10, '').then((res) => {
        setDishes(res.data)
      })
    } else if (newValue === 1) {
      getStarredDishesCount('').then((res) => {
        setPageCount(res.data)
      })

      setPage(1)

      getStarredDishes(1, 10, '').then((res) => {
        setStarredDishes(res.data)
      })
    }
  }

  const handlePageChange = (_event, newValue) => {
    setPage(newValue)

    if (tabValue === 0) {
      getDishes(newValue, 10, '').then((res) => {
        setDishes(res.data)
      })
    } else if (tabValue === 1) {
      getStarredDishes(newValue, 10, '').then((res) => {
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
    console.log('dish: ', dish)
    setEditingDish(dish)
    navigate('/dish-edit')
  }

  // ===== wigets =====

  const SearchBox = () => {
    return (
      <div className="search-box-wrapper">
        <TextField placeholder="输入菜品名称首字母搜索" fullWidth></TextField>
      </div>
    )
  }

  const TabPanel = ({ children, value, index }) => {
    return (
      <div className="tab-panel" hidden={value !== index}>
        {children}
      </div>
    )
  }

  const DishCard = ({ dish }) => {
    const handleClickCard = () => {
      getDish(dish.id).then((res) => {
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

  return (
    <div className="dish-select-wrapper">
      <SearchBox />
      <Tabs value={tabValue} onChange={handleTabValueChange} className="tabs">
        <Tab label={`预制菜品（${dishCount}）`} className="tab" />
        <Tab label={`收藏菜品（${starredDishCount}）`} className="tab" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <div className="dish-card-wrapper">
          {dishes.map((dish) => (
            <DishCard dish={dish} key={dish.id} />
          ))}
        </div>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <div className="dish-card-wrapper">
          {starredDishes.map((dish) => (
            <DishCard dish={dish} key={dish.id} />
          ))}
        </div>
      </TabPanel>
      <Pagination
        count={Math.ceil(pageCount / 10)}
        page={page}
        onChange={handlePageChange}
        className="pagination"
      ></Pagination>
      {dish && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box className="modal-box">
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
              <IconButton>
                <Favorite className="favorite-icon" />
              </IconButton>
              <IconButton>
                <PlayArrow className="play-arrow-icon" />
              </IconButton>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  )
}
