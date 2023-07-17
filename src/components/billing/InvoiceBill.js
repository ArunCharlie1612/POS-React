import React, { useEffect, useState } from 'react'

export default function InvoiceBill({ billChange }) {
    let [BillingData, setBillingData] = useState();
    let [TotalPrice,setTotalPrice] = useState(0.00);

    useEffect(() => {

        var BillingData = localStorage.getItem('BillingData') ? JSON.parse(localStorage.getItem('BillingData')) : [];

        // var TotalPriceValue = 0.00;
        // if(BillingData.length > 0){
        //     TotalPriceValue = BillingData.map((billingData) =>(
        //         TotalPriceValue += billingData.itemTotalPrice
        //     ));
        //     setTotalPrice(TotalPriceValue[TotalPriceValue.length -1]); 
        // }

        var TotalPriceValue = 0.00;
        debugger
        if(BillingData){
            BillingData.forEach((record) =>{
                TotalPriceValue += record.itemTotalPrice;
                
            });
            setTotalPrice(TotalPriceValue)
        }
        setBillingData(BillingData);
        // console.log(billChange)
    }, [billChange]);



    return (
        <div>
            <div className="InvoicePartID" id="InvoicePart">
                <div className="border border-dark border-3 invoice_header">
                    <h5 className="BillingTotal">TotalPrice: $<span id="BillingPriceValue">
                    {TotalPrice}
                    </span></h5>
                </div>
                <div className="Table_Main_Data">
                    <table className="table table-striped table-hover cursor-pointer">
                        <thead className="flex justify-content-between">
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                        </thead>
                        <tbody id="BillingTableData">
                            {
                                Array.isArray(BillingData) && (
                                    BillingData?.map((record, index) => (
                                        <tr key={index}>
                                            <td className='small p-1'>{record.itemName}</td>
                                            <td className='small p-1'>{record.itemQuantity}</td>
                                            <td className='small p-1'>{record.itemPrice}</td>
                                            <td className='small p-1'>{record.itemTotalPrice}</td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
