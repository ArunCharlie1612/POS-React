

import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function DateFilter() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allProducts, setAllProducts] = useState([]);
  const [salesReportData, setSalesReportData] = useState([]);

  const handleSelect = (dates) => {
    const filteredProducts = allProducts.filter((filteredRecord) => {
      const salesProductDate = new Date(filteredRecord.date);
      return (
        salesProductDate >= dates.selection.startDate &&
        salesProductDate <= dates.selection.endDate
      );
    });
    setStartDate(dates.selection.startDate);
    setEndDate(dates.selection.endDate);
    setSalesReportData(filteredProducts);
  };

  useEffect(() => {
    const salesReport = localStorage.getItem('salesReport');
    if (salesReport) {
      const parsedSalesReport = JSON.parse(salesReport);
      setSalesReportData(parsedSalesReport);
      setAllProducts(parsedSalesReport);
    }
  }, []);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  return (
    <div className="container">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        className="border border-2 mb-5"
      />
      <section className="container mt-4" id="dataTable">
        <div className="formContent mb-5 mt-3">
          <table className="table table-striped table-hover cursor-pointer">
            <thead className="tableBodyData">
              <tr>
                <th>S.No</th>
                <th>Item Name</th>
                <th>Sold Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody id="tableInventoryData">
              {salesReportData.map((record, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{record.itemName}</td>
                  <td>{record.quantity}</td>
                  <td>{record.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}