import React, { useContext, useState } from 'react';
import "./ProductTable.css"
import axios from 'axios'
import { AppContext } from '../context/AppContext';
import EditProductModal from '../components/EditProductModal';

const ProductTable = ({products, setProducts}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [productId, setProductId] = useState();

    const { sumDiscount, setDiscount, sumTotalPriceBefore, setSumTotalPriceBefore,sumTotalAmount, setTotalAmount, sumTotalWeight, setTotalWeight,sumTotalPriceNew, setTotalPriceNew, title, amount, weight, price, unit, priceBefore, voucher, totalPrice, setTitle, setAmount, setWeight, setPrice, setUnit, setPriceBefore, setVoucher, setTotalPrice } = useContext(AppContext); // ใช้ useContext เพื่อดึงข้อมูลจาก context
   
    const handleEditTaskClick = (pro_id) => {
        setProductId(pro_id);
        setShowEditModal(true);
    }

    const handleCloseModal = () => {
        setShowEditModal(false);
        fetchProducts();
    }

    // คำนวณราคาก่อนส่วนลด
    const calculatePriceBefore = (price, amount) => {
        const calculatedPriceBefore = price * amount;
        return calculatedPriceBefore;
    };

    // คำนวณราคาสุทธิ
    const calculateTotalPrice = (price, amount, voucher) => {
        const discount = price * (voucher / 100);
        const calculatedTotalPrice = amount * (price - discount);
        setTotalPrice(calculatedTotalPrice);
        return calculatedTotalPrice;
    };

    const handleDelete = (productId) => {
        const confirmDelete = window.confirm("Are you sure");
        if(confirmDelete) {
            axios
            .delete(`http://localhost:8080/jeweals/${productId}`)
            .then(() => {
                console.log("Product Deleted");
                fetchProducts();
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };
    
    const handleAdd = () => {
        const calculatedPriceBefore = calculatePriceBefore(price, amount);
        const calculatedTotalPrice = calculateTotalPrice(price, amount, voucher);
    
        const data = {
            title,
            amount,
            price,
            weight,
            unit,
            priceBefore: calculatedPriceBefore,
            voucher,
            totalPrice: calculatedTotalPrice
        };

        axios
            .post(`http://localhost:8080/jeweals`, data)
            .then(() => {
                console.log("success")
            })
            .catch((error) => {
                console.log(error);
            })
            fetchProducts();
            fetchProducts();
    };

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

    const totalPriceBefore = products.reduce((sum, product) => sum + product.priceBefore, 0);
    const totalAmount = products.reduce((sum, product) => sum + product.amount, 0);
    const totalWeight = products.reduce((sum, product) => sum + product.weight, 0);
    const totalPriceNew = products.reduce((sum, product) => sum + product.totalPrice, 0);

    setSumTotalPriceBefore(totalPriceBefore);
    setTotalAmount(totalAmount);
    setTotalWeight(totalWeight);
    setTotalPriceNew(totalPriceNew);
    setDiscount(totalPriceNew - totalPriceBefore);
    
    return (
        <div className='table-container'> 
            <table>
                <thead>
                    <tr className='column'>
                        <th>#</th>
                        <th>รหัสสินค้า</th>
                        <th className='text-right'>จำนวน</th>
                        <th className='grey-border'>น้ำหนัก</th>
                        <th className='text-right'>ราคา/หน่วย</th>
                        <th className='text-left'>หน่วย</th>
                        <th className='text-right'>ราคาก่อนส่วนลด</th>
                        <th className='grey-border'>ส่วนลด (%)</th>
                        <th className='text-right'>ราคาสุทธิ</th>
                        <th className='text-right'>เพิ่ม/ลบ</th>
                        <th className='text-right'>แก้ไข</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td><input className='input-width-1' type="text" name="fname" value={product.title} readOnly /></td>
                                <td><input className='input-width-2' type="text" name="fname" value={product.amount} readOnly /></td>
                                <td className='grey-border'><input className='input-width-3' type="text" name="fname" value={product.weight} readOnly /></td>
                                <td><input className='input-width-3' type="text" name="fname" value={product.price} readOnly /></td>
                                <td>
                                    <select name="cars" id="cars" value={product.unit} disabled>
                                        <option value="ชิ้น">ชิ้น</option>
                                        <option value="กิโลกรัม">กิโลกรัม</option>
                                    </select>
                                </td>
                                <td><input className='input-width-3' type="text" name="fname" value={product.priceBefore} readOnly /></td>
                                <td className='grey-border'><input className='input-width-3' type="text" name="fname" value={product.voucher} readOnly /></td>
                                <td><input className='input-width-3' type="text" name="fname" value={product.totalPrice} readOnly /></td>
                                <td><button className='delete-btn' onClick={() => handleDelete(product._id)}>ลบ</button></td>
                                <td><button className='edit-btn' onClick={() => handleEditTaskClick(product._id)}>แก้ไข</button></td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td></td>
                        <td><input className='input-width-1' type="text" name="fname" placeholder='ชื่อสินค้า' onChange={(event) => setTitle(event.target.value)} /></td>
                        <td><input className='input-width-2' type="text" name="fname" placeholder='จำนวน' onChange={(event) => setAmount(event.target.value)} /></td>
                        <td className='grey-border'><input className='input-width-3' type="text" name="fname" placeholder='น้ำหนัก' onChange={(event) => setWeight(event.target.value)} /></td>
                        <td><input className='input-width-3' type="text" name="fname" placeholder='ราคาต่อหน่วย' onChange={(event) => setPrice(event.target.value)} /></td>
                        <td>
                            <select name="cars" id="cars" onChange={(event) => setUnit(event.target.value)}>
                                <option value="ชิ้น">ชิ้น</option>
                                <option value="กิโลกรัม">กิโลกรัม</option>
                            </select>
                        </td>
                        <td><input className='input-width-3' type="text" name="fname" value = {(calculatePriceBefore(price, amount))} onChange={(event) => setPriceBefore(event.target.value)} readOnly/></td>
                        <td className='grey-border'><input className='input-width-3' type="text" name="fname" placeholder='ส่วนลด'  onChange={(event) => setVoucher(event.target.value)} /></td>
                        <td><input className='input-width-3' type="text" name="fname" value = {amount * (price - (price * (voucher / 100)))} placeholder='ราคาสุทธิ' readOnly onChange={(event) => setTotalPrice(event.target.value)} /></td>
                        <td><button className='add-btn' onClick={() => handleAdd()}>เพิ่ม</button></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><input className='input-width-2' type="text" name="fname" value={totalAmount} readOnly/></td>
                        <td className='grey-border'><input className='input-width-3' type="text" name="fname" value={totalWeight}/></td>
                        <td></td>
                        <td></td>
                        <td><input className='input-width-3' type="text" name="fname" value={totalPriceBefore} readOnly/></td>
                        <td className='grey-border'></td>
                        <td><input className='input-width-3' type="text" name="fname" value={totalPriceNew} readOnly/></td>
                    </tr>
                </tfoot>
            </table>
            {showEditModal && (
                <EditProductModal onClose = {handleCloseModal} productId = {productId}/>
            )}
        </div>
    )
}

export default ProductTable
