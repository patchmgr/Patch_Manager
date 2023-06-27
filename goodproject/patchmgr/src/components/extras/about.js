import React from 'react';

import block from '../images/blockchain.jpg'


const AboutPage = () => {    
    return (
        <>
            <div className=' container textcenter'>
                <div>
                    <p>about page and value is</p>
                    
                </div>
                

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">Block Chain <span
                            className="text-muted">It’ll blow
                            your mind.</span></h2>
                        <p className="lead">Some great placeholder content for the first featurette here. Imagine some exciting
                            prose
                            here.</p>
                    </div>
                    <div className="col-md-5">
                        <img src={block} alt="none" width="450px" height="300px" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                    </div>
                </div>

                <br /><br /><br />
                <hr /><br />
            </div>

        </>
    );
};

export default AboutPage;