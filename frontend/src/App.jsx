import React, { useEffect, useState } from 'react'
import ProductTable from './components/ProductTable'
import UserInput from './components/UserInput';
import Summary from './components/Summary';
import axios from "axios";
import "./App.css"
import { AppProvider } from './context/AppContext';

function App() {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios
            .get("http://localhost:8080/jeweals")
            .then((response) => {
                setProducts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (   
        <AppProvider>
            <div className = "app">
                <div className="app-container">
                    <div className='top'>
                        <UserInput/>
                    </div>
                    <div className='center'>
                        <div className='center-left'>
                            <h1>รายการสินค้า</h1>
                            <ProductTable products = {products} setProducts = {setProducts}/>
                        </div>
                        <div className='center-right'>
                            <h1>สรุป</h1>
                            <Summary products = {products}/>
                        </div>
                    </div>
                </div>
            </div>
        </AppProvider>
    );
}

export default App
