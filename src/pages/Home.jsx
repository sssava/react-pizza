import React, {useEffect, useRef} from 'react';
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import { sortNames } from '../components/Sort'


import qs from 'qs'
import {Link, useNavigate} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";
import {fetchPizzas, selectPizzaData} from '../redux/slices/pizzasSlice'

const Home = () => {
    const isSearch = useRef(false)
    const isMounted = useRef(false)


    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }


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
                const category = categoryId > 0 ? `category=${categoryId}` : ''
                const order = sort.sortProperty.includes('-') ? "asc" : "desc"
                const search = searchValue ? `&search=${searchValue}` : ''
                dispatch(fetchPizzas({
                    sortBy,
                    category,
                    order,
                    search,
                    currentPage,
                }))
            }
            fetchData()
            window.scrollTo(0, 0)
        }

        isSearch.current = false
    }, [categoryId, sort.sortProperty, currentPage, searchValue])



    const pizzas = items.filter(obj => {
        return obj.name.toLowerCase().includes(searchValue.toLowerCase())
    }).map(obj => <Link key={obj.id} to={`pizza/${obj.id}`} ><PizzaBlock {...obj} /></Link>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={categoryId} onClickCategory={onClickCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">?????? ??????????</h2>
            {
                status === "error" ? (
                    <div className="content__error-info">
                        <h2>?????????????????? ????????????</h2>
                        <p>?? ?????????????????? ???? ?????????????? ???????????????? ??????????. ???????????????????? ?????????????????? ?????????????? ??????????</p>
                    </div>
                ) : (
                    <div className="content__items">
                        {
                            status === 'loading'
                                ? [...new Array(6)].map((item, index) => <Skeleton key={index} />)
                                : pizzas
                        }
                    </div>
                )
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;