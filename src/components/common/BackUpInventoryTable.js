import React, { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


export default function InventoryTable() {
  const [InventoryFormData, setInventoryFormData] = useState([]);
  const [salesReport, setSalesReport] = useState([]);
  // const [edited,setEdited] = useState(false);
  const [soldData, setSoldData] = useState(0);
  const [stockData, setStockData] = useState(0);
  const [clickableValue,setClickableValue] = useState(false);


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allProducts, setAllProducts] = useState([]);
  const [filterClicked, setFilterClicked] = useState(false);

  const handleSelect = (dates) => {
    const filteredProducts = allProducts.filter((filteredRecord) => {
      const InventoryFormData = new Date(filteredRecord.pdate);
      return (
        InventoryFormData >= dates.selection.startDate &&
        InventoryFormData <= dates.selection.endDate
      );
    });
    setStartDate(dates.selection.startDate);
    setEndDate(dates.selection.endDate);
    setInventoryFormData(filteredProducts);
  };




  useEffect(() => {
    // const InventoryFormData = localStorage.getItem('InventoryFormData') ? JSON.parse(localStorage.getItem('InventoryFormData')) : [];
    // setInventoryFormData(InventoryFormData);
    const InventoryData = localStorage.getItem('InventoryFormData');
    if (InventoryData) {
      const parsedInventoryReport = JSON.parse(InventoryData);
      setInventoryFormData(parsedInventoryReport);
      setAllProducts(parsedInventoryReport);
    }
    // setInventoryFormData(InventoryFormData);

    
  }, []);

  // useEffect(() => {
  //   const salesReport = localStorage.getItem('salesReport');
  //   if (salesReport) {
  //     const parsedSalesReport = JSON.parse(salesReport);
  //     setSalesReport(parsedSalesReport);
  //     localStorage.setItem('salesReport', JSON.stringify(parsedSalesReport));
  //   }
  // }, [soldData, stockData]);
  
  useEffect(() => {
    const soldData = salesReport.reduce((total, salesItem) => {
      if (salesItem.itemName === record.itemName) {
        return total + parseInt(salesItem.quantity);
      }
      return total;
    }, 0);
  
    const stockData = parseInt(record.purchased) - soldData;
  
    setSoldData(soldData);
    setStockData(stockData);
  }, [record, salesReport]);



  // useEffect(() =>{
  //   const InventoryData = localStorage.getItem('InventoryFormData') ? JSON.parse(localStorage.getItem('InventoryFormData')) : [];
  //   const salesReportData = localStorage.getItem('salesReport') ? JSON.parse(localStorage.getItem('salesReport')) : [];

  //   let CopyInventoryData = InventoryData;
  //   CopyInventoryData.forEach((record) =>{

  //   })


  // },[])

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };
  const handleFilter = () => {
    setFilterClicked(true);
  }

  const handleResetFilter = () => {
    setFilterClicked(false);
    const InventoryFormDatas = localStorage.getItem('InventoryFormData') ? JSON.parse(localStorage.getItem('InventoryFormData')) : [];
    console.log(InventoryFormDatas);
    setInventoryFormData(InventoryFormDatas);


  }
  const handleDelete = (index) => {
    debugger
    const splicedData = InventoryFormData;
    setInventoryFormData(splicedData.splice(index, 1));
  }

  // const handleEdit = () => {
  //   setIsUpdateClicked(!isUpdateClicked);
  // }
  
  const handleEdit = () => {
    // updateClicked();
    
  }
//Editable Clickable Event
  useEffect(() =>{
    setClickableValue(true)
  },[])
  
  return (
    <div>
      <div>
        {(filterClicked) ?
          (
            <div className='d-flex justify-content-evenly'>
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                className="border border-2 mb-5 d-flex justify-content-center align-items-center"
              />
              <div className='d-flex align-items-center'>
                <button onClick={handleResetFilter} className='btn btn-primary'>Reset</button>
              </div>
            </div>

          )
          :
          (<div className='d-flex justify-content-center align-items-center mb-2'>
            <button className='btn btn-primary px-5 py-1' onClick={handleFilter}>FilterData</button>
          </div>)
        }

      </div>
      <section className="container mt-4" id="dataTable">
        <div className="formContent mb-5 mt-3">

          <table className="table table-striped table-bordered table-hover cursor-pointer">
            <thead className="tableBodyData">
              <tr>
                <th className='p-2 small'>Item Number</th>
                <th className='p-2 small'>Item Name</th>
                <th className='p-2 small'>Category</th>
                <th className='p-2 small'>Item Price</th>
                <th className='p-2 small'>Purchased</th>
                <th className='p-2 small'>Sold</th>
                <th className='p-2 small'>Instock</th>
                <th className='p-2 small'>Status</th>
                <th className='p-2 small'>Item Image</th>
                <th className='p-2 small'>Actions</th>
              </tr>
            </thead>
            <tbody id="tableInventoryData" className=''>
              {Array.isArray(InventoryFormData) &&
                InventoryFormData?.map((record, index) => (
                  <tr key={index}>
                    <td>{record.itemNumber}</td>
                    <td>{record.itemName}</td>
                    <td>{record.itemCategory}</td>
                    <td>{record.price}</td>
                    <td>{record.purchased}</td>

                    {Array.isArray(salesReport) &&
                      salesReport?.forEach((salesItem) => {
                        if (salesItem.itemName === record.itemName) {
                          let soldData = 0;
                          let stockData = 0;

                          soldData += parseInt(salesItem.quantity);
                          stockData += parseInt(record.purchased) - parseInt(soldData);

                          setSoldData(soldData);
                          setStockData(stockData);
                        }
                      })}

                    {/* salesReport shows an error ---------continue */}

                    <td>{soldData}</td>
                    <td>{stockData}</td>
                    <td>{stockData > 0 ? 'Available' : 'Unavailable'}</td>
                    <td>
                      {record.file && (
                        <img src={record.file} alt="Item Image" height="50px" width="50px" className="item-image" />
                      )}
                    </td>
                    <td>
                      <div className='d-flex gap-1'>
                        <button className='btn btn-success' onClick={() => handleEdit()}>
                          <Link
                            to="/InventoryForm"
                            state={{ index: index, edit: "edit", clickableValue: clickableValue }}
                            className='text-decoration-none text-white'
                          >
                            <FiEdit2 />
                          </Link>
                        </button>
                        
                        <button className='btn btn-danger' onClick={() => handleDelete(index)}><AiFillDelete /></button>
                      </div>
                    </td>
                  </tr>

                ))}


            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}