import React from 'react';

function OpenAccount() {
    const handleSignupClick = () => {
        window.location.href = '/signup';
    };

    return ( 
        <div className='container p-3 p-md-5 mb-5'>
            <div className='row text-center'>
                <h1 className='mt-3 mt-md-5'>Open a Zerodha account</h1>
                <p className="text-muted">Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                <button
                    className='p-2 btn btn-primary fs-5 mb-5 mx-auto landing-cta'
                    onClick={handleSignupClick}
                >
                    Sign up Now
                </button>
            </div>
        </div>
     );
}

export default OpenAccount;
