import React from 'react';

function Pricing() {
    return ( 
        <div className='container'>
            <div className='row g-4 align-items-center'>
                <div className='col-12 col-lg-4'>
                    <h1 className='mb-3 fs-2'>Unbeatable pricing</h1>
                    <p className="text-muted">We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <a href='/' style={{textDecoration:"none"}}>See Pricing <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
                <div className='col-lg-1 d-none d-lg-block'></div>
                <div className='col-12 col-lg-7 mb-5'>
                    <div className='row text-center'>
                        <div className='col-12 col-sm-6 p-3 border'>
                            <h1 className='mb-3'>₹0</h1>
                            <p className="text-muted">Free equity delivery and<br/> direct mutal funds</p>
                        </div>
                        <div className='col-12 col-sm-6 p-3 border'>
                            <h1 className='mb-3'>₹20</h1>
                            <p className="text-muted">Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 );
}

export default Pricing;


