import React, { useEffect, useState } from "react";
import "./SellerAdminPage.css";

const getDataFromLocalStorage = () => {
  const values = Object.values(localStorage);
  const products = [];
  for (let item of values) {
    products.push(JSON.parse(item));
  }

  if (products) {
    return products;
  } else {
    return [];
  }
};

const addExpenses = () => {
  const values = Object.values(localStorage);
  let totalExpense = 0;
  for (let item of values) {
    totalExpense = totalExpense + parseInt(JSON.parse(item).expenseamount);
  }

  return totalExpense;
};

const SellerAdminPage = () => {
  const [productId, setProductId] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [items, setItems] = useState([...getDataFromLocalStorage()]);
  const [totalExpense, setTotalExpense] = useState(addExpenses());

  const addItem = (e) => {
    e.preventDefault();

    const sellingDetails = {
      expenseamount: sellingPrice,
      decsription: productName,
      orderId: productId,
    };

    if (sellingPrice && productId && productName) {
      setItems([...items, sellingDetails]);

      localStorage.setItem(productId, JSON.stringify(sellingDetails));
      // setTotalExpense(totalExpense+parseInt(sellingPrice))
      setTotalExpense((prev) => {
        return prev + parseInt(sellingPrice);
      });
    }
    setProductId("");
    setProductName("");
    setSellingPrice("");
  };

  const deleteItem = (id) => {
    const filteredProducts = items.filter((item, index) => {
      if (id === item.orderId) {
        setTotalExpense(totalExpense - item.expenseamount);
        localStorage.removeItem(id);
      }
      return item.orderId !== id;
    });

    setItems(filteredProducts);
  };

  return (
    <div className="main">
      <form className="form">
        <div>
          <label>Product Id:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <div>
          <label>Selling Price:</label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </div>
        <div>
          <label type="number">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <button className="btn" onClick={addItem}>
          Add Product
        </button>
      </form>
      {
        <div className="products">
          Products:
          {items != [] &&
            items.map((item, index) => {
              return (
                <ul>
                  <li key={index}>
                    {` ${item.orderId} - ${item.decsription}  - ${item.expenseamount}`}
                    <button onClick={() => deleteItem(item.orderId)}>
                      Delete item
                    </button>
                  </li>
                </ul>
              );
            })}
        </div>
      }

      <div className="productsValue">
        Total Value Worth Of Products: {`₹${totalExpense}`}
      </div>
    </div>
  );
};

export default SellerAdminPage;
