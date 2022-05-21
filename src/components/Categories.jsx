import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = React.memo(({ value, onChangeCategory }) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li key={i + categoryName}
                        onClick={() => onChangeCategory(i)}
                        className={value === i ? 'active' : ''}>
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
});
