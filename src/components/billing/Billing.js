import React, { useState } from 'react'
import InvoiceBill from './InvoiceBill'
import CalculatorPart from './CalculatorPart'
import SnacksBar from './SnacksBar'
import DrinksPart from './DrinksPart'
import UserChange from './UserChange'
import UserBill from './UserBill'
export default function Billing() {

  //This state is for Triggering Entry
  const [billChangeState, setBillChangeState] = useState(false)

  // This state is for Togggling the Bill
  const [billDisplay, setBillDisplay] = useState(false);
  
  //This state is for TenderValue 
  const [TenderSharedData,setTenderSharedData] = useState('');
  // const [tenderSharedData1,setTenderSharedData1] = useState('');

  // const[BillID,setBillID] = useState('');
  const [changeValue,setChangeValue] = useState(false);

  //For Triggering Printing Functionality
  const [printDataId,setPrintDataId] = useState();


  //Tender value Addition Functionality its new value will shared amongst userBill and userChange
  const updateTenderSharedData = (newValue) =>{
    if(newValue === TenderSharedData) {

      setTenderSharedData('');
      const setTenderVal = setTimeout(()=> {
        setTenderSharedData(newValue);
      },0)

      return ()=> clearTimeout(setTenderVal)
    }
      else {
        setTenderSharedData(newValue);
    }

  }



  //Bill changing Functionality -- when clicking the drinks or snacks it triggers the useEffect .
  const billChange = () => {
    setBillChangeState(state => !state)
  }
  //Change Value in userBill Invoice --- it triggers the useEffect of TenderValue Calculation.
  const changeValueChange = () =>{
    setChangeValue(!changeValue);
    console.log(changeValue);
  }

  //Toggling Function for Bill
  const billShowing = () =>{
    setBillDisplay(true);
  }

  //This method is for Clearing and Creating New Bill for New Bill Button
  const newBillMethod = () =>{
    setBillDisplay(false);
  }

  const terminateBillMethod = () =>{
   setBillDisplay(false); 
  }

  const printIDSet = (inner) =>{
    setPrintDataId(inner);
  }


  const printFunctionality = () =>{
    let printableData = printDataId;
      // console.log(printableData);
      var BillingPrintData = window.open('', '', 'height:500', 'width:500');
      BillingPrintData.document.write('<html>');
      BillingPrintData.document.write('<body><h1>Billing Invoice is </h1><br>');
      BillingPrintData.document.write(printableData);
      BillingPrintData.document.write('</body>');
      BillingPrintData.document.write('</html>');
      BillingPrintData.document.close();
      BillingPrintData.print();
  }

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row">
        <div className="col-5 billingLeftPart" id="billingLeftPart">

          {
            (billDisplay) ?

              //Sharing the data from UserChange to UserBill.
              (< UserBill TenderSharedData={TenderSharedData} changeValueChange={changeValueChange} printDataId={printDataId} printIDSet={printIDSet}/>) :

              (< InvoiceBill billChange={billChangeState} />)

          }




          {/* <!-- This div is for AddItem --> */}
          <CalculatorPart billChange={billChange} />
        </div>

        <div className="col-7" style={{ paddingLeft: "0px" }}>

          {/* <!-- Image Section --> */}
          <div className="row ImagePart" style={{ marginLeft: "0px" }}>

            {/* <!-- Scrolling Part --> */}

            <SnacksBar billChange={billChange} />
            {/* <!-- End Scrolling Part --> */}

            <div className="col-10 DrinksSectionMainDiv ">

              <DrinksPart billChange={billChange} />

            </div>
          </div>

          {/* Customer Details */}
          <UserChange billChange={billChange} newBillMethod ={newBillMethod} billShowing = {billShowing} TenderSharedData={TenderSharedData} updateTenderSharedData={updateTenderSharedData}
          terminateBillMethod={terminateBillMethod} printFunctionality={printFunctionality}
          />
        </div>
      </div>
    </div>
  )
}
