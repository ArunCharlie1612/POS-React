import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { AiOutlineArrowDown } from 'react-icons/ai'


export default function SnacksBar({ billChange }) {
    const [InventoryFormData, setInventoryFormData] = useState(null);
    // const BillingData = localStorage.getItem('BillingData') ? JSON.parse(localStorage.getItem('BillingData')) : [];


    // const [BillingData, setBillingData] = useState([]);
    var itemQuantity = 1;
    const snacksRef = useRef(null);
    const scrollAmount = 50;

    // For Snacks Scrolling Movement
    const handleUpClick = () => {
        snacksRef.current.scrollTop += scrollAmount;
    }
    const handleDownClick = () => {
        snacksRef.current.scrollTop -= scrollAmount;
    }

    const handleSnacksClick = (index) => {
        let BillingData = [];
        let currentDate = new Date().toJSON().slice(0, 10);
        BillingData = localStorage.getItem('BillingData') ? JSON.parse(localStorage.getItem('BillingData')) : [];
        var existingItem = BillingData?.find((item) => item.itemName === InventoryFormData[index].itemName);


        if (existingItem) {
            let CopyBillingData = BillingData;
            CopyBillingData.forEach((item) => {
                if (item.itemName === InventoryFormData[index].itemName) {
                    item.itemQuantity += 1;
                    item.itemTotalPrice = item.itemQuantity * item.itemPrice;
                }
            });
            localStorage.setItem('BillingData', JSON.stringify(CopyBillingData));
            billChange()
        } else {
            BillingData.push({
                "itemName": InventoryFormData[index].itemName,
                "itemNo" : InventoryFormData[index].itemNumber,
                "itemQuantity": parseInt(itemQuantity),
                "itemPrice": parseInt(InventoryFormData[index].price),
                "itemTotalPrice": parseInt(itemQuantity) * parseInt(InventoryFormData[index].price),
                "BillingDate": currentDate,
            });
            localStorage.setItem('BillingData', JSON.stringify(BillingData));
            billChange();
        }
    };


    // useEffect(() => {
    //     localStorage.setItem('BillingData', JSON.stringify(BillingData));
    //     // console.log(BillingData);
    //     billChange()
    // }, [])


    useEffect(() => {
        const storedInventoryData = localStorage.getItem('InventoryFormData') ? JSON.parse(localStorage.getItem('InventoryFormData')) : [];
        setInventoryFormData(storedInventoryData);

        // setBillingData(storedBillingData);
    }, []);

    return (

        <div className="col-2 border scrollingSnacksPart d-flex justify-content-center">
            <div className="snacksMainDiv d-flex flex-column gap-1">
                <button id="previous" onClick={handleDownClick}><AiOutlineArrowUp /></button>
                <div className="d-flex flex-column gap-1 scrollingPart" id="snacksPart" ref={snacksRef}>
                    {
                        Array.isArray(InventoryFormData) &&
                        InventoryFormData?.map((record, index) => (
                            record.itemCategory === "Snacks" && (
                                <button id='snackName' key={index} onClick={() => handleSnacksClick(index)}>
                                    {record.itemName}
                                </button>
                            )
                        ))
                    }

                    {/* <!-- Add Snacks Buttons through JS --> */}



                </div>
                <button id="next" onClick={handleUpClick}><AiOutlineArrowDown /></button>
            </div>

        </div>

    )
}
