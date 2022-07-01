import React from 'react';

const Cause = ({cause}) => {

    return (
        <div className='cause'>
            <div className='cause-name'>
                <h4>{cause.name}</h4>
            </div>
            <div className='cause-details'>
                
                <p className='cause-address'>{cause.address}</p>
            </div>
            <div className='cause-links'>
                <button className='details-btn'>Details</button>
                <button className='details-btn'>Join</button>
            </div>
        </div>
    );
}

export default Cause;