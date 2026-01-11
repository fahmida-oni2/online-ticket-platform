import React, { useState } from 'react';

const Blogs = () => {
    const [activeModal, setActiveModal] = useState(null);

    const blogPosts = [
        {
            id: 1,
            title: "10 Essential Tips for Stress-Free Bus Travel",
            excerpt: "From choosing the right seat to packing the perfect carry-on, make your next long-distance bus journey comfortable.",
            description: "To ensure a stress-free bus journey, always book your tickets at least a week in advance to secure the best seats (usually middle rows for a smoother ride). Pack a small neck pillow, noise-canceling headphones, and stay hydrated. Don't forget to keep your digital ticket ready on our app for quick boarding!",
            date: "Jan 05, 2026",
            category: "Bus Guide",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            title: "Why Train Travel is the Most Scenic Way to Explore",
            excerpt: "Skip the airport lines and enjoy the view. Discover why travelers are choosing rail for their cross-country adventures.",
            description: "Train travel offers a unique perspective of the countryside that you simply can't get from 30,000 feet. Our rail partners offer panoramic windows and comfortable lounges. Pro tip: Book the morning departures to catch the most daylight and witness breathtaking sunrise views.",
            date: "Jan 08, 2026",
            category: "Rail Insights",
            image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 3,
            title: "How to Find the Best Flight Deals for Your Next Trip",
            excerpt: "Learn the secrets to booking cheap airfare, including the best days to buy tickets and how to use our platform.",
            description: "The secret to cheap flights is flexibility. Using our platform's 'Price Alert' feature allows you to track fluctuations in real-time. Statistics show that booking on Tuesdays or Wednesdays can save you up to 15%. Also, consider flying into secondary airports to slash costs.",
            date: "Jan 10, 2026",
            category: "Air Travel",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80"
        }
    ];

    return (
        <section className="py-20 bg-base-100 transition-colors duration-300">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-4">
                        Travel Insights & Guides
                    </h2>
                    <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
                    <p className="mt-6 text-secondary font-medium max-w-2xl mx-auto">
                        Expert advice and insider secrets for your next journey by road, rail, or air.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <div 
                            key={post.id} 
                            className="group flex flex-col bg-base-100 border border-base-200 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                        >
                            {/* Image Wrapper */}
                            <div className="relative h-56 overflow-hidden">
                                <img 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    src={post.image} 
                                    alt={post.title} 
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="badge badge-accent font-bold py-3 px-4 shadow-lg">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-1">
                                <p className="text-xs font-bold text-secondary tracking-widest uppercase mb-3">
                                    {post.date}
                                </p>
                                <h3 className="text-xl font-extrabold text-neutral mb-4 group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-secondary text-sm leading-relaxed mb-8 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                
                                <div className="mt-auto">
                                    <button 
                                        onClick={() => setActiveModal(post)}
                                        className="btn btn-link btn-sm p-0 no-underline text-primary hover:text-accent font-black tracking-tighter transition-all"
                                    >
                                        READ TRAVEL GUIDE 
                                        <span className="ml-2 group-hover:ml-4 transition-all">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- THEMED MODAL SECTION --- */}
            {activeModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/20 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-base-100 border border-base-200 rounded-[2.5rem] max-w-lg w-full p-10 shadow-2xl relative transform transition-all animate-in zoom-in-95 duration-300">
                        {/* Close Button */}
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="btn btn-circle btn-sm btn-ghost absolute top-6 right-6 text-neutral"
                        >
                            ✕
                        </button>

                        <div className="mb-6">
                            <span className="text-xs font-black text-accent uppercase tracking-widest block mb-2">
                                {activeModal.category}
                            </span>
                            <h3 className="text-3xl font-black text-primary leading-tight">
                                {activeModal.title}
                            </h3>
                        </div>

                        <div className="p-6 bg-secondary/5 border-l-4 border-accent rounded-r-2xl">
                            <p className="text-xs font-black text-primary uppercase mb-3 tracking-wider">
                                Expert Advice:
                            </p>
                            <p className="text-base-content leading-relaxed font-medium">
                                {activeModal.description}
                            </p>
                        </div>

                        <div className="mt-10">
                            <button 
                                onClick={() => setActiveModal(null)}
                                className="btn btn-primary w-full rounded-2xl shadow-lg shadow-primary/20"
                            >
                                Got it, thanks!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Blogs;