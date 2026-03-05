import React from 'react';

function RightSection({imageURL, productName, productDesription, tryDemo, learnMore}) {
    return (
        <div className='container mt-5'>
            <div className='row align-items-center g-4'>
                <div className='col-12 col-lg-6 p-3 p-md-5 mt-0 mt-md-3'>
                    <h1>{productName}</h1>
                    <p className='text-muted'>{productDesription}</p>
                    <div>
                    <a href={learnMore} style={{textDecoration:"none"}}>Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                </div>
                <div className='col-12 col-lg-6 text-center'>
                    <img src={imageURL} className='img-fluid' alt={productName} />
                </div>
            </div>
        </div>
    );
}

export default RightSection;
