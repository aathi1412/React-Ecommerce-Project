import { NavLink, useNavigate, useSearchParams } from 'react-router';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import MobileLogoWhite from '../assets/images/logos/mobile-logo-white.png';
import LogoWhite from '../assets/images/logos/logo-white.png';
import { useState } from 'react';
import './Header.css';



export function Header({ cart }) {
    
    const navigate = useNavigate();

    const [searchParam] = useSearchParams();
    const searchText = searchParam.get('search');
    const [search, setSearch] = useState(searchText || '');

    
    // calculate quantity
    let totalQuantity = 0;
    cart && cart.forEach(cartItem => {
        totalQuantity += cartItem.quantity;
    });

    //search products
    const getSearchDetails = (event) => {
        setSearch(event.target.value);
    };

    const searchProduct = async () => {
        navigate(`/?search=${search}`);
    };

    const keyboardEvent = (event) => {
        if(event.key === 'Enter'){
            const searchProduct = async () => {
                navigate(`/?search=${search}`);
            };
            searchProduct();
        }
    }

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={LogoWhite} />
                    <img className="mobile-logo"
                        src={MobileLogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" value={search} onChange={getSearchDetails} onKeyDown={keyboardEvent} />

                <button className="search-button" onClick={searchProduct}>
                    <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    );
}