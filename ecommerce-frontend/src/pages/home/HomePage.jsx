import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router';
import axios from 'axios'; 
import './HomePage.css';


export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    const [SearchParams] = useSearchParams();
    const search = SearchParams.get('search');

    useEffect(() => {
        const getHomeData = async () => {
            const urlPath = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
        }
        getHomeData();
    }, [search]);
    

    return (
        <>
            <title>Ecommerce Project</title>

            <link rel="icon" type="image/png" href="/home-favicon.png" />

            <Header cart={cart}/>

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}