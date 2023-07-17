import React, { useEffect, useState } from 'react';

export default function DrinksPart({ billChange }) {
  const [InventoryFormData, setInventoryFormData] = useState(null);
  // const [BillingData, setBillingData] = useState([]);
  var itemQuantity = 1;

  const handleDrinksClick = (index) => {
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
  //   localStorage.setItem('BillingData', JSON.stringify(BillingData));
  //   // console.log(BillingData);
  //   billChange()
  // }, [BillingData])


  useEffect(() => {
    const storedInventoryData = localStorage.getItem('InventoryFormData') ? JSON.parse(localStorage.getItem('InventoryFormData')) : [];
    setInventoryFormData(storedInventoryData);

    // const storedBillingData = localStorage.getItem('BillingData') ? JSON.parse(localStorage.getItem('BillingData')) : [];
    // setBillingData(storedBillingData);
  }, []);


  return (
    <div
      className="DrinksSection d-flex flex-wrap border p-2"
      id="DrinksSection"
    >
      {/* <!-- <button className="drinksImageDiv"></button> --> */}
      {
        Array.isArray(InventoryFormData) &&
        InventoryFormData?.map((record, index) =>
          record.itemCategory === 'Drinks' ? (
            <button
              className="imgMainDiv align-items-center d-flex flex-column justify-content-center"
              key={index}
              onClick={() => handleDrinksClick(index)}
            >
              <img
                className="drinksImageStyle mt-2"
                src={record.file}
                height="50px"
                width="50px"
                alt={record.itemName}
              />
              <p className="DrinksItemName mt-2">{record.itemName}</p>
            </button>
          ) : null
        )}
    </div>
  );
}
