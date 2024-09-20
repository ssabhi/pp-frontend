import React, { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [products, setProducts] = useState([]);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    // fetch(`${backend_url}/allproducts`)
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data))
    fetch(`${backend_url}/allproducts`, {
      cert: 'src/keyValues/certificate.crt',
      key: 'src/keyValues/private.key'
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));

    if (localStorage.getItem("auth-token")) {
  //     fetch(`${backend_url}/getcart`, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/form-data',
  //         'auth-token': `${localStorage.getItem("auth-token")}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => { setCartItems(data) });
 

  fetch(`${backend_url}/getcart`, {
    method: 'POST',
    headers: {
      Accept: 'application/form-data',
      'auth-token': `${localStorage.getItem("auth-token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
    cert: 'src/keyValues/certificate.crt',
    key: 'src/keyValues/private.key'
  })
    .then((resp) => resp.json())
    .then((data) => { setCartItems(data); })
    .catch((error) => console.error(error));

  }
}, [])


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        try {
          let itemInfo = products.find((product) => product.id === Number(item));
          totalAmount += cartItems[item] * itemInfo.new_price;
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        try {
          let itemInfo = products.find((product) => product.id === Number(item));
          totalItem += itemInfo ? cartItems[item] : 0 ;
        } catch (error) {}
      }
    }
    return totalItem;
  };

  const addToCart = (itemId) => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please Login");
      return;
    }
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      // fetch(`${backend_url}/addtocart`, {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/form-data',
      //     'auth-token': `${localStorage.getItem("auth-token")}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ "itemId": itemId }),
      // })

      fetch(`${backend_url}/addtocart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
        cert: 'src/keyValues/certificate.crt',
        key: 'src/keyValues/private.key'
      })
        .then((resp) => resp.json())
        .then((data) => {
          // Handle the response data
        })
        .catch((error) => console.error(error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      // fetch(`${backend_url}/removefromcart`, {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/form-data',
      //     'auth-token': `${localStorage.getItem("auth-token")}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ "itemId": itemId }),
      // })
      fetch(`${backend_url}/removefromcart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
        cert: 'src/keyValues/certificate.crt',
        key: 'src/keyValues/private.key'
      })
        .then((resp) => resp.json())
        .then((data) => {
          // Handle the response data
        })
        .catch((error) => console.error(error));

    }
  };

  const contextValue = { products, getTotalCartItems, cartItems, addToCart, removeFromCart, getTotalCartAmount };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
