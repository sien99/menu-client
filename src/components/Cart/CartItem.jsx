import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';

const CartItem = ({title, img, price, quantity, id, editItem}) => {

    //  itemObj: {
    //     id: string;
    //     type: string;
    //     title: string;
    //     img: string;
    //     text: string;
    //     price: number;
    //     quantity: number;
    // }

    const onChange = (e)=>{

        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
        // if(!isNaN(e.target.value)){ : has CONS of symbol allow
            let item = {
                id:id,
                quantity:e.target.value
            }
            editItem(item)
        }
    }

    const onSubstract = () => {
        let item = {
            id:id,
            quantity:quantity-1
        }
        editItem(item)
    }

    const onAdd = () => {
        let item = {
            id:id,
            quantity:quantity+1
        }
        editItem(item)
    }

    const onDelete = () => {
        let item = {
            id:id,
            quantity:0
        }
        editItem(item)
    }

    return (
        <Container className="cartItem-container">
            <Row>
                <Col>
                    <img className="cartItem-img" 
                    src={img} alt={`${title}.img`} />
                </Col>
                <Col xs={8} className="cartItem-detail-container">
                    <div className="cartItem-detail">
                        <p>{title}</p>
                        <Button
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    </div>
                    <div className="cartItem-detail">
                        <div className="cartItem-quantity">
                            <Button 
                                className="cartItem-button"
                                onClick={onSubstract}
                            >
                            -</Button>
                            <input type="text"
                                className="cartItem-input" 
                                value={quantity} 
                                onChange={onChange}

                            />
                            <Button className="cartItem-button"
                                onClick={onAdd}
                            >
                            +</Button>                        
                        </div>

                        <p>S${(price*quantity).toFixed(2)}</p>
                    </div>
                </Col>
            </Row>
            <hr />
        </Container>
    )
}

export default CartItem
