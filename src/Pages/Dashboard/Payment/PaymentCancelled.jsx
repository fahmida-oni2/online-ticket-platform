import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
           <p className='text-center mt-5 font-bold mb-5'> Payment is Cancelled,please try again!</p>
            <div className='flex justify-center'>
                <Link to='/dashboard/my-tickets' className='btn bg-sky-800 text-white rounded-2xl'>Try Again</Link>
            </div>
        </div>
    );
};

export default PaymentCancelled;