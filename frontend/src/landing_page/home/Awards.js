import React from 'react';

function Awards() {
    return (
        <div className='container mb-5'>
            <div className='row align-items-center g-4'>
                <div className='col-12 col-lg-6 p-3 p-md-5'>
                    <img src='Image/largestBroker.svg' alt='Largest broker' className='img-fluid'/>
                </div>
                <div className='col-12 col-lg-6 p-3 p-md-5 mt-0 mt-md-3'>
                    <h1>Largest stock broker in India</h1>
                    <p className='mb-5 text-muted'>2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
                    <div className='row text-muted'>
                        <div className='col-12 col-sm-6'>
                            <ul>
                        <li>
                            <p>Futures and Options</p>
                        </li>
                        <li>
                            <p>Commodity derivatives</p>
                        </li>
                        <li>
                            <p>Currency derivatives</p>
                        </li>
                    </ul>
                        </div>
                        <div className='col-12 col-sm-6'>
                            <ul>
                        <li>
                            <p>Stocks & IPOs</p>
                        </li>
                        <li>
                            <p>Direct mutual funds</p>
                        </li>
                        <li>
                            <p>Bonds and Govt. Securities</p>
                        </li>
                    </ul>
                        </div>
                    </div>
                    <img src='Image/pressLogos.png' alt='Press logos' className='img-fluid'/>
                </div>
            </div>
        </div>
    );
}

export default Awards;
