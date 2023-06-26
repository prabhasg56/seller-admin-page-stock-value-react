import React, { useState } from "react";
import "./SellerAdminPage.css";

const SellerAdminPage = () => {
  const [productId, setProductId] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productName, setProductName] = useState("");

  const formHandler = (e) => {
    e.preventDefault();

    const sellingDetails = {
      expenseamount: sellingPrice,
      decsription: productName,
      orderId: productId,
    };

    localStorage.setItem(productId, JSON.stringify(sellingDetails));
  };

  const deleteItem = (ind) => {
    console.log(ind)
    localStorage.removeItem(ind);
  }

  return (
    <div className="main">
      <form className="form" onSubmit={formHandler}>
        <div>
          <label>Product Id:</label>
          <input type="text" onChange={(e) => setProductId(e.target.value)} />
        </div>
        <div>
          <label>Selling Price:</label>
          <input
            type="number"
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </div>
        <div>
          <label type="number">Product Name:</label>
          <input type="text" onChange={(e) => setProductName(e.target.value)} />
        </div>
        <button className="btn">Add Product</button>
      </form>
      {
        <div className="products">
          Products:
          {Object.entries(localStorage).map((item, index) => {
            return (
                <ul>
                  <li key={index}>{item[1]}
                  <button onClick={()=>deleteItem(Object.keys(localStorage))}>Delete item</button>
                  </li>
                  
                </ul>
            );
          })}
        </div>
      }

      <div className="productsValue"> Total Value Worth Of Products: </div>
    </div>
  );
};

export default SellerAdminPage;
