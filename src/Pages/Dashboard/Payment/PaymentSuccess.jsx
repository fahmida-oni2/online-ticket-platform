import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
      const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id')
    console.log(sessionId)

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data)
            })
        }
    })
    return (
        <div>
           <p className='text-center mt-5 mb-5'>Payment Success</p>
            <div className='flex justify-center'>
                <Link to='/dashboard/trans-history' className='btn bg-sky-800 text-white rounded-2xl'>Transaction History</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;