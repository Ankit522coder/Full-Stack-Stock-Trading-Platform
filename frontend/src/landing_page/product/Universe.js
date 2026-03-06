import React from 'react';

function Universe() {
    const handleSignupClick = () => {
        window.location.href = '/signup';
    };

    return (
        <div className='container mt-5'>
            <div className='row text-center'>
                <h1>The Zerodha Universe</h1>
                <p className="text-muted">Extend your trading and investment experience even further with our partner platforms</p>
    
                <div className='col-6 col-lg-4 p-3 mt-4 mt-md-5'>
                    <img src="Image/smallcaseLogo.png" className="img-fluid" style={{ width: "120px" }} alt='Smallcase' />
                    <p className="text-small text-muted">Thematic investment platform</p>
                </div>
                <div className='col-6 col-lg-4 p-3 mt-4 mt-md-5'>
                    <img src="Image/streakLogo.png" className="img-fluid" style={{ width: "120px" }} alt='Streak' />
                    <p className="text-small text-muted">Algo & strategy platform</p>
                </div>
                <div className='col-6 col-lg-4 p-3 mt-4 mt-md-5'>
                    <img src="Image/sensibullLogo.svg" className="img-fluid" style={{ width: "120px" }} alt='Sensibull' />
                    <p className="text-small text-muted">Options trading platform</p>
                </div>
                <div className='col-6 col-lg-4 p-3 mt-4 mt-md-5'>
                    <img src="Image/zerodhaFundhouse.png" className="img-fluid" style={{ width: "120px" }} alt='Zerodha Fund House' />
                    <p className="text-small text-muted">Asset management</p>
                </div>
                <div className='col-6 col-lg-4 p-3 mt-4 mt-md-5'>
                    <img src="Image/goldenpiLogo.png" className="img-fluid" style={{ width: "120px" }} alt='GoldenPi' />
                    <p className="text-small text-muted">Bonds trading platform</p>
                </div>
                <div className='col-6 col-lg-4 p-3 mt-4 mt-md-5'>
                    <img src="Image/dittoLogo.png" className="img-fluid" style={{ width: "120px" }} alt='Ditto' />
                    <p className="text-small text-muted">Insurance</p>
                </div>
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

export default Universe;


