import React from 'react';

import {Categories} from '../components';
import Sort from '../components/Sort';
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {Link} from "react-router-dom";


const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        fetch('https://62889d0d10e93797c15d0169.mockapi.io/items')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false)
            });
        window.scrollTo(0,0);
    },[])

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__error-info">
                <h2>Произошла ошибка 😕</h2>
                <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
            </div>
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home;
