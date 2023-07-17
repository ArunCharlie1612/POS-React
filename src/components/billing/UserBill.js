import React, { useEffect, useState } from 'react';

export default function UserBill({ TenderSharedData,changeValue,changeValueChange,printDataId,printIDSet }) {
  const [ChangeVal, setChangeVal] = useState(0.0);
  const [AmountValue, setAmountValue] = useState(0.0);
  const [PayableValue, setPayableValue] = useState(0.0);
  const [GSTValue, setGSTValue] = useState(0.0);
  const [TenderValue, setTenderValue] = useState(0.0);


//This useEffect is for Calculating the Bill value;
  useEffect(() => {
    var BillingData = localStorage.getItem('BillingData') ? JSON.parse(localStorage.getItem('BillingData')) : [];
    var TotalPriceValue = 0.0;

    if (BillingData) {
      BillingData.forEach((record) => {
        TotalPriceValue += record.itemTotalPrice;
      });
      setAmountValue(TotalPriceValue);
    }
    debugger
    var GSTPrice = parseFloat((TotalPriceValue * 8) / 100);
    setGSTValue(GSTPrice);

    var PayableAmountValue = TotalPriceValue + GSTPrice;
    setPayableValue(PayableAmountValue);

    var TenderUpdatedValue = parseFloat(TenderSharedData) || 0; 
    setTenderValue((prevValue) => prevValue + TenderUpdatedValue);
    

    localStorage.setItem('BillingData', JSON.stringify(BillingData));
    changeValueChange();
  }, [TenderSharedData]);


  //This useEffect is for issue clearance of Change value
  useEffect(() =>{
    var BillingData = localStorage.getItem('BillingData') ? JSON.parse(localStorage.getItem('BillingData')): [];
    
    var ChangePriceValue = TenderValue - PayableValue;
    console.log({ChangePriceValue});
    // changeValueChange();
    setChangeVal(ChangePriceValue);
    localStorage.setItem('BillingData', JSON.stringify(BillingData));
    
  },[changeValueChange,TenderSharedData]);

  // const handlePrintInvoiceBill = () =>{

  useEffect(() =>{
    let idData = document.getElementById('BillInvoicePart').innerHTML;
    printIDSet(idData);
    console.log(idData)
  },[])

    

  // }
  // useEffect(() =>{
  //   let printableData = document.getElementById('BillInvoicePart').innerHTML;
  //   console.log(printableData);
  //   var BillingPrintData = window.open('', '', 'height:500', 'width:500');
  //   BillingPrintData.document.write('<html>');
  //   BillingPrintData.document.write('<body><h1>Billing Invoice is </h1><br>');
  //   BillingPrintData.document.write(printableData);
  //   BillingPrintData.document.write('</body>');
  //   BillingPrintData.document.write('</html>');
  //   BillingPrintData.document.close();
  //   BillingPrintData.print();
    
  // },[printData])


  return (
    <div id="MainBillInvoicePart" className="MainBillInvoicePart border border-dark">
      <div className="BillInvoicePart" id="BillInvoicePart">
        <div className="border border-dark border-3 invoice_header">
          <h4 className="ChangeBillingTotal">
            Change: $<span id="ChangeMainPriceValue">{(ChangeVal.toFixed(2) > 0) ? ChangeVal.toFixed(2) : 0}</span>
          </h4>
        </div>
        {/* <button onClick={handlePrintInvoiceBill}>ClickPrint</button> */}
        <div className="d-flex flex-column m-3">
          <div className="d-flex justify-content-between">
            <h6>Amount</h6>
            <p>$<span id="AmountValue">{AmountValue.toFixed(2)}</span></p>
          </div>
          <div className="d-flex justify-content-between">
            <h6>GST Amount</h6>
            <p>$<span id="GSTAmountValue">{GSTValue.toFixed(2)}</span></p>
          </div>
          <div className="d-flex justify-content-between text-danger" id="payable">
            <h5>Payable</h5>
            <p>$<span id="TotalBillAmountValue">{PayableValue.toFixed(2)}</span></p>
          </div>
          <div className="d-flex justify-content-between text-primary">
            <h6>Tender</h6>
            <p>$<span id="TenderValue">{TenderValue.toFixed(2)}</span></p>
          </div>
          <div className="d-flex justify-content-between text-primary">
            <h6>Change</h6>
            <p>$<span id="ChangePriceValue">{(ChangeVal.toFixed(2) > 0) ? ChangeVal.toFixed(2) : 0}</span></p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
