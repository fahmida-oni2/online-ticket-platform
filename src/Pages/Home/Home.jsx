import React from "react";
import Banner from "../../Components/Banner/Banner";
import Guideline from "../../Components/Guideline/Guideline";
import Advertisements from "../../Components/Advertisements/Advertisements";
import LatestTickets from "../../Components/LatestTickets/LatestTickets";
import WhyUs from "../../Components/WhyUs/WhyUs";
import Faq from "../../Components/Faq/Faq";
import Blogs from "../../Components/Blogs/Blogs";

const Home = () => {
  return (
    <div className="text-black">
      <section>
        <Banner></Banner>
      </section>
      <section >
        <Advertisements></Advertisements>
      </section>
      <section>
        <LatestTickets></LatestTickets>
      </section>
      <section>
        <WhyUs></WhyUs>
      </section>
      <section>
        <Guideline></Guideline>
      </section>
      <section>
        <Blogs></Blogs>
      </section>
      <section>
        <Faq></Faq>
      </section>
    </div>
  );
};

export default Home;
