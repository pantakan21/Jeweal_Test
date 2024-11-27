import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [title, setTitle] = useState();
    const [amount, setAmount] = useState(0);
    const [weight, setWeight] = useState(0);
    const [price, setPrice] = useState(0);
    const [unit, setUnit] = useState();
    const [priceBefore, setPriceBefore] = useState(0);
    const [voucher, setVoucher] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const [sumTotalPriceBefore, setSumTotalPriceBefore] = useState(0);
    const [sumTotalAmount, setTotalAmount] = useState(0);
    const [sumTotalWeight, setTotalWeight] = useState(0);
    const [sumTotalPriceNew, setTotalPriceNew] = useState(0);
    const [sumDiscount, setDiscount] = useState(0);
    
    return (
        <AppContext.Provider value={{sumDiscount, setDiscount, sumTotalPriceBefore, setSumTotalPriceBefore,sumTotalAmount, setTotalAmount, sumTotalWeight, setTotalWeight,sumTotalPriceNew, setTotalPriceNew, title, amount, weight, price, unit, priceBefore, voucher, totalPrice, setTitle, setAmount, setWeight, setPrice, setUnit, setPriceBefore, setVoucher, setTotalPrice }}>
            {children}
        </AppContext.Provider>
    );
};