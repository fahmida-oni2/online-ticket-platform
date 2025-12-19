import React from 'react';
import Banner from '../../Components/Banner/Banner';
import ChoosingSection from '../../Components/ChoosingSection/choosingSection';
import Guideline from '../../Components/Guideline/Guideline';
import AdvertiseTickets from '../Dashboard/AdvertiseTickets/AdvertiseTickets';
import Advertisements from '../../Components/Advertisements/Advertisements';

const Home = () => {
    return (
        <div className='text-black'>
            <section>
                <Banner></Banner>
            </section>
            <section>
               <Advertisements></Advertisements>
            </section>
            <section>
                Latest Ticket
            </section>
            <section>
               <ChoosingSection></ChoosingSection>
            </section>
            <section>
                <Guideline></Guideline>
            </section>
        </div>
    );
};

export default Home;