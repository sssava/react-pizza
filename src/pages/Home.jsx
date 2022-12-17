import React, {useContext, useEffect, useRef, useState} from 'react';
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import { sortNames } from '../components/Sort'

import axios from "axios";
import qs from 'qs'
import {useNavigate} from "react-router-dom";
import {SearchContext} from "../App";

import {useSelector, useDispatch} from "react-redux";

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const isSearch = useRef(false)
    const isMounted = useRef(false)


    const {categoryId, sort, currentPage} = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }


    const {searchValue} = useContext(SearchContext)


    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])


    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortNames.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        if (!isSearch.current) {
            async function fetchData(){
                const sortBy = sort.sortProperty.replace('-', '')
                const order = sort.sortProperty.includes('-') ? "asc" : "desc"
                const search = searchValue ? `&search=${searchValue}` : ''
                setIsLoading(true)
                const itemsResp = await axios.get(`https://6391cf2db750c8d178ce0c12.mockapi.io/items?page=${currentPage}&limit=4&${
                        categoryId > 0 ? `category=${categoryId}` : ''
                    }&sortBy=${sortBy}&order=${order}${search}`
                )
                setItems(itemsResp.data)
                setIsLoading(false)
            }
            fetchData()
            window.scrollTo(0, 0)
        }

        isSearch.current = false
    }, [categoryId, sort.sortProperty, currentPage, searchValue])



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
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;