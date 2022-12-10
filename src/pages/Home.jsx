import React, {useEffect, useState} from 'react';
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import axios from "axios";

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData(){
            const itemsResp = await axios.get("https://6391cf2db750c8d178ce0c12.mockapi.io/items")
            setItems(itemsResp.data)
            setIsLoading(false)
        }
        fetchData()
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
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