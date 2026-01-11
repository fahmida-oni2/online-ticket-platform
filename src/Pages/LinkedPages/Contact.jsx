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
    <div className="h-full p-8 rounded-[2rem] border border-base-200 dark:border-white/10 bg-base-100 shadow-sm hover:shadow-xl hover:border-accent transition-all duration-300 group">
      <h3 className="text-accent text-xs font-black tracking-widest uppercase mb-4">
        {city}
      </h3>
      <p className="text-primary dark:text-white font-black text-xl mb-3 group-hover:text-accent transition-colors">{name}</p>
      <p className="text-secondary font-medium text-sm leading-relaxed whitespace-pre-line">
        {address}
      </p>
    </div>
  </motion.div>
);

const Contact = () => (
  <div className="min-h-screen bg-base-100 selection:bg-accent/30 transition-colors duration-300">
    {/* --- Corporate Head Office --- */}
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-primary text-primary-content rounded-[3rem] overflow-hidden relative shadow-2xl shadow-primary/20"
      >
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[60px] -ml-20 -mb-20"></div>
        
        <div className="relative z-10 py-20 px-8 sm:px-16 lg:px-24">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="text-center mb-16">
            <span className="text-accent font-black tracking-[0.3em] uppercase text-xs mb-4 block">Central Hub</span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
              Corporate Head Office
            </h1>
          </motion.div>

          <div className="flex flex-wrap justify-between max-w-6xl mx-auto gap-12 items-center">
            <div className="w-full lg:w-5/12 text-center lg:text-left">
              <h2 className="text-accent font-black tracking-widest mb-3 uppercase text-sm">Bangladesh HQ</h2>
              <p className="text-3xl font-black mb-6">Ticket Hub Limited</p>
              <p className="text-primary-content/80 leading-relaxed text-lg font-medium italic">
                Green View, 5th Floor, #No 23,<br /> 
                Old Airport Road, Dhaka-1200.
              </p>
            </div>
            
            <div className="w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-white/10 pt-12 lg:pt-0 lg:pl-16">
              <div className="space-y-6 text-xl text-center lg:text-left">
                <p className="flex items-center justify-center lg:justify-start gap-4">
                  <span className="text-accent font-black text-sm uppercase">Ph:</span> 
                  <span className="font-bold tracking-tight">+880 1745 203494</span>
                </p>
                <p className="flex items-center justify-center lg:justify-start gap-4">
                  <span className="text-accent font-black text-sm uppercase">Support:</span> 
                  <span className="font-bold tracking-tight">24/7 Global Access</span>
                </p>
                <div className="py-2 hidden lg:block"></div>
                <p className="text-accent font-black text-2xl underline decoration-2 underline-offset-8">
                  tickethub@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* --- Other Offices Section --- */}
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="py-24 container mx-auto "
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-4">
          Regional Hubs
        </h2>
        <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OfficeLocation
          city="Chittagong"
          name="Ticket Hub South"
          address={`JK Centre, 2nd Floor,\nKannapiran Mills Rd,\nChittagong.`}
        />
        <OfficeLocation
          city="Abdullahpur"
          name="Ticket Hub North"
          address={`Opp Doordarshan Tower,\nDrive-In Road Thaltej,\nDhaka.`}
        />
        <OfficeLocation
          city="Sylhet"
          name="Ticket Hub East"
          address={`Fortune Ambience, 2nd Floor,\nMouloviBazar, Sylhet.`}
        />
        <OfficeLocation
          city="Rajshahi"
          name="Ticket Hub West"
          address={`Modern Profound Tech Park,\nWhitefield's Road,\nRajshahi.`}
        />
      </div>
    </motion.section>

    {/* --- Enquiry Form --- */}
    <section className="py-24 bg-base-200 dark:bg-neutral/20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-base-100 rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-base-300 dark:border-white/5"
        >
          {/* Form Info Side */}
          <div className="bg-primary p-16 text-primary-content md:w-2/5 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
             <span className="text-accent font-black tracking-widest uppercase text-xs mb-4 block">Get In Touch</span>
            <h2 className="text-4xl font-black mb-6 leading-tight">Let's Talk Travel.</h2>
            <p className="text-primary-content/70 font-medium italic">
                Our support team typically responds within 2 hours for all technical and booking inquiries.
            </p>
          </div>

          {/* Actual Form */}
          <div className="p-12 md:w-3/5">
            <form className="grid grid-cols-1 gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black text-primary uppercase tracking-widest mb-3">Full Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl border border-base-300 dark:border-white/10 focus:ring-2 focus:ring-accent outline-none transition-all bg-base-200 dark:bg-neutral/40 text-base-content font-bold"  required />
                </div>
                <div>
                  <label className="block text-xs font-black text-primary uppercase tracking-widest mb-3">Email Address</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl border border-base-300 dark:border-white/10 focus:ring-2 focus:ring-accent outline-none transition-all bg-base-200 dark:bg-neutral/40 text-base-content font-bold"  required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-primary uppercase tracking-widest mb-3">Your Message</label>
                <textarea rows="4" className="w-full px-6 py-4 rounded-2xl border border-base-300 dark:border-white/10 focus:ring-2 focus:ring-accent outline-none transition-all bg-base-200 dark:bg-neutral/40 text-base-content font-bold"></textarea>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "var(--color-accent)", color: "white" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-primary text-primary-content rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all uppercase tracking-widest"
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