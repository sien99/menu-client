import React, { useEffect, useState } from 'react';
import NavDirectory from './Navbar/NavDirectory';
import NavHeader from './Navbar/NavHeader';
import ItemList from './Item/ItemList';
import { useLocation } from 'react-router';
import Dashboard from './Dashboard/Dashboard';

const Main = () => {
    
    //#region : handle menu/cart item logic

    // cartItems : key(id) value pair 
    const [cartItems, setCartItems] = useState({})
    const types = ['Appetizer','Rice','Noodles']

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
    
    //#endregion 

    //#region : handle components render based on path

    const location = useLocation()
    const {pathname} = location //return /main/?
    const [path, setPath] = useState("default")
    const pathArray = pathname.split("/")
    useEffect(() => {
        setPath(pathArray[1])
    }, [pathArray])
    
    //#endregion
    return (
        <div className="main-body">
            <NavHeader 
                cartItems={cartItems}
                editItem={editItem}
                
            />
        
        { !(path==="dashboard") ? //render based on the path
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
            :
            <div>
                <Dashboard />
            </div>
        }


        </div>
        
    )
}

export default Main
