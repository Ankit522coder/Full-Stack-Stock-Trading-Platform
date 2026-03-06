import React from 'react';

function Hero() {
    const handleSignupClick = () => {
        window.location.href = '/signup';
    };

    return ( 
        <div className='container p-3 p-md-5 mb-5'>
            <div className='row text-center'>
                <img src='Image/homeHero.png' alt='Hero' className='img-fluid mb-4 mb-md-5'/>
                <h1 className='mt-3 mt-md-5'>Invest in everything</h1>
                <p className="text-muted">Online platform to invest in stocks, derivatives, mutual funds, and more</p>
                <button
                    className='p-2 btn btn-primary fs-5 mb-5 mx-auto landing-cta'
                    onClick={handleSignupClick}
                >
                    Signup Now
                </button>
            </div>
        </div>
     );
}

export default Hero;


