import React, { useEffect, useState } from 'react'

export default function CalculatorPart({ billChange }) {

    const [errMsg, setErrMsg] = useState("");
    const [InventoryFormData, setInventoryFormData] = useState();
    // const [itemNo,setItemNo] = useState("");
    const [input, setInput] = useState({
        itemNo: '',
        quantity: 0,
        tableNo: '',
        noc: ''
    })
    // const [quantity,setQuantity] = useState("");
    const [idunique, setIdUnique] = useState("");
    var itemQuantity = 1;

    const handleClick = () => {
        if (!input?.itemNo || (!input?.itemNo.match(/^[0-9]+$/))) {
            setErrMsg("ItemNumber is Required");
            return false;
        }
        else if (!input?.quantity || (!input?.quantity.match(/^[0-9]/))) {
            setErrMsg("Quantity is Required");
            return false;
        }
        else {
            setErrMsg("");
            setInput(state => ({
                ...state,
                itemNo: '',
                quantity: 0,
                noc: '',
                tableNo: ''
            }))
            return true;
        }
    }

    const handleAddSubmit = () => {
        if (handleClick()) {
            InventoryFormData?.map((record) => {

                {
                    if (record.itemNumber === input.itemNo) {
                        console.log(record.itemNo)
                        let BillingData = [];
                        BillingData = localStorage.getItem('BillingData') ? JSON.parse(localStorage.getItem('BillingData')) : [];
                        let currentDate = new Date().toJSON().slice(0, 10);

                        var existingItem = BillingData.find((item) => item.itemNo === input.itemNo);
                        if (existingItem) {
                            // let CopyBillingData = BillingData;
                            // CopyBillingData?.forEach((itemsRecord) => {
                                existingItem.itemQuantity += parseInt(input.quantity);
                                existingItem.itemTotalPrice = parseInt(existingItem.itemQuantity) * parseInt(existingItem.itemPrice);
                            // });
                            billChange();
                            localStorage.setItem('BillingData', JSON.stringify(BillingData));
                        }
                        else {
                            BillingData.push({
                                "itemName": record.itemName,
                                "itemNo" : record.itemNumber,
                                "itemQuantity": parseInt(input.quantity),
                                "itemPrice": parseInt(record.price),
                                "itemTotalPrice": parseInt(input.quantity) * parseInt(record.price),
                                "BillingDate": currentDate,
                            });
                            billChange();
                            localStorage.setItem('BillingData', JSON.stringify(BillingData));
                        }
                    }
                }
            });


        }
    }

    //Focus Functionality
    const handleClickButton = (e) => {
        setInput(state => ({
            ...state,
            [idunique]: state[idunique] + e.target.value
        }))
    }
    //Refer this.............................................||

    const onInputChange = (e) => {
        setInput(state => ({
            ...state,
            [e.target.id]: e.target.value
        }))
    }

    //Clear Button Functionality
    const handleCalClear = () => {
        setInput({
            itemNo: '',
            quantity: '',
            tableNo: '',
            noc: ''
        })
    }

    //AC Button Functionality
    const handleFocusClear = (e) => {
        setInput(state => ({
            ...state,
            [idunique]: ''
        }))
    }

    useEffect(() => {
        const InventoryFormData = localStorage.getItem('InventoryFormData') ? JSON.parse(localStorage.getItem('InventoryFormData')) : [];
        setInventoryFormData(InventoryFormData);
    }, []);


    return (
        <div>
            <div className="d-flex flex-column gap-2">
                {/* <!-- UpperPart --> */}
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column">
                        <label className="text-primary">Item Number</label>
                        <input type="number" id="itemNo" name="AddPartItemNumber" value={input.itemNo}
                            className={`formInputs h-50 w-75 ${errMsg === 'ItemNumber is Required' && 'border border-2 border-danger'}`}
                            onChange={(e) => onInputChange(e)}

                            onFocus={(e) => setIdUnique(e.target.id)}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label className="text-primary">Quantity</label>
                        <input type="number" id="quantity" name="AddPartQuantity" value={input.quantity}
                            className={`formInputs h-50 w-75 ${errMsg === 'Quantity is Required' && 'border border-2 border-danger'}`}
                            onChange={(e) => onInputChange(e)}

                            onFocus={(e) => setIdUnique(e.target.id)}
                        />
                    </div>
                    <div><button className="btn btn-primary border-dark mt-3 px-2 py-1" onClick={handleAddSubmit}>Add</button></div>
                </div>
                {/* <!-- End UpperPart --> */}

                {/* <!-- LowerPart --> */}

                <div>
                    <div className="row justify-content-between mt-3">
                        <div className="col-3">
                            <button className="btn btn-primary px-1 py-1">Language</button>
                            <div className="d-flex flex-column justify-content-between gap">
                                <label className="text-primary small">Table No</label>
                                <input type="number" name="AddParttableName" id="tableNo" className="w-100"
                                    value={input.tableNo}
                                    onChange={(e) => onInputChange(e)}
                                    onFocus={(e) => setIdUnique(e.target.id)}
                                />
                                <label className="text-primary small">No of Cover</label>
                                <input type="number" name="AddPartCover" id="noc" className="w-100" value={input.noc}
                                    onChange={(e) => onInputChange(e)}
                                    onFocus={(e) => setIdUnique(e.target.id)}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row mt-2 gy-1 justify-content-center align-items-center">
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        onClick={(e) => handleClickButton(e)} value="7">7</button>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        onClick={(e) => handleClickButton(e)} value="8">8</button>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        onClick={(e) => handleClickButton(e)} value="9">9</button>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        onClick={(e) => handleClickButton(e)} value="4">4</button>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        onClick={(e) => handleClickButton(e)} value="5">5</button>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        onClick={(e) => handleClickButton(e)} value="6">6</button>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        onClick={(e) => handleClickButton(e)} value="1">1</button>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        onClick={(e) => handleClickButton(e)} value="2">2</button>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        onClick={(e) => handleClickButton(e)} value="3">3</button>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        onClick={(e) => handleClickButton(e)} value="0">0</button>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        value=".">.</button>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary border-dark AddPartCalButton px-3 ButtonInputValue"
                                        value="-">-</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="d-flex flex-column justify-content-between gap-3">
                                <button className="btn btn-primary border-dark AddPartCalButton p-3"
                                    onFocus={handleFocusClear}>AC</button>
                                <button className="btn btn-primary border-dark AddPartCalButton p-3"
                                    onClick={() => handleCalClear}>Clear</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- End LowerPart --> */}

            </div>
        </div>
    )
}
