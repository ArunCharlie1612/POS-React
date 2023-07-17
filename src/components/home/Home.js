import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <div className="container-fluid d-flex flex-column mt-5">
        <div className="d-flex justify-content-center">
            <h4 className="text-dark h2 mt-3">Main Menu</h4>
        </div> 
        <div className="d-block mainMain mt-4">
            <div className="row main justify-content-center gap-5">
                <div className="col-2 text-decoration-none text-white">
                    <div className="d-flex justify-content-center align-items-center linkBox">
                      <Link to="/Billing">Billing</Link>
                    </div>
                </div>
                <div className="col-2 text-decoration-none text-white">
                    <div className="d-flex justify-content-center align-items-center linkBox">
                      <Link to="/Inventory">Inventory</Link>
                    </div>
                </div>
                <div className="col-2 text-decoration-none text-white">
                    <div className="d-flex justify-content-center align-items-center linkBox">
                      <Link to="/ItemRequest">ItemRequest</Link>
                    </div>
                </div>
                <div className="col-2 text-decoration-none text-white">
                    <div className="d-flex justify-content-center align-items-center linkBox">
                      <Link to="/SalesReport">SalesReport</Link>
                    </div>
                </div>
                
            </div>
        </div>

    </div>
  )
}
