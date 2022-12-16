import React, {useContext, useEffect, useState} from 'react';
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";
import {setCategoryId} from "../redux/slices/filterSlice";

import axios from "axios";
import {SearchContext} from "../App";

import {useSelector, useDispatch} from "react-redux";

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)


    const {categoryId, sort} = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const {searchValue} = useContext(SearchContext)

    useEffect(() => {
        async function fetchData(){
            const sortBy = sort.sortProperty.replace('-', '')
            const order = sort.sortProperty.includes('-') ? "asc" : "desc"
            setIsLoading(true)
            const itemsResp = await axios.get(`https://6391cf2db750c8d178ce0c12.mockapi.io/items?page=${currentPage}&limit=4&${
                categoryId > 0 ? `category=${categoryId}` : ''
                }&sortBy=${sortBy}&order=${order}`
            )
            setItems(itemsResp.data)
            setIsLoading(false)
        }
        fetchData()
        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, currentPage])

    const pizzas = items.filter(obj => {
        return obj.name.toLowerCase().includes(searchValue.toLowerCase())
    }).map(obj => <PizzaBlock key={obj.id} {...obj} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={categoryId} onClickCategory={onClickCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((item, index) => <Skeleton key={index} />)
                        : pizzas
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    );
};

export default Home;