import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { useContext } from "react";

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.util";

import { NavigationContainer, LogoContainer, NavLinkContainer, NavLink } from './navigation.styles.jsx';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer className='navigation'>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>

                <NavLinkContainer>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>

                    {
                        currentUser ? (
                            <NavLink as={'span'} onClick={signOutUser}>SIGN OUT</NavLink>
                        ) 
                        : 
                        (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }

                    <CartIcon />
                </NavLinkContainer>

                {
                    isCartOpen && <CartDropdown />
                }
            </NavigationContainer>

            <Outlet />
        </Fragment>
    );
};

export default Navigation;