import React from 'react';
import {ICause} from '../../App';

interface IProps {
    cause: ICause;
}

const SingleCause = ({cause}: IProps) => {

    return (
        <div className='cause'>
            <div className='cause-name'>
                <h4>{cause.name}</h4>
            </div>
            <div className='cause-details'>
                
                <p className='cause-address'>{cause.address}</p>
            </div>
            <div className='cause-links'>
                <button className='btn'><a href={cause.details_url} rel="noreferrer" target='_blank' >Details</a></button>
                <button className='btn'><a href={cause.join_url} rel="noreferrer" target='_blank' >Join</a></button>
            </div>
        </div>
    );
}

export default SingleCause;