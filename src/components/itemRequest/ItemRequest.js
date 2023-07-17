import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import ItemRequestTable from './ItemRequestTable'
// import DateFilter from '../common/DateFilter'

export default function ItemRequest() {
  return (
    <div className='container'>
      <div className="row">
      <Link to="/"   className="col-5">
          <AiFillHome />
        </Link>
        <h3 className="col-5">ItemRequest</h3>
      </div>
      <div className=''>
        <ItemRequestTable />
      </div>

      {/* <div>
      <DateFilter />
    </div> */}

    </div>
  )
}
