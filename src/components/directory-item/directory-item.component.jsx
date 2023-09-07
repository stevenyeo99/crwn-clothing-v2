import { useNavigate } from 'react-router-dom';

import { BackgroundImage, CategoryBodyContainer, DirectoryItemContainer } from './directory-item.styles.jsx';

const DirectoryItem = ({category}) => {
    const navigate = useNavigate();

    const {title, imageUrl, route} = category;

    const navigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={navigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <CategoryBodyContainer>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </CategoryBodyContainer>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;