import React from 'react';


const OfficeLocation = ({ city, name, address }) => (
    <div className="w-full sm:w-1/2 lg:w-1/3 mb-8 px-4">
        <h3 className="text-red-600 text-lg font-semibold uppercase mb-2">
            {city.toUpperCase()}
        </h3>
        <p className="text-gray-700 font-medium mb-1">{name}</p>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {address}
        </p>
    </div>
);

const Contact = () => (
    <div className="min-h-screen bg-white mt-2">
    
        <div className="bg-gray-800 text-white py-12 px-6 sm:px-10 lg:px-20">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
                Corporate Head Office - Bangladesh
            </h1>

            <div className="flex flex-wrap justify-between max-w-6xl mx-auto">
                
                <div className="w-full lg:w-5/12 mb-8 lg:mb-0">
                    <h2 className="text-xl font-bold mb-4">BANGLADESH</h2>
                    <p className="font-medium">RailTransit Hub Limited</p>
                    <p className="mt-2 text-gray-300 leading-relaxed whitespace-pre-line">
                        Green View,
                        5th Floor, #No 23, Old Airport Road,
                        Dhaka, Bangladesh - 1200.
                    </p>
                </div>
                <div className="w-full lg:w-5/12 mt-6 lg:mt-0">
                     <div className="text-white text-base leading-relaxed">
        <p>Ph: +91 9945600000, +91 9513595131</p>
        <p className="mt-1">
            For any Support or Complaints: 
            <a href="#" className="text-red-400 hover:text-red-300 font-semibold ml-1">
                Chat with Us
            </a>
        </p>
        <p className="mt-1">Support Time: 24*7</p>
        <div className="my-4 border-t border-gray-600 w-full"></div>
        <p className="mt-4">For Any enquiries: railtransit@gmail.com</p>
       
    </div>
                </div>
            </div>
        </div>
        <div className="py-12 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
                Other Offices
            </h2>

            <div className="flex flex-wrap -mx-4">
                <OfficeLocation
                    city="Chittagong"
                    name="RailTransit Hub Limited"
                    address={`JK Centre, 2nd Floor, 5th, Kannapiran Mills Rd, Near KIA Service Centre, Chittagong.`}
                />
                <OfficeLocation
                    city="Abdullahpur"
                    name="RailTransit Hub Limited"
                    address={`Opp Doordarshan TV Tower Drive - In Road Thaltej, Abdullahpur`}
                />
                <OfficeLocation
                    city="Sylhet"
                    name="RailTransit Hub Limited"
                    address={`# 207, 2nd floor, Fortune Ambience, Near Hotel Surya,MouloviBazar,Sylhet`}
                />
                <OfficeLocation
                    city="Rajshahi"
                    name="RailTransit Hub Limited"
                    address={`iSprout Business Center Pvt Ltd 201, 2nd Floor, Modern Profound Tech Park Whitefield's Road, Rajshahi`}
                />
               
            </div>
        </div>
    </div>
);

export default Contact;