import React from 'react';

const Categories = ({activeCategory, onClickCategory}) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((cat, index) => {
                    return <li key={index} className={activeCategory === index ? "active" : ""} onClick={() => onClickCategory(index)}>{cat}</li>
                })}
            </ul>
        </div>
    );
};

export default Categories;