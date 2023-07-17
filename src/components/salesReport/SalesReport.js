import React, { useEffect, useState } from 'react';
// import { DateRangePicker } from 'react-date-range';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {FiRefreshCcw} from 'react-icons/fi';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file

export default function SalesReport() {

  const [salesReportData, setSalesReportData] = useState([]);
  const [custom, setCustom] = useState(false);
  const [selectedVal, setSelectedVal] = useState('Select');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    const salesReport = localStorage.getItem('salesReport') ? JSON.parse(localStorage.getItem('salesReport')) : [];
    if (salesReport) {

      setSalesReportData(salesReport);
      // setAllProducts(salesReport);
      localStorage.setItem('salesReport', JSON.stringify(salesReport));
    } else {
      setSalesReportData([]);
      // setAllProducts([]);
    }
  }, []); // Run the effect only once 


  //If Custom becomes true , The custom part will display 
  useEffect(() => {
    console.log(selectedVal);
    if (selectedVal === "Custom") {
      setCustom(true);
      const customFilteredData = salesReportData.filter((item) => {
        const fromDateVal = new Date(fromDate);
        const ToDateVal = new Date(toDate);
        const itemDate = new Date(item.date);
        return itemDate >= fromDateVal && itemDate <= ToDateVal;
      });
      setFilteredData(customFilteredData);
    }
    else if (selectedVal === "Today") {
      setCustom(false);
      const todayDate = new Date().setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
      const todayFilteredData = salesReportData.filter((item) => {
        const itemDate = new Date(item.date).setHours(0, 0, 0, 0);
        return todayDate === itemDate;
      });
      setFilteredData(todayFilteredData);
    }
    else if (selectedVal === "Yesterday") {
      setCustom(false);
      const yesterdayFilteredData = salesReportData.filter((item) => {
        const todayDate = new Date();
        const yesterdayDate = new Date(todayDate);
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yestData = yesterdayDate.toISOString().split('T')[0];
        const itemDate = item.date;
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

      const thisWeekFilteredData = salesReportData.filter((item) => {
        const itemDate = item.date;
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

      const lastWeekFilteredData = salesReportData.filter((item) => {
        const itemDate = item.date;
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

      const thisMonthFilterData = salesReportData.filter((item) => {
        const itemDate = item.date;
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

      const lastMonthFilterData = salesReportData.filter((item) => {
        const itemDate = item.date;
        console.log("Start and end date of last month is" + startMonth, endMonth);
        return itemDate >= startMonth && itemDate <= endMonth;
      });
      setFilteredData(lastMonthFilterData);
    }

    else {
      setCustom(false);
      setFilteredData(salesReportData);
    }
  }, [selectedVal, salesReportData, fromDate, toDate]);

  const handleSalesReportFilter = (e) => {
    setSelectedVal(e.target.value);
  }

  return (
    <div className="container">
      <div className="row">
        <Link to="/" className="col-5">
          <AiFillHome />
        </Link>
        <h3 className="col-5">SalesReport</h3>
      </div>



      {/* //////////////////////////////////Filter///////////////////////////////////// */}


      <div className="d-flex justify-content-center gap-5 mt-4">

        <div className="select-container">
          <span className="text-l" id="text-l">{selectedVal}</span>
          {/* <!-- <label for="inventoryFilter">Filter:</label> --> */}
          <select name="inventoryFilter" id="inventoryFilter" className="hidden-select"
            onChange={(e) => handleSalesReportFilter(e)}>

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
                onChange={(e) => setToDate(e.target.value)} 
                min={fromDate}/>
            </div>
          </div>

        </div>}
        <button className="btn btn-danger" onClick={() => {
          setCustom(true);
          setSelectedVal('select')
          setFilteredData(salesReportData);
        }
        }><FiRefreshCcw className='text-decoration-none text-white'/></button>

      </div>




      <section className="container mt-4 mainSalesContent" id="dataTable">
        <div className="formContent mb-5 mt-3 salesTableContent">
          <table className="table table-striped table-bordered table-hover cursor-pointer">
            <thead className="tableBodyData">
              <tr>
                <th className='p-2 small'>S.No</th>
                <th className='p-2 small'>Item Name</th>
                <th className='p-2 small'>Sold Quantity</th>
                <th className='p-2 small'>Total Price</th>
                <th className='p-2 small'>Date</th>
              </tr>
            </thead>
            <tbody id="tableInventoryData">
              {
                Array.isArray(filteredData) &&
                filteredData?.map((record, index) => (
                  <tr key={index}>
                    <td className='p-2 small'>{index + 1}</td>
                    <td className='p-2 small'>{record.itemName}</td>
                    <td className='p-2 small'>{record.quantity}</td>
                    <td className='p-2 small'>{record.totalPrice}</td>
                    <td className='p-2 small'>{record.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
































// const [startDate, setStartDate] = useState(new Date());
// const [endDate, setEndDate] = useState(new Date());
// const [allProducts, setAllProducts] = useState([]);

// const [filterClicked, setFilterClicked] = useState(false);

// const handleSelect = (dates) => {
//   const filteredProducts = allProducts.filter((filteredRecord) => {
//     const salesProductDate = new Date(filteredRecord.date);
//     return (
//       salesProductDate >= dates.selection.startDate &&
//       salesProductDate <= dates.selection.endDate
//     );
//   });
//   setStartDate(dates.selection.startDate);
//   setEndDate(dates.selection.endDate);
//   setSalesReportData(filteredProducts);
// };






// const handleSalesReportFilter = () => {
//   if(selectedVal ==="Custom"){
//     setCustom(true);
//   if (setCustom) {
//     // setSelectedVal("Custom");
//     alert(selectedVal);
//   }
//   }
// }
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
//   const salesRecord = localStorage.getItem('salesReport')
//     ? JSON.parse(localStorage.getItem('salesReport'))
//     : [];
//   setSalesReportData(salesRecord);
// };





{/* {filterClicked ? (
          <div className="d-flex justify-content-evenly">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              className="border border-2 mb-5 d-flex justify-content-center align-items-center"
            />
            <div className="d-flex align-items-center">
              <button onClick={handleResetFilter} className="btn btn-primary">
                Reset
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center mb-2">
            <button className="btn btn-primary px-5 py-1" onClick={handleFilter}>
              FilterData
            </button>
          </div>
        )}
      </div> */}
{/* <div>
        <div className="d-flex justify-content-center">

          <button className='btn btn-primary px-5 py-1' data-bs-toggle="modal" data-bs-target="#exampleModal">
            Filter Data
          </button>

        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

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
