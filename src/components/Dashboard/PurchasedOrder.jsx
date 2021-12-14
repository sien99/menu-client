import React from 'react';
import { Table } from 'react-bootstrap';
import date from 'date-and-time';

// lineItems = [orderArr,...]
// orderArr=
// {
//   "amount_total": 500,
//   "description": "Fried Rice",
//   "created": 1638458418,
//   "unit_amount": 250,
//   "quantity": 2
// }
const PurchasedOrder = ( { orderData, receipt } ) => {

    function convertSecondsToDate(dateInSeconds) {
        const pattern = date.compile('MMM D YYYY h:mm A');
        const d = new Date();
        d.setTime(dateInSeconds*1000);
        const timeCreated = date.format(d, pattern); 
        // console.log(timeCreated);// => Mar 16 2020 6:24 PM
        return timeCreated
    }

    function getTotalAmount(orderData){
        let total_amount = 0;
        orderData.forEach((item)=>{
            total_amount += item.total_amount
        })
        return (total_amount/100).toFixed(2)
    }

    const total_amount = getTotalAmount(orderData);

    console.log(total_amount);

    return (
        <div style={{ border:"solid 1px", margin:"20px 0"}}>
            {/* 
            [{"description":"Fried Rice","total_amount":500,"unit_amount":250,"created":1638458418,"quantity":2},
            {"description":"Smoked Salmon Sandwich","total_amount":100,"unit_amount":100,"created":1638458418,"quantity":1}] 
            */}
            <Table responsive striped bordered hover variant="light"
            style={{textAlign: "center"}}>
                <thead>
                    <tr>
                        <th colSpan='4'>
                            <a href={receipt} title="Click here to view receipt.">
                                Order Number: {orderData[0].created}
                            </a>
                        </th>
                        <th>
                        {convertSecondsToDate(orderData[0].created)}
                        </th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                        <th>Unit Price (S$)</th>
                        <th>Quantity</th>
                        <th>Subtotal (S$)</th>
                    </tr>
                </thead>
                <tbody>
                {   
                    orderData.map((order,idx) => (
                        <tr key={idx*order.created}>
                            <td>{idx+1}</td>
                            <td className="PO-table-cell" >{order.description}</td>
                            <td className="PO-table-cell" >{(order.unit_amount/100).toFixed(2)}</td>
                            <td className="PO-table-cell" >{order.quantity}</td>
                            <td className="PO-table-cell" >{(order.total_amount/100).toFixed(2)}</td>
                        </tr>
                    ))
                }

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">Total Amount:</td>
                        <td>S${total_amount}</td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}

export default PurchasedOrder
