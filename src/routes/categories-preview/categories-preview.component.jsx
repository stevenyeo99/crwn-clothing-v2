import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const { categoryMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {
                Object.keys(categoryMap).map(categoryKey => {
                    const products = categoryMap[categoryKey];
                    return (
                        <CategoryPreview key={categoryKey} products={products} title={categoryKey} />
                    )
                })
            }
        </Fragment>
    );
};

export default CategoriesPreview;