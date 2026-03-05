import React from 'react';

function LeftSection({imageURL, productName, productDesription, tryDemo, learnMore, googlePlay, appStore}) {
    return (
        <div className='container mt-5'>
            <div className='row align-items-center g-4'>
                <div className='col-12 col-lg-6 text-center'>
                    <img src={imageURL} className='img-fluid' alt={productName} />
                </div>
                <div className='col-12 col-lg-6 p-3 p-md-5 mt-0 mt-md-3'>
                    <h1>{productName}</h1>
                    <p className='text-muted'>{productDesription}</p>
                    <div className='d-flex flex-wrap gap-4'>
                    <a href={tryDemo} style={{textDecoration:"none"}}>Try Demo <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    <a href={learnMore} style={{textDecoration:"none"}}>Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                    <div className='mt-3 d-flex flex-wrap align-items-center gap-3'>
                    <a href={googlePlay}><img src="Image/googlePlayBadge.svg" alt="Google Play" /></a>
                    <a href={appStore}><img src="Image/appstoreBadge.svg" alt="App Store" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSection;
