// import { ready } from 'jquery';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';


export default function InventoryForm() {

    const location = useLocation();
    const { index, edit,clickableValue } = location.state ?? {};

    const [itemName, setItemName] = useState('');
    const [itemNo, setItemNo] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [purchased, setPurchased] = useState(0);
    const [pdate, setPDate] = useState('');
    const [itemFile, setItemFile] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [itemCategory, setItemCategory] = useState('');

    useEffect(() => {
        if (edit) {
            const InventoryFormData = localStorage.getItem('InventoryFormData') ? JSON.parse(localStorage.getItem('InventoryFormData')) : [];
            setItemName(InventoryFormData[index].itemName);
            // console.log(index);
            // console.log(InventoryFormData[index]);
            setItemNo(InventoryFormData[index].itemNumber);
            setItemCategory(InventoryFormData[index].itemCategory);
            setItemPrice(InventoryFormData[index].price);
            setPurchased(parseInt(InventoryFormData[index].purchased)); //For String Issue
            setPDate(InventoryFormData[index].pdate);
        }
    }, [index, edit]);

    const handleUpdate = () => {
        const InventoryFormData = localStorage.getItem('InventoryFormData') ? JSON.parse(localStorage.getItem('InventoryFormData')) : [];
        InventoryFormData[index].itemName = itemName;
        InventoryFormData[index].itemNumber = itemNo;
        InventoryFormData[index].itemCategory = itemCategory;
        InventoryFormData[index].price = itemPrice;
        InventoryFormData[index].purchased = parseInt(purchased); //For String Issue
        InventoryFormData[index].pdate = pdate;
        localStorage.setItem('InventoryFormData', JSON.stringify(InventoryFormData));

    }

    const handleClick = () => {
        if (!itemName || !itemName.match(/^[A-Za-z]+$/)) {
            setErrMsg('ItemName is Required');
            return false;
        } else if (!itemNo || !itemNo.match(/^[0-9]+$/)) {
            setErrMsg('ItemNumber is Required');
            return false;
        } else if (!itemPrice || !itemPrice.match(/^[0-9]+$/)) {
            setErrMsg('ItemPrice is Required');
            return false;
        } else if (!purchased || !purchased.match(/^[0-9]+$/)) {
            setErrMsg('Purchased is Required');
            return false;
        } else if (!pdate) {
            setErrMsg('Date is Required');
            return false;
        } else if (!itemFile) {
            setErrMsg('File is Required');
            return false;
        } else if (!itemCategory) {
            setErrMsg('Item Category is Required');
            return false;
        } else {
            setErrMsg('');
            setItemName('');
            setItemNo('');
            setItemPrice('');
            setPDate('');
            setPurchased('');
            setItemCategory('');
            setItemFile('');
            return true;
        }
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (handleClick()) {
            const handleImage = itemFile;
            const reader = new FileReader();

            if (handleImage) {
                reader.onload = (event) => {
                    const ImageURL = event.target.result;
                    const purDate = new Date(pdate).toJSON().slice(0,10);
                    debugger
                    const InventoryFormData = localStorage.getItem('InventoryFormData') ? JSON.parse(localStorage.getItem('InventoryFormData')) : [];
                    // let itemNoVal = itemNo;
                    var existingItem = InventoryFormData.find((record) => parseInt(record.itemNumber) === parseInt(itemNo));
                    if (existingItem) {
                        let existPurchasedVal = parseInt(existingItem.purchased);
                        existPurchasedVal += parseInt(purchased);
                        existingItem.purchased = existPurchasedVal;
                        existingItem.pdate = purDate;
                    }

                    else {
                        InventoryFormData.push({
                            itemName: itemName,
                            itemNumber: itemNo,
                            price: itemPrice,
                            purchased: purchased,
                            itemCategory: itemCategory,
                            pdate: purDate,
                            file: ImageURL,
                        });
                    }

                    localStorage.setItem('InventoryFormData', JSON.stringify(InventoryFormData));
                }
            }

            reader.readAsDataURL(handleImage);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center mt-1'>
            <form
                className="d-flex justify-content-center flex-column text-white p-4 rounded rounded-lg exampleForm"
                style={{ backgroundColor: '#222428', width: '400px' }}

            >
                <div className='d-flex justify-content-end align-items-center cursor-pointer'>
                    <Link to="/Inventory" className='text-decoration-none text-white'><AiFillCloseCircle style={{fontSize:"20px"}}/></Link>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <label htmlFor="itemName" className="form-label">
                            ItemName:
                        </label>
                        <input
                            className={`formInputs form-control ${errMsg === 'ItemName is Required' && 'border border-2 border-danger'
                                }`}
                            name="itemName"
                            id="itemName"
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>
                    <div className="p-2">
                        <label htmlFor="itemNo" className="form-label">
                            itemNo:
                        </label>
                        <input
                            className={`formInputs form-control ${errMsg === 'ItemNumber is Required' && 'border border-2 border-danger'
                                }`}
                            name="itemNo"
                            id="itemNo"
                            type="number"
                            value={itemNo}
                            onChange={(e) => setItemNo(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="itemCategory" className="form-label">
                        Item Category
                    </label>
                    <div className="d-flex justify-content-evenly">
                        <div className="form-check d-flex gap-2" style={{ height: '10px' }}>
                            <input
                                className={`formInputs form-control form-check-input`}
                                name="itemCategory"
                                id="Snacks"
                                type="radio"
                                value="Snacks"
                                checked={itemCategory === 'Snacks'}
                                onChange={(e) => setItemCategory(e.target.value)}
                            />
                            <label className="form-check-label">Snacks</label>
                        </div>
                        <div className="form-check d-flex gap-2">
                            <input
                                className={`formInputs form-control form-check-input`}
                                name="itemCategory"
                                id="Drinks"
                                type="radio"
                                value="Drinks"
                                checked={itemCategory === 'Drinks'}
                                onChange={(e) => setItemCategory(e.target.value)}
                            />
                            <label className="form-check-label">Drinks</label>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <label htmlFor="itemPrice" className="form-label">
                            ItemPrice:
                        </label>
                        <input
                            className={`formInputs form-control ${errMsg === 'ItemPrice is Required' && 'border border-2 border-danger'
                                }`}
                            name="itemPrice"
                            id="itemPrice"
                            type="number"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                        />
                    </div>
                    <div className="p-2">
                        <label htmlFor="purchased" className="form-label">
                            No.of Purchased:
                        </label>
                        <input
                            className={`formInputs form-control ${errMsg === 'Purchased is Required' && 'border border-2 border-danger'
                                }`}
                            name="purchased"
                            id="purchased"
                            type="number"
                            value={purchased}
                            onChange={(e) => setPurchased(e.target.value)}
                        />
                    </div>
                </div>
                <div className="p-2">
                    <label htmlFor="pdate" className="form-label">
                        Purchasing Date:
                    </label>
                    <input
                        className={`formInputs form-control ${errMsg === 'Date is Required' && 'border border-2 border-danger'
                            }`}
                        name="pdate"
                        id="pdate"
                        type="date"
                        value={pdate}
                        onChange={(e) => setPDate(e.target.value)}
                    />
                </div>
                <div className="p-2">
                    <label htmlFor="itemFile" className="form-label">
                        Item Image:
                    </label>
                    <input
                        className={`formInputs form-control ${errMsg === 'File is Required' && 'border border-2 border-danger'
                            }`}
                        name="itemFile"
                        id="itemFile"
                        type="file"

                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setItemFile(file);
                            }
                        }}

                    />
                </div>

                {/* Contiinue with herrre.............. */}
                <div className="p-2">
                    {(clickableValue===true) ? (
                        <Link to="/Inventory">
                            <button className="btn btn-success" onClick={handleUpdate}>
                                Update
                            </button>
                        </Link>
                    ) : (   
                        <Link to="/Inventory">
                            <button className="btn btn-success" onClick={handleFormSubmit}>
                                Submit
                            </button>
                        </Link>
                    )}
                </div>

            </form>
        </div>
    );
}
