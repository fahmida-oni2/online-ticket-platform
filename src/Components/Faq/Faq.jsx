import React, { useState } from 'react';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I purchase a ticket?",
            answer: "Simply browse the 'Available Tickets' section, select your destination, and follow the secure checkout process. You will receive a digital ticket with a unique booking ID instantly via email and in your dashboard."
        },
        {
            question: "Is my payment secure?",
            answer: "Absolutely. Ticket Hub uses industry-standard SSL encryption and secure payment gateways like Stripe and SSLCommerz to ensure your financial data and personal information are always protected."
        },
        {
            question: "Can I get a refund for my ticket?",
            answer: "Refund policies depend on the transport provider and how close you are to the departure date. Most tickets are eligible for a full refund if cancelled 24 hours in advance. Check our 'Terms and Conditions' for details."
        },
        {
            question: "Do I need to print my ticket?",
            answer: "No printing required! You can simply present the digital ticket or the QR code from your mobile device at the boarding counter or station entrance."
        },
        {
            question: "What should I do if I miss my transport?",
            answer: "If you miss your scheduled departure, please contact our 24/7 customer support immediately. While tickets are usually non-refundable after departure, we can help you book the next available seat at a discounted rate."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-base-100 py-20 transition-colors duration-300">
            <div className="container mx-auto px-4 ">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-4">
                        General FAQ
                    </h2>
                    <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
                    <p className="mt-6 text-secondary font-medium">
                        Everything you need to know about booking with Ticket Hub.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                                activeIndex === index 
                                ? 'border-accent shadow-lg shadow-accent/10' 
                                : 'border-base-300 dark:border-white/10'
                            }`}
                        >
                            <button
                                className={`w-full text-left px-6 py-5 flex justify-between items-center transition-all duration-300 ${
                                    activeIndex === index 
                                    ? 'bg-primary text-primary-content' 
                                    : 'bg-base-100 hover:bg-base-200 text-base-content'
                                }`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="font-bold text-lg">{faq.question}</span>
                                <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>

                            {/* Answer Section with smooth height transition simulation */}
                            <div 
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 py-5 bg-base-200 dark:bg-neutral text-base-content border-t border-base-300 dark:border-white/5 leading-relaxed font-medium">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;