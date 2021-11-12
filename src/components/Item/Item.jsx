import React, { useState } from 'react';
import { Card, Button} from 'react-bootstrap';
import ItemDetail from './ItemDetail';

const Item = (props) => {
    // handle Modal
    const [show, setShow] = useState(false);
    // const [quantity, setQuantity] = useState(0)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const onAdd = () => {
    //     setQuantity(prev=>prev+1)
    // }
    // const onSubstract = () => {
    //     setQuantity(prev=>{
    //         console.log(prev);
    //        if (prev===0) {
    //            return 0
    //        }else{
    //         return (prev-1)
    //        }
    //     })
    // }
    // const onChange = (e) => {
    //     const re = /^[0-9\b]+$/;
    //     if (e.target.value === '' || re.test(e.target.value)) {
    //         setQuantity(e.target.value)
    //     }
    // }

    // handle Cart
    
    const addItem = (e) => {
        let item = {}
        item.id = e.target.value;
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
        />

        </>
    )
}

export default Item
