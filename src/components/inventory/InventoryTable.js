import React, { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {FiRefreshCcw} from 'react-icons/fi';



export default function InventoryTable() {
  const [InventoryFormData, setInventoryFormData] = useState([]); //Handling InventoryFormData LocalStorage
  const [salesReport, setSalesReport] = useState([]); //For finding stock and sold Value.
  const [soldData, setSoldData] = useState([]); //Sold Data and 
  const [stockData, setStockData] = useState([]); //Stock Data are stored in array and Retrieve it's value by its index.
  const [clickableValue, setClickableValue] = useState(false);


  const [custom, setCustom] = useState(false);
  const [selectedVal, setSelectedVal] = useState('Select');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const InventoryData = localStorage.getItem('InventoryFormData');
    if (InventoryData) {
      const parsedInventoryReport = JSON.parse(InventoryData);
      setInventoryFormData(parsedInventoryReport);
      // setAllProducts(parsedInventoryReport);
    }
  }, []);

  useEffect(() => {
    const salesReportData = localStorage.getItem('salesReport');
    if (salesReportData) {
      const parsedSalesReport = JSON.parse(salesReportData);
      setSalesReport(parsedSalesReport);
    }
  }, []);

  useEffect(() => {
    //updatedSoldData is an array which containing Total soldQuantities of each item of InventoryFormData
    const updatedSoldData = InventoryFormData.map((record) => {
      const soldQuantity = salesReport.reduce((total, salesItem) => { //Total is an accumulator(previous) Value and salesItem is an record of salesReport array
        if (salesItem.itemName === record.itemName) {
          return total + parseInt(salesItem.quantity);
        }
        return total;
      }, 0);
      return soldQuantity; //Returning an array.
    });

    
    //updatedStockData is an array which containing Total Stocks of each item of InventoryFormData
    const updatedStockData = InventoryFormData.map((record, index) => {
      const soldQuantity = updatedSoldData[index];
      const stockQuantity = parseInt(record.purchased) - soldQuantity;
      return stockQuantity;
    });

    setSoldData(updatedSoldData);
    setStockData(updatedStockData);
  }, [InventoryFormData, salesReport]);

  useEffect(() => {
    setClickableValue(true);
  }, []);


  useEffect(() => {
    console.log(selectedVal);
    if (selectedVal === "Custom") {
      setCustom(true);
      const customFilteredData = InventoryFormData.filter((item) => {
        const fromDateVal = new Date(fromDate);
        const ToDateVal = new Date(toDate);
        const itemDate = new Date(item.pdate);
        return itemDate >= fromDateVal && itemDate <= ToDateVal;
      });
      setFilteredData(customFilteredData);
    }
    else if (selectedVal === "Today") {
      setCustom(false);
      const todayDate = new Date().setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
      const todayFilteredData = InventoryFormData.filter((item) => {
        const itemDate = new Date(item.pdate).setHours(0, 0, 0, 0);
        
        return todayDate === itemDate;
      });
      setFilteredData(todayFilteredData);
    }
    else if (selectedVal === "Yesterday") {
      setCustom(false);
      const yesterdayFilteredData = InventoryFormData.filter((item) => {
        const todayDate = new Date();
        const yesterdayDate = new Date(todayDate);
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yestData = yesterdayDate.toISOString().split('T')[0];
        const itemDate = item.pdate;
        return yestData === itemDate;
      });
      setFilteredData(yesterdayFilteredData);
    }
    else if (selectedVal === "ThisWeek") {
      setCustom(false);
      const todayDate = new Date();
      const today = todayDate.getDay();
      const difference = todayDate.getDate() - today + (today === 0 ? -6 : 1);
      const start = new Date(todayDate.setDate(difference));
      const end = new Date(start.getTime());
      end.setDate(end.getDate() + 6);
      const startWeek = start.toISOString().split('T')[0];
      const endWeek = end.toISOString().split('T')[0];

      const thisWeekFilteredData = InventoryFormData.filter((item) => {
        const itemDate = item.pdate;
        console.log("itemDate is " + itemDate);
        console.log("Start and end date is " + startWeek, endWeek);
        return itemDate >= startWeek && itemDate <= endWeek;
      });

      setFilteredData(thisWeekFilteredData);
    }
    else if (selectedVal === "LastWeek") {
      setCustom(false);
      const todayDate = new Date();
      const today = todayDate.getDay();
      const difference = todayDate.getDate() - today - 7 + (today === 0 ? -6 : 1);
      const start = new Date(todayDate.setDate(difference));
      const end = new Date(start.getTime());
      end.setDate(end.getDate() + 6);
      const startWeek = start.toISOString().split('T')[0];
      const endWeek = end.toISOString().split('T')[0];

      const lastWeekFilteredData = InventoryFormData.filter((item) => {
        const itemDate = item.pdate;
        return itemDate >= startWeek && itemDate <= endWeek;
      });

      setFilteredData(lastWeekFilteredData);
    }
    else if (selectedVal === "ThisMonth") {
      setCustom(false);
      const todayDate = new Date();
      const start = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
      const end = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0);
      const startMonth = start.toISOString().split('T')[0];
      const endMonth = end.toISOString().split('T')[0];

      const thisMonthFilterData = InventoryFormData.filter((item) => {
        const itemDate = item.pdate;
        return itemDate >= startMonth && itemDate <= endMonth;
      });
      setFilteredData(thisMonthFilterData);
    }
    else if (selectedVal === "LastMonth") {
      setCustom(false);
      const todayDate = new Date();
      const start = new Date(todayDate.getFullYear(), todayDate.getMonth() - 1, 1);
      const end = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0);
      const startMonth = start.toISOString().split('T')[0];
      const endMonth = end.toISOString().split('T')[0];

      const lastMonthFilterData = InventoryFormData.filter((item) => {
        const itemDate = item.pdate;
        console.log("Start and end date of last month is" + startMonth, endMonth);
        return itemDate >= startMonth && itemDate <= endMonth;
      });
      setFilteredData(lastMonthFilterData);
    }

    else {
      setCustom(false);
      setFilteredData(InventoryFormData);
    }
  }, [selectedVal, InventoryFormData, fromDate, toDate]);

 

  const handleDelete = (index) => {
    const splicedData = [...InventoryFormData];
    splicedData.splice(index, 1);
    setInventoryFormData(splicedData);
    // localStorage.setItem('InventoryFormData',JSON.stringify(splicedData));
  };

  const handleEdit = () => {
    //updateClicked()
  };

  const handleInventoryFilter = (e) => {
    setSelectedVal(e.target.value);
  }

  return (
    <div>
      

      {/* //////////////////////////////////Filter///////////////////////////////////// */}


      <div className="d-flex justify-content-center gap-5 mt-4">

        <div className="select-container">
          <span className="text-l" id="text-l">{selectedVal}</span>
          {/* <!-- <label for="inventoryFilter">Filter:</label> --> */}
          <select name="inventoryFilter" id="inventoryFilter" className="hidden-select"
            onChange={(e) => handleInventoryFilter(e)}>

            <option>Select</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="ThisWeek">This Week</option>
            <option value="LastWeek">Last Week</option>
            <option value="ThisMonth">This Month</option>
            <option value="LastMonth">Last Month</option>
            <option value="Custom">Custom</option>

          </select>
          
        </div>

        {custom && <div id="CustomDateDiv">
          <div className="d-flex gap-3 CustomDateDiv">
            <div className="d-flex justify-content-center align-items-center gap-3">
              <label>From:</label>
              <input type="date" id="fromDate" name="fromDate" value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <label>To:</label>
              <input type="date" id="toDate" name="toDate" value={toDate}
                onChange={(e) => setToDate(e.target.value)} />
            </div>
          </div>

        </div>}
        <button className="btn btn-danger text-white" onClick={() => {
          setCustom(true);
          setSelectedVal('select')
          setFilteredData(InventoryFormData);
        }
        }><FiRefreshCcw className='text-decoration-none text-white'/></button>

      </div>



      {/* ///////////////////////////////////////Inventory table///////////////////////////// */}



      <section className='container mt-4' id='dataTable'>
        <div className='formContent mb-5 mt-3'>
          <table className='table table-striped table-bordered table-hover cursor-pointer'>
            <thead className='tableBodyData'>
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
                <th className='p-2 small'>Date</th>

              </tr>
            </thead>
            <tbody id='tableInventoryData' className=''>
              {Array.isArray(filteredData) &&
                filteredData?.map((record, index) => (
                  <tr key={index}>
                    <td className='p-2 small'>{record.itemNumber}</td>
                    <td className='p-2 small'>{record.itemName}</td>
                    <td className='p-2 small'>{record.itemCategory}</td>
                    <td className='p-2 small'>{record.price}</td>
                    <td className='p-2 small'>{record.purchased}</td>
                    <td className='p-2 small'>{soldData[index]}</td>
                    <td className='p-2 small'>{stockData[index]}</td>
                    <td className={`${stockData[index] > 0 ? 'text-success' : 'text-danger'} p-2 small`}>{stockData[index] > 0 ? 'Available' : 'Unavailable'}</td>
                    <td>
                      {record.file && (
                        <img src={record.file} alt='Item Image' height='50px' width='50px' className='item-image' />
                      )}
                    </td>
                    <td>
                      <div className='d-flex gap-1'>
                        <button className='btn btn-success p-2 small' onClick={handleEdit}>
                          <Link
                            to="/InventoryForm"

                            state={{ index: index, edit: 'edit', clickableValue: clickableValue }}

                            className='text-decoration-none text-white'
                          >
                            <FiEdit2 />
                          </Link>
                        </button>
                        <button className='btn btn-danger p-2 small' onClick={() => handleDelete(index)}>
                          <AiFillDelete />
                        </button>
                      </div>
                    </td>
                    <td className='p-2 small'>{record.pdate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div >
  );
}








{/* <div>
        <div className="d-flex justify-content-center">

          <button className='btn btn-primary px-5 py-1' data-bs-toggle="modal" data-bs-target="#exampleModal">
            Filter Data
          </button>

        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                className='border border-2 d-flex justify-content-center align-items-center w-100'
                data-bs-dismiss="modal" aria-label="Close"
              />

            </div>
            
          </div>
        </div>
      </div> */}

       // const selectionRange = {
  //   startDate: startDate,
  //   endDate: endDate,
  //   key: 'selection',
  // };

  // const handleFilter = () => {
  //   setFilterClicked(true);
  // };

  // const handleResetFilter = () => {
  //   setFilterClicked(false);
  //   const InventoryFormDatas = localStorage.getItem('InventoryFormData')
  //     ? JSON.parse(localStorage.getItem('InventoryFormData'))
  //     : [];
  //   setInventoryFormData(InventoryFormDatas);
  // };


    // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  // const [allProducts, setAllProducts] = useState([]);
  // const [filterClicked, setFilterClicked] = useState(false);

  // const handleSelect = (dates) => {
  //   const filteredProducts = allProducts.filter((filteredRecord) => {
  //     const InventoryFormData = new Date(filteredRecord.pdate);
  //     return (
  //       InventoryFormData >= dates.selection.startDate &&
  //       InventoryFormData <= dates.selection.endDate
  //     );
  //   });
  //   setStartDate(dates.selection.startDate);
  //   setEndDate(dates.selection.endDate);
  //   setInventoryFormData(filteredProducts);
  // };
