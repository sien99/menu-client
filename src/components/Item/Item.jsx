import React, { useState } from 'react';
import { Card, Button} from 'react-bootstrap';
import ItemDetail from './ItemDetail';

const Item = (props) => {
    // handle Modal
    const [show, setShow] = useState(false);
    // const [quantity, setQuantity] = useState(0)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const addItem = (e) => {
        let item = {
            id : e.target.value,
        }        
        props.onAdd(item)
    }

    const onAddQuantity = (item) =>{
        props.onAdd(item)
    }

    
    return (
        <>
        <Card className="menu-item">
            <Card.Img variant="top" src={props.img} onClick={handleShow} />
            <Card.Body>
                <Card.Title onClick={handleShow}>{props.title}</Card.Title>
                <Card.Text onClick={handleShow}>
                S${(props.price).toFixed(2)}
                {/* Some quick example text to build on the card title and make up the bulk of
                the card's content. */}
                </Card.Text>
                <Button 
                    variant="primary" 
                    value={props.id}
                    onClick={addItem}
                >
                    Add To Cart
                </Button>
            </Card.Body>
        </Card>

        <ItemDetail
         {...props}
         show={show}
         handleClose={handleClose}
         onAddQuantity={onAddQuantity}
        />

        </>
    )
}

export default Item
