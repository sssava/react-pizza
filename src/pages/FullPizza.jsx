import React, {useEffect, useState} from 'react';

import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";


const FullPizza = () => {
    const [pizza, setPizza] = useState([])
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizzaData(){
            try {
                const pizzaResp = await axios.get(`https://6391cf2db750c8d178ce0c12.mockapi.io/items/${id}`)
                setPizza(pizzaResp.data)
            } catch (error){
                console.log(error)
                alert("Ошибка при получении пиццы")
                navigate('/')
            }
        }

        fetchPizzaData()
    }, [])

    if (!pizza){
        return "Loading"
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.name}</h2>
            <h4>{pizza.price} UAH</h4>
        </div>
    );
};

export default FullPizza;