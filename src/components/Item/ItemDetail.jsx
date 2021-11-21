import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ItemDetail = ({show, handleClose, img, title, text, id, onAddQuantity}) => {
    
    const [quantity, setQuantity] = useState(0)

    // edit quantity
    const onAdd = () => {
        setQuantity(prev=>prev+1)
    }
    const onSubstract = () => {
        setQuantity(prev=>{
            console.log(prev);
           if (prev===0) {
               return 0
           }else{
            return (prev-1)
           }
        })
    }
    const onChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setQuantity(e.target.value)
        }
    }
    // push item quantity to 
    const addQuantity = () => {
        let item = {
            id: id,
            quantity: quantity
        }
        setQuantity(0)
        onAddQuantity(item)
    }

    return (
        
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen="md-down"
     >
        <Modal.Header closeButton>
        </Modal.Header>
        
        <Modal.Body>
            <div className="container-itemDetail">
                <div className="item-image">
                    <img src={img} alt={title} />  
                </div>
                <div className="item-description">
                    <h3>{title}</h3>
                    <p>{text}</p>  
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer sticky-btm>
            <div className="itemDetail-quantity">
                <Button 
                    className="item-button"
                    onClick={onSubstract}
                >
                -</Button>
                <input type="text"
                    className="item-input" 
                    value={quantity} 
                    onChange={onChange}
                />
                <Button className="item-button"
                    onClick={onAdd}
                >
                +</Button>       
            </div>
            <Button className="itemDetail-addCart"
                onClick={addQuantity}
            >
                Add To Cart
            </Button>
        </Modal.Footer>
        
    </Modal>

    )
}

export default ItemDetail
