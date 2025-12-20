**Ticket Hub - A online ticket booking platform**: TicketHub is a MERN-stack platform that simplifies travel by allowing users to search, book, and pay for bus, train and flight tickets through a secure, responsive interface.The system features a multi-role ecosystem where users track bookings with real-time countdowns, vendors manage inventory with revenue dashboards, and admins moderate the marketplace.Built for efficiency and security, it integrates Firebase authentication and Stripe payments with advanced search, filtering for a premium booking experience.

## Live Link: 
## Client:https://online-ticket-platform-vlv7.vercel.app/
## Server:https://ticket-hub-server.vercel.app/
## Server Repository:https://github.com/fahmida-oni2/online-ticket-server.git

## Key Features
### Authentication & Security
* Multi-role access control for User, Vendor, and Admin roles.
* Firebase Authentication with Email/Password and Google Login.
* JWT (JSON Web Token) implementation for secure API communication.
* Secure storage of database credentials and API keys using environment variables.
  
### User Features (Travelers)
* Search functionality based on From (Location) and To (Location).
* Filter tickets by transport type and sort by price (Low to High / High to Low).
* Ticket details page with a real-time countdown timer for departure.
* Booking system with quantity validation and "Pending" status tracking.
* Integrated Stripe payment gateway for "Accepted" bookings.
* Automated inventory reduction upon successful payment.
* Personal dashboard to track booking status and transaction history.

### Vendor Features (Travel Providers)
* Add Ticket form with multi-perk selection and ImgBB image upload.
* Manage added tickets with Update and Delete functionality.
* Verification tracking (Pending/Approved/Rejected status from Admin).
* Requested Bookings table to Accept or Reject user booking requests.
* Revenue Overview dashboard featuring interactive charts for sales and listings.
* Read-only profile view showing personal information and role.

### Admin Features (Moderators)
* Manage Tickets table to Approve or Reject vendor listings.
* Manage Users table to assign Admin/Vendor roles.
* Fraud detection system to mark vendors as "Fraud," hiding their tickets and banning future posts.
* Advertisement management to toggle featured tickets for the homepage (limit 6).
* Global site moderation and profile management.

### Technical & UI/UX Features
* Fully responsive layout for Mobile, Tablet, and Desktop.
* Light and Dark mode theme toggle.
* Global navigation with a fixed/sticky Navbar and comprehensive Footer.
* Protected private routes that maintain authentication on page reload.
* Loading spinners for data fetching and custom 404 error page for invalid routes.
* Consistent UI design with optimized color contrast and spacing.

## Installation Process:
To install and run this MERN stack project locally, follow these steps. Please note that since this is a full-stack application, you will need to set up both the **client** and the **server** repositories.

### Prerequisites
* Node.js installed on your machine.
* npm (Node Package Manager).
* A MongoDB Atlas account and a Firebase project.
* A Stripe account for payment testing.

### Server-Side Setup
* Clone the server-side repository to your local machine.
* Open the terminal in the server folder.
* Run `npm install` to install all necessary dependencies.
* Create a `.env` file in the root of the server directory.
* Add the following variables to your `.env` file:
* `DB_USER`: Your MongoDB username.
* `DB_PASS`: Your MongoDB password.
* `JWT_ACCESS_TOKEN`: A secret string for token generation.
* `STRIPE_SECRET_KEY`: Your Stripe secret key.
* Run `node index.js` or `npm start` to start the server.

### Client-Side Setup
* Clone the client-side repository to your local machine.
* Open a new terminal in the client folder.
* Run `npm install` to install all necessary dependencies.
* Create a `.env.local` file in the root of the client directory.
* Add your Firebase configuration keys and other API keys:
* `VITE_apiKey`: Your Firebase API key.
* `VITE_authDomain`: Your Firebase auth domain.
* `VITE_projectId`: Your Firebase project ID.
* `VITE_storageBucket`: Your Firebase storage bucket.
* `VITE_messagingSenderId`: Your Firebase sender ID.
* `VITE_appId`: Your Firebase App ID.
* `VITE_IMGBB_API_KEY`: Your ImgBB API key.
* `VITE_STRIPE_PUBLIC_KEY`: Your Stripe publishable key.
* Ensure the API URL in your code (usually in an Axios instance) matches your local server address (e.g., `http://localhost:5000`).
* Run `npm run dev` to start the development server.
* Open the provided local link (usually `http://localhost:5173`) in your browser.

 ## "dependencies":
   {
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "animate.css": "^4.1.1",
    "axios": "^1.13.2",
    "cally": "^0.8.0",
    "firebase": "^12.6.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-fast-marquee": "^1.6.5",
    "react-hook-form": "^7.68.0",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-responsive-carousel": "^3.2.23",
    "react-router": "^7.10.1",
    "recharts": "^3.6.0",
    "sweetalert2": "^11.26.10",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17"
  },

