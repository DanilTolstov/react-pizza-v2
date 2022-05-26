import React from 'react';

import {Categories} from '../components';
import Sort from '../components/Sort';
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/filter/slice";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import qs from "qs";


const Home = () => {
    const dispatch = useDispatch();
    const isMounted = React.useRef(false);
    const navigate = useNavigate();

    const {categoryId, sort, currentPage } = useSelector(state => state.filter);
    const sortType = sort.sortProperty;

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    };

    React.useEffect(() => {
        axios.get('https://62889d0d10e93797c15d0169.mockapi.io/items')
            .then((res) => {
                setItems(res.data);
                setIsLoading(false)
            });
        window.scrollTo(0, 0);
    }, [])


    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                categoryId: categoryId > 0 ? categoryId : null,
                sortProperty: sort.sortProperty,
                currentPage,
            };

            const queryString = qs.stringify(params, {skipNulls: true});

            navigate(`/?${queryString}`);
        }

    })

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__error-info">
                <h2>Произошла ошибка 😕</h2>
                <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
            </div>
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home;
