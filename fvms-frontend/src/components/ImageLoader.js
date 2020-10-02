import React from 'react';

const ImageLoader = ({ logo }) => (
    <div id='loader' style={{
        width: '30vw',
        height: '30vw',
        // width: '100px',
        // height: '100px',
        position: 'fixed',
        zIndex: 90000,
        background: 'white',
        top: 0,
        left: 0
    }}>
        <div 
        >
            <img className="profileImage" src={logo} alt="No img"></img>
        </div>
        {/* <img src={logo} alt="No img"></img> */}
    </div>
);

export default ImageLoader;