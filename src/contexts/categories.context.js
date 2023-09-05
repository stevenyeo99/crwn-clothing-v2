import { useState, createContext, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.util.js";

export const CategoriesContext = createContext({
    categoryMap: {},
});

export const CategoriesProvider = ({children}) => {

    const [categoryMap, setCategoryMap] = useState([]);
    const value = {
        categoryMap,
        setCategoryMap
    };

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMapData = await getCategoriesAndDocuments();
            setCategoryMap(categoryMapData);
        }

        getCategoryMap();
    }, []);

    return (
        <CategoriesContext.Provider value={value}>
            {
                children
            }
        </CategoriesContext.Provider>
    )
};