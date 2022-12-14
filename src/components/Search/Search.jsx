import React, {useCallback, useContext, useRef, useState} from 'react';
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import {useDispatch, useSelector} from "react-redux";

import {setSearchValue} from "../../redux/slices/filterSlice";

const Search = () => {
    const [value, setValue] = useState("")
    const dispatch = useDispatch()
    const inputRef = useRef()

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
        }, 500), []
    )

    const onChangeInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <input ref={inputRef} className={styles.input} type="text" placeholder="Поиск пиццы..." value={value} onChange={onChangeInput} />
            { value && <svg onClick={onClickClear} className={styles.clear} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>}
        </div>
    );
};

export default Search;