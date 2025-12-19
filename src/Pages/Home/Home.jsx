import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Guideline from '../../Components/Guideline/Guideline';
import Advertisements from '../../Components/Advertisements/Advertisements';
import LatestTickets from '../../Components/LatestTickets/LatestTickets';
import ChoosingSection from '../../Components/ChoosingSection/choosingSection';


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
                <LatestTickets></LatestTickets>
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