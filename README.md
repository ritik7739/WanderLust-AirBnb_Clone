# Wanderlust 

Wanderlust is a travel-focused web application inspired by the Airbnb website. It allows users to create and share listings of travel destinations, as well as review and rate these destinations. The app is built with Node.js, Express, MongoDB, and EJS, utilizing cloud storage for image uploads and implementing user authentication with Passport.js.



## Features

- **User Authentication**: Secure user registration, login, and logout functionality using Passport.js.
- **Listings Management**: Users can create, view, edit, and delete travel destination listings, including uploading images.
- **Review System**: Users can leave reviews and ratings on listings, and the authors of reviews can delete their reviews.
- **Flash Messages**: Feedback messages are displayed for user actions such as successful login, errors, etc.
- **Responsive Design**: The application is designed to be responsive and user-friendly across different devices.

## Technologies Used

- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [Passport.js](http://www.passportjs.org/) for authentication
  - [Cloudinary](https://cloudinary.com/) for image storage

- **Frontend**:
  - [EJS](https://ejs.co/) for templating
  - [Bootstrap](https://getbootstrap.com/) for styling

## Project Structure

```plaintext
Wanderlust/
├── controllers/         # Application logic and request handling
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/              # Database schemas and models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/              # Express routes for different parts of the application
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/               # EJS templates for rendering HTML
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── show.ejs
│   │   └── edit.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   └── error.ejs
├── public/              # Static files (CSS, JS, images)
├── utils/               # Utility modules (error handling, async wrapper)
├── schema.js            # Validation schemas using Joi
├── cloudConfig.js       # Cloudinary configuration for image uploads
├── middleware.js        # Custom middleware for authentication and authorization
├── app.js               # Main application entry point
├── .env                 # Environment variables
└── README.md            # Project documentation
```

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ritik7739/WanderLust-AirBnb_Clone.git
   cd Wanderlust
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   
   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   ATLASDB_URL=<your-mongodb-atlas-url>
   SECRET=<your-session-secret>
   CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUD_API_KEY=<your-cloudinary-api-key>
   CLOUD_API_SECRET=<your-cloudinary-api-secret>
   ```

4. **Run the application**:

   ```bash
   node app.js
   ```

   The application should now be running on `http://localhost:3000`.

## Usage

- **Signup/Login**: Users can sign up or log in to create listings and post reviews.
- **Create Listing**: After logging in, users can create new travel destination listings, including uploading images.
- **View Listings**: Anyone can browse the listings and view detailed information about each travel destination.
- **Review and Rate Listings**: Logged-in users can leave reviews and ratings on the listings.
- **Edit/Delete Listings**: Users can edit or delete their own listings.
- **Delete Reviews**: Review authors can delete their reviews.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue if you have any suggestions or bug reports.

## License

This project is licensed under the MIT License.

## Acknowledgements

Wanderlust is a clone project inspired by the [Airbnb](https://www.airbnb.com/) website. The project was built as a learning exercise to understand and implement key features of a modern web application.

