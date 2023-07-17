import React, { useEffect, useState } from 'react'

export default function ItemRequestTable() {

    const [itemName,setItemName] = useState("");
    const [itemNumber,setItemNumber] = useState("");
    const [quantity,setQuantity] = useState("");
    const [date,setDate] = useState("");
    const [errMsg,setErrMsg] = useState("");
    const [ItemRequestDataTable,setItemRequestDataTable] = useState([]);

    useEffect(()=> {
        fetchItemRequest()
    },[])

    const handleItemValidate = () =>{
        if(!itemNumber || (!itemNumber.match(/^[0-9]+$/))){
            setErrMsg("Item Number is Required");
            return false;
        }
        else if(!itemName || (!itemName.match(/^[A-Za-z]+$/))){
            setErrMsg("Item Name is Required");
            return false;
        }
        
        else if(!quantity || (!quantity.match(/^[0-9]+$/))){
            setErrMsg("Quantity is Required");
            return false;
        }
        else{
            setErrMsg("");
            setItemName("");
            setItemNumber("");
            setQuantity("");
            setDate("");
            return true;
        }
    }

    const handleItemRequest = (e) =>{
        // e.preventDefault();
        if(handleItemValidate()){
            const ItemRequestDataStorage = localStorage.getItem('ItemRequestDataStorage') ? JSON.parse(localStorage.getItem('ItemRequestDataStorage')) : [];
            ItemRequestDataStorage.push({
                "reqItemName" : itemName,
                "reqItemNumber" : itemNumber,
                "reqQuantity" : quantity,
                "reqDate" : date
            })
            localStorage.setItem('ItemRequestDataStorage',JSON.stringify(ItemRequestDataStorage));

            fetchItemRequest()
        }
    }

    const handleReset = () =>{
        setErrMsg("");
        setItemName("");
        setItemNumber("");
        setQuantity("");
        setDate("");
    }

    const handleItemReqSubmit = () =>{
        const ReqItemRequestData = ItemRequestDataTable;
        ReqItemRequestData.splice(0,ReqItemRequestData.length);
        localStorage.setItem('ItemRequestDataStorage',JSON.stringify(ReqItemRequestData));
        fetchItemRequest();

    }

    const fetchItemRequest = () => {
        const ItemRequestDataTable1 = localStorage.getItem('ItemRequestDataStorage') ? JSON.parse(localStorage.getItem('ItemRequestDataStorage')) : [];
        setItemRequestDataTable(ItemRequestDataTable1);
    }
    
    return (
        <div>
            <section className="container mt-5" id="itemRequestTable">
                <div className="formContent itemRequestFoCon mb-5 mt-3">
                    <table className="table table-striped table-hover cursor-pointer">
                        <tr className="ItemRequestDataStorage">
                            
                            <th>Item Number</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Expected Date</th>
                        </tr>
                        <tbody id="requestElementTableData">
                            {
                                // Array.isArray(ItemRequestDataTable) &&
                                ItemRequestDataTable.map((record,index) =>(
                                    <tr key={index}>
                                        <td>{record.reqItemNumber}</td>
                                        <td>{record.reqItemName}</td>
                                        <td>{record.reqQuantity}</td>
                                        <td>{record.reqDate}</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-end gap-3">
                    <button className="btn btn-primary" onClick={handleReset}>Reset</button>
                    <button type="button" className="btn btn-primary" onClick={handleItemReqSubmit}>Submit</button>
                </div>
            </section>
            <section className="container mt-5 mb-5">
                <div className="">
                    <form name="itemRequestForm">
                        <div className="d-flex gap-4">
                            <div className="mt-2">
                                <label for="itemRequestNumber"><b>Item Number:</b></label>
                                <input type="number"
                                    id="itemRequestNumber" name="itemRequestNumber" value={itemNumber}
                                    onChange={(e) => setItemNumber(e.target.value)}
                                    className={`formInputs ${errMsg === 'Item Number is Required' && 'border border-2 border-danger'}`} 
                                    />
                                    <span id="itemErr"></span>
                            </div>
                            <div className="mt-2">
                                <label for="itemRequestName"><b>Item Name:</b></label><input type="text"
                                    id="itemRequestName" name="itemRequestName" value={itemName} 
                                    onChange={(e) => setItemName(e.target.value)}
                                    className={`formInputs ${errMsg === 'Item Name is Required' && 'border border-2 border-danger'}`} 
                                    />
                                    <span id="nameErr"></span>

                            </div>
                            <div className="align-items-center mt-2">
                                <label for="itemRequestQuantity"><b>Quantity:</b></label><input type="number"
                                    id="itemRequestQuantity" name="itemRequestQuantity" value={quantity} 
                                    className={`formInputs ${errMsg === 'Quantity is Required' && 'border border-2 border-danger'}`} 
                                    onkeyup="validateQuantNo()"
                                    onChange={(e) => setQuantity(e.target.value)}
                                    />
                                    <span id="quantErr"></span>
                            </div>
                            <div className="d-flex flex-column mt-2">
                                <label for="itemRequestDate"><b>ExpectedDate:</b></label><input type="date"
                                    id="itemRequestDate" name="itemRequestDate" value={date} className='formInputs'
                                    onChange={(e) => setDate(e.target.value)}
                                    />
                            </div>
                            <div className='mt-4'>
                                <button type='button' className="btn btn-primary" onClick={handleItemRequest}>Add</button>
                            </div>

                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}
