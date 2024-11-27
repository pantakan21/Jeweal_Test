import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./EditProductModal.css";

const EditProductModal = ({ onClose, productId, fetchProducts }) => {
    const [product, setProduct] = useState({
        title: '',
        amount: 0,
        weight: 0,
        price: 0,
        unit: '',
        priceBefore: 0,
        voucher: 0,
        totalPrice: 0,
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8080/jeweals/${productId}`)
            .then((response) => {
              setProduct(response.data);
            })
            .catch((error) => {
              console.error("Error fetching product data:", error);
            });
    }, [productId]);

    const calculatePriceBefore = (price, amount) => price * amount;

    const calculateTotalPrice = (price, amount, voucher) => {
        const discount = price * (voucher / 100);
        return amount * (price - discount);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSave = () => {
        const updatedPriceBefore = calculatePriceBefore(product.price, product.amount);
        const updatedTotalPrice = calculateTotalPrice(product.price, product.amount, product.voucher);

        const updatedProduct = {
            ...product,
            priceBefore: updatedPriceBefore,
            totalPrice: updatedTotalPrice,
        };

        axios
            .patch(`http://localhost:8080/jeweals/${productId}`, updatedProduct)
            .then(() => {
              alert("Product updated successfully");
              fetchProducts(); 
              onClose();
            })
            .catch((error) => {
              console.error("Error updating product:", error);
            });
    };

    return (
        <div className="create-todo-modal" onClick={onClose}>
            <div className="modal-container" onClick={(event) => event.stopPropagation()}>
                <p className="close-btn" onClick={onClose}>X</p>
                <h1>แก้ไขสินค้า</h1>
                <div className="input-form">
                    <label>รหัสสินค้า</label>
                    <input type="text"
                      name="title"
                      value={product.title}
                      onChange={handleInputChange}
                      required
                    />
                </div>
                <div className="input-form">
                    <label>จำนวน</label>
                    <input
                      type="number"
                      name="amount"
                      value={product.amount}
                      onChange={handleInputChange}
                      required
                    />
                </div>
                <div className="input-form">
                    <label>น้ำหนัก</label>
                    <input
                      type="number"
                      name="weight"
                      value={product.weight}
                      onChange={handleInputChange}
                      required
                    />
                </div>
                <div className="input-form">
                    <label>ราคา</label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleInputChange}
                      required
                    />
                </div>
                <div className="input-form">
                    <label>หน่วย</label>
                    <select
                      name="unit"
                      value={product.unit}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="ชิ้น">ชิ้น</option>
                      <option value="กิโลกรัม">กิโลกรัม</option>
                    </select>
                </div>
                <div className="input-form">
                    <label>ส่วนลด (%)</label>
                    <input
                      type="number"
                      name="voucher"
                      value={product.voucher}
                      onChange={handleInputChange}
                      required
                    />
                </div>
                <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default EditProductModal;
