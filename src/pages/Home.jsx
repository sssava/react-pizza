import React, {useEffect, useState} from 'react';
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import axios from "axios";

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState(0)
    const [activeSort, setActiveSort] = useState({name: "популярности", sort: "rating"})

    useEffect(() => {
        async function fetchData(){
            const sortBy = activeSort.sort.replace('-', '')
            const order = activeSort.sort.includes('-') ? "asc" : "desc"
            setIsLoading(true)
            const itemsResp = await axios.get(`https://6391cf2db750c8d178ce0c12.mockapi.io/items?${
                activeCategory > 0 ? `category=${activeCategory}` : ''
                }&sortBy=${sortBy}&order=${order}`
            )
            setItems(itemsResp.data)
            setIsLoading(false)
        }
        fetchData()
        window.scrollTo(0, 0)
    }, [activeCategory, activeSort])

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={activeCategory} onClickCategory={(id) => setActiveCategory(id)}/>
                <Sort activeSort={activeSort} onClickSort={(id) => setActiveSort(id)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((item, index) => <Skeleton key={index} />)
                        : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
                }
            </div>
        </div>
    );
};

export default Home;