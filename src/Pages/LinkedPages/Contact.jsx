import React from "react";
import { motion } from "framer-motion";


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const OfficeLocation = ({ city, name, address }) => (
  <motion.div 
    variants={fadeInUp}
    className="w-full text-center mb-8 px-4"
  >
    <div className="h-full p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-sky-600 text-sm font-bold tracking-widest uppercase mb-3">
        {city}
      </h3>
      <p className="text-sky-900 font-bold mb-2">{name}</p>
      <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
        {address}
      </p>
    </div>
  </motion.div>
);

const Contact = () => (
  <div className="min-h-screen bg-white selection:bg-sky-100">
    {/* --- Corporate Head Office --- */}
    <div className="px-4 py-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-sky-900 text-white rounded-[2.5rem] overflow-hidden relative"
      >
        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
        
        <div className="relative z-10 py-16 px-8 sm:px-16 lg:px-24">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-extrabold text-center mb-16 tracking-tight"
          >
            Corporate Head Office
          </motion.h1>

          <div className="flex flex-wrap justify-between max-w-6xl mx-auto gap-12">
            <div className="w-full lg:w-5/12">
              <h2 className="text-sky-400 font-bold tracking-widest mb-2 uppercase text-sm">Bangladesh</h2>
              <p className="text-2xl font-bold mb-4">Ticket Hub Limited</p>
              <p className="text-sky-100/80 leading-relaxed text-lg italic">
                Green View, 5th Floor, #No 23,<br /> 
                Old Airport Road, Dhaka-1200.
              </p>
            </div>
            
            <div className="w-full  border-l border-sky-800 pl-0 lg:pl-12">
              <div className="space-y-4 text-lg">
                <p className="flex items-center gap-3">
                  <span className="text-sky-400">Ph:</span> +880 1XXX XXXXXX
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-sky-400">Support:</span> 24/7 Global Access
                </p>
                <div className="py-2 border-t border-sky-800"></div>
                <p className="text-sky-300 font-medium">tickethub@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* --- Other Offices Section --- */}
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="py-20 px-6 sm:px-10 lg:px-20  mx-auto"
    >
      <motion.h2 
        variants={fadeInUp}
        className="text-4xl font-black text-center text-sky-900 mb-16 tracking-tight"
      >
        Regional Hubs
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto ">
        <OfficeLocation
          city="Chittagong"
          name="Ticket Hub South"
          address={`JK Centre, 2nd Floor, Kannapiran Mills Rd,\nChittagong.`}
        />
        <OfficeLocation
          city="Abdullahpur"
          name="Ticket Hub North"
          address={`Opp Doordarshan TV Tower,\nDrive-In Road Thaltej.`}
        />
        <OfficeLocation
          city="Sylhet"
          name="Ticket Hub East"
          address={`Fortune Ambience, 2nd Floor,\nNear Hotel Surya, MouloviBazar.`}
        />
        <OfficeLocation
          city="Rajshahi"
          name="Ticket Hub West"
          address={`Modern Profound Tech Park,\nWhitefield's Road, Rajshahi.`}
        />
      </div>
    </motion.div>

    {/* --- Enquiry Form --- */}
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] shadow-2xl shadow-sky-900/10 flex flex-col md:flex-row overflow-hidden border border-gray-100"
        >
          {/* Form Info Side */}
          <div className="bg-sky-800 p-12 text-white md:w-1/3 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Let's Talk</h2>
            <p className="text-sky-200 text-sm">Have a specific requirement? Our technical team is ready to assist you.</p>
          </div>

          {/* Actual Form */}
          <div className="p-10 md:w-2/3">
            <form className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-sky-900 mb-2">Full Name</label>
                  <input type="text"  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 outline-none transition-all bg-gray-50" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-sky-900 mb-2">Email Address</label>
                  <input type="email" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 outline-none transition-all bg-gray-50" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-sky-900 mb-2">Message</label>
                <textarea rows="4"  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 outline-none transition-all bg-gray-50"></textarea>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-sky-800 text-white rounded-xl font-bold text-lg shadow-lg shadow-sky-900/20 hover:bg-sky-700 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Contact;