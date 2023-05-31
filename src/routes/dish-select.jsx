import { Button } from '@mui/material';
import '../styles/dish-select.scss'

export default function DishSelect() {
    return (
      <>
        <div className="dish-select-wrapper">
         <Button>运行控制</Button>
         <Button>菜品选择</Button>
         <Button>菜品制作</Button>
         <Button>全量控制</Button>
         <Button>系统设置</Button>

        </div>
      </>
    );
  }