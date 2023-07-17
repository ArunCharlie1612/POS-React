import React from 'react'
// import InventoryForm from './InventoryForm'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import InventoryTable from './InventoryTable'

export default function Inventory() {

  // const [isUpdateClicked, setIsUpdateClicked] = useState(false);

  // const updateClicked = () => {
  //   setIsUpdateClicked(!isUpdateClicked);
  // }
  

  return (
    <div className='container'>
      <div className="row">
        <Link
          to="/"
          className='col-5'
        ><AiFillHome /></Link>
        <h3 className="col-5">Inventory</h3>
      </div>

      <div className="d-flex justify-content-end">
        <Link
          to="/InventoryForm"

        >
          <button className='btn btn-success p-1'>
            Add+
          </button></Link>
      </div>
      <div>

      </div>

      <div className=''>
        <InventoryTable />
      </div>

    </div>
  )
}
