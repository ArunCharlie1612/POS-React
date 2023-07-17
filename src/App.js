

import './App.css';
import Home from './components/home/Home'
import { Routes,Route } from 'react-router-dom';
import Billing from './components/billing/Billing';
import Inventory from './components/inventory/Inventory';
import ItemRequest from './components/itemRequest/ItemRequest';
import SalesReport from './components/salesReport/SalesReport';
import InventoryForm from './components/inventory/InventoryForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>    
        <Route path='/Billing' element={<Billing />}/>
        <Route path='/Inventory' element={<Inventory />}/>
        <Route path='/ItemRequest' element={<ItemRequest />}/>
        <Route path='/SalesReport' element={<SalesReport />}/>
        <Route path='/InventoryForm' element= {<InventoryForm />} />
        {/* <Route path='/InventoryForm/id:' element= {<InventoryForm />} />  */}
      </Routes>
    </div>
  );
}

export default App;
