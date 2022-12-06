import React, {useState} from 'react';

const Categories = () => {
    const [active, setActive] = useState(0)
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                {categories.map((cat, index) => {
                    return <li key={index} className={active === index ? "active" : ""} onClick={() => setActive(index)}>{cat}</li>
                })}
            </ul>
        </div>
    );
};

export default Categories;