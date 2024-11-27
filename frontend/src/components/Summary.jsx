import React, { useContext, useEffect, useState } from 'react'
import "./Summary.css"
import { AppContext } from '../context/AppContext';

const Summary = () => {
    const [vat, setVat] = useState(0);
    const { sumDiscount, setDiscount, sumTotalPriceBefore, setSumTotalPriceBefore,sumTotalAmount, setTotalAmount, sumTotalWeight, setTotalWeight,sumTotalPriceNew, setTotalPriceNew, title, amount, weight, price, unit, priceBefore, voucher, totalPrice, setTitle, setAmount, setWeight, setPrice, setUnit, setPriceBefore, setVoucher, setTotalPrice } = useContext(AppContext); // ใช้ useContext เพื่อดึงข้อมูลจาก context
    
    useEffect(() => {
        const calculatedVat = sumTotalPriceNew * 7 / 100;
        setVat(calculatedVat);
    }, [sumTotalPriceNew]);

    return (
        <div className='summary'>
            <div className='detail'>
                <p>ราคาก่อนส่วนลด</p>
                <div>
                    <input type="text" placeholder='0.00' value = {sumTotalPriceBefore} readOnly/>
                    <p>THB</p>
                </div>
            </div>
            <div className='detail'>
                <p>ส่วนลดท้ายบิล</p>
                <div>
                    <input type="text" placeholder='0.00' value = {sumDiscount} readOnly/>
                    <p>THB</p>
                </div>
            </div>
            <div className='detail'>
                <p>ราคาหลังหักส่วนลด</p>
                <div>
                    <input type="text" placeholder='0.00' value = {sumTotalPriceNew} readOnly/>
                    <p>THB</p>
                </div>
            </div>
            <div className='detail'>
                <p>Vat</p>
                <div>
                    <input type="text" placeholder='0.00' value = {vat} readOnly/>
                    <p>THB</p>
                </div>
            </div>
            <div className='grand-total'>
                <h1>Grand Total</h1>
                <div>
                    <h1>{sumTotalPriceNew + vat}&nbsp;&nbsp;</h1>
                    <h1>THB</h1>
                </div>
            </div>
        </div>
    )
}

export default Summary
