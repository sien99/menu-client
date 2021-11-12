import React from 'react';
import { Row, Col } from 'react-bootstrap';
import items from '../../data'; //require data from data.js
import Item from './Item';

const ItemList = (props) => {

    //passing back add item id
    const onAdd = (addItem) => {
        props.onAdd(addItem)
    }

    return (
        <div className="item-center">
            {/* eslint-disable-next-line */}
            <a href="#!" id={props.type} className="headerId" />
            <h3> {props.type} </h3>

            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                
                {items.filter((item)=>item.type===props.type)
                    .map((item,idx) => {
                            return(
                                <Col 
                                    key={((idx+1)*10).toString() + item.type.slice(0,2)}                                 
                                >
                                    <Item 
                                        key={item.id} 
                                        {...item}
                                        onAdd={onAdd}
                                    />
                                </Col>
                            )
                })}

            </Row>
        </div>
    )
}

export default ItemList
