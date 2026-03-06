import React from 'react';

function Hero() {
    return (
        <section className='container-fluid' id="supportHero">
           <div className="container py-4 py-md-5">
             <div id="supportWrapper" className="mb-4">
               <h4 className='mb-0'>Support Portal</h4>
               <a href="/">Track Tickets</a>
             </div>
             <div className="row g-4">
                <div className="col-12 col-lg-7">
                    <h1 className="fs-3">Search for an answer or browse help topics to create a ticket</h1>
                    <input placeholder="E.g: how do I activate F&O, why is my order getting rejected.." className="mt-3 mb-3" />
                    <div className='support-links'>
                        <a href="/" className="me-3">Track account opening</a>
                        <a href="/" className="me-3">Track segment activation</a>
                        <a href="/" className="me-3">Intraday margins</a>
                        <a href="/" className="me-3">Kite user manual</a>
                    </div>
                </div>
                <div className="col-12 col-lg-5">
                    <h1>Featured</h1>
                    <ol>
                        <li><a href="/">Current Takeovers and Delisting - January 2026</a></li>
                        <li><a href="/">Latest Intraday leverages - MIS & CO</a></li>
                    </ol>
                </div>
             </div>
           </div>
        </section>
    );
}

export default Hero;


