import React, { useState } from 'react';

import NavDirectory from './Navbar/NavDirectory';
import NavHeader from './Navbar/NavHeader';
import ItemList from './Item/ItemList';


const Main = () => {
    // Object.values(obj) return values of js obj in array
    // reduce(reducer) return sum of array
    // const sumValues = obj => Object.values(obj).reduce((prevValue, curValue) => prevValue + curValue);

    // cartItems : key(id) value pair 
    const [cartItems, setCartItems] = useState({})
    // let cartItemTypes = Object.keys(cartItems).length
    // add item to arr
    const addItem = (item) => {
       
        const { id } = item ;
        let quantity = 1
        if (item.quantity){
            quantity=Number(item.quantity)
        }
        try {
            
            // check item exist in db
            if 
            ( typeof cartItems[id] === 'undefined' || cartItems[id] === null ){
                console.log('empty cart');
                setCartItems({ 
                    ...cartItems,
                    [id]: quantity  
                  })
                
            }else{
                let prev = cartItems[id]
                // console.log(prev);
                setCartItems({
                ...cartItems, 
                [id]: prev+quantity  
                })
            }
            
        } catch (err) {
            console.log(err);
        }

    }

    const editItem = (item) => {
        try {
            const {id, quantity} = item
            setCartItems({ 
                ...cartItems,
                [id]: quantity 
              })
        } catch (error) {
            console.error(error);
        }

    }

    const types = ['Appetizer','Rice','Noodles']
    return (
        <div>
            <NavHeader 
                cartItems={cartItems}
                editItem={editItem}
                
            />
            <div>
                <NavDirectory />
                {/* {JSON.stringify(cartItems)} */}
                {types.map((type,idx)=>{
                    return(
                        <ItemList 
                            key={idx*3} 
                            type={type}
                            onAdd={addItem}
                        />  
                    )
                })}
            </div>
        </div>
        
    )
}

export default Main
