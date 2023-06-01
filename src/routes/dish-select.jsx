import { Tab, Tabs, TextField } from "@mui/material";
import "../styles/dish-select.scss";
import { useEffect, useState } from "react";
import { getDishes } from "../api";

export default function DishSelect() {
  const [tabValue, setTabValue] = useState(0);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    if (tabValue === 0) {
      getDishes().then((response) => {
        console.log("data: ", response.data);
        setDishes(response.data);
      });
    }
  }, [tabValue]);

  const handleTabValueChange = (_event, newValue) => {
    setTabValue(newValue);
  };

  const SearchBox = () => {
    return (
      <div className="search-box-wrapper">
        <TextField placeholder="输入菜品名称首字母搜索" fullWidth></TextField>
      </div>
    );
  };

  const TabPanel = ({ children, value, index }) => {
    return <div hidden={value !== index}>{children}</div>;
  };

  const DishCard = ({dish}) => {
    return <div>
      <img src={dish.image} />
      <div>{dish.name}</div>
    </div>;
  };

  return (
    <div className="dish-select-wrapper">
      <SearchBox />
      <Tabs value={tabValue} onChange={handleTabValueChange}>
        <Tab label="预制菜品" />
        <Tab label="收藏菜品" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <div className="dish-card-wrapper">
          {dishes.map((dish) => (
            <DishCard dish={dish} key={dish.id} />
          ))}
        </div>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        item 2
      </TabPanel>
    </div>
  );
}
