import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import ProductCard from "../../components/product-card/product-card.component";

import './shop.styles.scss';

const Shop = () => {
    const { categoryMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {
                Object.keys(categoryMap).map(categoryKey => {

                    return (
                        <Fragment key={categoryKey}>
                            <h2>{categoryKey.toLowerCase()}</h2>
                            <div className='products-container'>
                                {
                                    categoryMap[categoryKey].slice(0, 4).map(product => {
                                        return (
                                            <ProductCard key={product.id} product={product} />
                                        )
                                    })
                                }
                            </div>
                        </Fragment>
                    )
                    
                })
            }
        </Fragment>
    );
};

export default Shop;