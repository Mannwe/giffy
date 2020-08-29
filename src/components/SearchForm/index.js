import React from "react"
import css from "./SearchForm.module.css"
import { useLocation } from "wouter"
import {useForm} from './hook'

const RATINGS = ["g", "pg", "pg-13", "r"]

const SearchForm = ({initialKeyword = '', initialRating ='g'}) => {
    const [_, pushLocation] = useLocation();
    const { keyword, rating, times, updateKeyword, updateRating } = useForm({
        initialKeyword,
        initialRating,
    })

    const handleSubmit = (evt) => {
        evt.preventDefault();

        // navegar a otra ruta
        pushLocation(`/search/${keyword}/${rating}`)
    }

    const handleChange = (evt) => {
        updateKeyword(evt.target.value)        
    }

    const handleChangeRating = evt => {
        updateRating(evt.target.value)        
    }

    return (
        <form onSubmit={handleSubmit} className={css["c-search"]}>
            <button className={css["c-search-btn"]}>Buscar</button>
            <input
                className={css["c-search-input"]}
                placeholder="Search a gif here..."
                onChange={handleChange}
                type="text"
                value={keyword}
            />
            <select value={rating} onChange={handleChangeRating} >
                {RATINGS.map((rating) => (
                    <option key={rating}>{rating}</option>
                ))}
            </select>
            <small>{times}</small>
        </form>
    );
};

export default React.memo(SearchForm);
