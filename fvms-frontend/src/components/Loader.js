import React from 'react';

const Loader = () => (
    <div id='loader' style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        zIndex: 90000,
        background: 'white',
        top: 0,
        left: 0
    }}>
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            background: "url('../../assets/astronomy.jpg')",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
        </div>
    </div>
);

export default Loader;