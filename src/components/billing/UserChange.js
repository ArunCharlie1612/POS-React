import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function UserChange({billChange,billShowing,TenderSharedData,updateTenderSharedData,newBillMethod,terminateBillMethod,printFunctionality}) {

  // const [BillingData,setBillingData] = useState([localStorage.getItem('BillingData')]);
  const [BillingData, setBillingData] = useState(JSON.parse(localStorage.getItem('BillingData')) || []);
  // const [TenderVal,setTenderVal] = useState(0);
  
  //New Bill Function
  const handleNewBill = () =>{
    BillingData.splice(0,BillingData.length);
    setBillingData(BillingData);
    localStorage.setItem('BillingData',JSON.stringify(BillingData));
    billChange();
    newBillMethod();
  }
  //End New Bill Function

  //Passing Props And Toggle the function through parent component
  const handleShowBill = () =>{
    billShowing()
    // printableState();
  }
  //End Passing Props And Toggle the function through parent component

//Managing Tender Value
  const handleTenderval = (value) =>{
      updateTenderSharedData(value);
      console.log(value)
  }
  //End Managing Tender Value


  //Print the Bill Function
  const handlePrintBill = () =>{
    // var BillInvoicePart = updateBillID;

    //Print the Particular Part of an window ie) Bill Invoice

    // var BillingPrintData = window.open('', '', 'height:500', 'width:500');
    // BillingPrintData.document.write('<html>');
    // BillingPrintData.document.write('<body><h1>Billing Invoice is </h1><br>');
    // BillingPrintData.document.write(updateBillID);
    // BillingPrintData.document.write('</body>');
    // BillingPrintData.document.write('</html>');
    // BillingPrintData.document.close();
    // BillingPrintData.print();
    
    
    printFunctionality();
    var BillingData = JSON.parse(localStorage.getItem('BillingData')) || [];
    var salesReport = JSON.parse(localStorage.getItem('salesReport')) || [];

    BillingData.forEach((record) => {
        salesReport.push({
            "date": record.BillingDate,
            "totalPrice": record.itemTotalPrice,
            "itemName": record.itemName,
            "quantity": record.itemQuantity,
            "itemPrice": record.itemPrice
        });
    });

    localStorage.setItem('salesReport', JSON.stringify(salesReport));
    // salesReportReadData(); 
    localStorage.setItem('BillingData', JSON.stringify(BillingData));
    
    handleNewBill();
    
    // billShowing();

    // printableState(); 
    // console.log((document.getElementById('BillInvoicePart').innerHTML));
  }
  //End Print the Bill Function

  //Delete the last item of BillingData
  const handleCancelItem = () => {
    var BillingData = localStorage.getItem('BillingData') ? JSON.parse(localStorage.getItem('BillingData')) : [];
    BillingData.pop();
    localStorage.setItem('BillingData',JSON.stringify(BillingData));
    billChange();
  }
  //End Delete the last item of BillingData


  const handleTerminateBill = () =>{
    terminateBillMethod();
  }


  return (
    <div className="col-12 CustomerPart">
            <div className="AddGridContainer">
              <button className="item1 bg-orange" id="NewBill" onClick={handleNewBill}>
                New Bill
              </button>
              <button className="item2 bg-orange" onClick={() =>handleTenderval('2')} value="2">
                $2
              </button>
              <button className="item3 bg-orange" onClick={() =>handleTenderval('10')} value="10">
                $10
              </button>
              <button className="item4 bg-green">
                Open Cash Box
              </button>
              <button className="item5 bg-green">
                goods Return
              </button>
              <button className="item6 bg-green" id="cancelItem" onClick={handleCancelItem}>
                Cancel Item
              </button>
              <button className="item7 bg-green">
                Add Item
              </button>
              <button className="item8 bg-orange">
                Price Amendment
              </button>
              <button className="item9 bg-green" onClick={handleTerminateBill}>
                Terminate Transaction
              </button>
              <button className="item10 bg-green" onClick={handlePrintBill}>
                Print
              </button>
              <button className="item11 bg-orange d-flex justify-content-center gap-2" id="BillPayable"
                onClick={handleShowBill}>
                <i className="fa-solid fa-play"></i>Bill
              </button>
              <button className="item12 bg-orange" onClick={() =>handleTenderval('5')} value="5">
                $5
              </button>
              <button className="item13 bg-orange" onClick={() =>handleTenderval('50')} value="50">
                $50
              </button>
              <button className="item14 bg-orange">
                Gift Voucher
              </button>
              <button className="item15 bg-green">
                Reserved Transaction
              </button>
              <button className="item16 bg-green">
                Delete All Transaction
              </button>
              <button className="item17 bg-green">
                <Link to="/" className='text-decoration-none text-dark'>Main Menu</Link>
              </button>
              <button className="item18 bg-green">
                Restore
              </button>
            </div>

          </div>
  )
}
