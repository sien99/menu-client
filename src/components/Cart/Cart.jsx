import React, { useState, useMemo } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CartItem from './CartItem';
import items from '../../data';
import sha256 from 'crypto-js/sha256';
import { checkout } from '../../api';

const Cart = ({ cartItems, editItem }) => {

    // Generate key only render on mount
    // https://reactjs.org/docs/hooks-reference.html#usememo
    const randomNum = useMemo(() => Math.random(), []);

    // Open/close 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isObjectExist = (id) => {
      return !( typeof cartItems[id] === 'undefined' || cartItems[id] === null )
    }
    
    // https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/
    // generate array of cartItemIds
    // Object.keys(cartItems)

    // create collection of itemIds-quantity
    let cartObjects = []
    let totalPrice = 0;
    let counter = 0;

    items.forEach(item => {
      if (isObjectExist(item.id)){
        let itemObj = item;
        // add quantity
        itemObj["quantity"] = cartItems[item.id]; // or itemObj.quantity
        cartObjects.push(itemObj);
        totalPrice += itemObj.quantity * itemObj.price
        counter += Number(itemObj.quantity)
      }
    })

    const onCheckout = () => {
      const storeData = JSON.parse(localStorage.getItem("profile"))
      const payload = {
        cartObjects: cartObjects,
        customer_id: storeData?.customer_id,

      }
      checkout(payload)
      .then((res)=>{
        console.log(res);
        const { url } = res.data;
        console.log(url);
        window.location = url;
      })
      .catch(err=>console.log(err.message))
    }

    return (
      <>
       
        <Button key={randomNum*(1+counter)} className="cart-button" variant="dark" onClick={handleShow}>
          <ShoppingBagIcon sx={{ fontSize: 30 }}/>
          <div className="cart-counter">
            <p>{(counter<=99)?counter:"99+"}</p>
          </div>
          
        </Button>
        
        <Offcanvas 
            show={show} 
            onHide={handleClose}
            placement="end"
            
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Your Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>Item(s) Added</p>
            {
              cartObjects.map((cartObject) => {
                if(cartObject.quantity!==0){
                  return <CartItem 
                          key={sha256(cartObject.id)} 
                          {...cartObject} 
                          editItem={editItem}
                        />
                }
                return true
              })
            }
          </Offcanvas.Body>
          <div className="cart-footer">
            <div className="cart-totalPrice">
              <b>Total</b><b>S${(totalPrice).toFixed(2)}</b> 
            </div>
            <Button
              onClick={onCheckout}
              disabled={(Number(counter)===0) ? true:false}
            >
              Place Order
            </Button>
          </div>
        </Offcanvas>
      </>
    );
}

export default Cart
