import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState, Fragment } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

const Category = () => {
    const {category} = useParams();
    const { categoryMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoryMap[category]);
    }, [category, categoryMap]);

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products &&
                    products.map(product => {
                        return <ProductCard key={product.id} product={product} />
                    })
                }
            </div>
        </Fragment>
    );
};

export default Category;