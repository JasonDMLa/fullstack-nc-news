NC News

Description:
NC News is a full-stack web application where users can view, sort, and interact with articles on a variety of topics. Articles can be sorted by different parameters, such as date, votes, and more. Users can view detailed information for each article, including its comments, and they can interact with upvoting or downvoting the content. The project showcases front-end development using React and a back-end built with Node.js and Express.

Live Version:
[Visit the deployed version of the project here:](https://ncnewsjla.netlify.app/)

Back-End API:
The back-end for this project is built using Node.js, Express, and PostgreSQL. [You can explore the back-end repository here](https://github.com/JasonDMLa/Backend_newsAPI_project).

[The back-end API is hosted here:](https://backend-newsapi-project.onrender.com/api). It provides endpoints for articles, comments, topics, and users.

Features:
-Sorting & Filtering: Users can sort articles by various attributes such as date, votes, author, etc.
-View Articles by Topic: Browse articles filtered by different topics.
-Voting System: Upvote and downvote functionality for articles and comments.
-Commenting: Users can view, post, and delete comments under articles.

Technology Stack:

Front-End:
-React: Used for creating interactive user interfaces.
-React Router: Handles client-side routing for smooth navigation between pages.
-CSS: Custom styles for layouts and design.

Back-End:
-Node.js & Express: Handle the API and business logic.
-PostgreSQL: Stores the data for articles, comments, users, and topics.

Hosting:
-Front-End: Hosted on Netlify.
-Back-End: Hosted on Render.

Prerequisites:
-Node.js (v16 or higher)
-npm (v7 or higher)

You can check your Node version using:
-node --version

Running the Project Locally:
To run this project on your local machine, follow these steps:

1. Clone the Repository:
-git clone https://github.com/YourUsername/Frontend_repo_name.git

2. Navigate to the Project Directory:
-cd frontend-directory

3. Install Dependencies: Make sure you have all the required dependencies:
-npm install

4. Run the Project: To start the development server:
-npm start

The app should now be running at http://localhost:3000.

5. To build the project for production, run:
-npm run build

This will create a production-ready build in the build folder.

Minimum Node Version:
The application requires Node v16 or higher to run properly.

Deployment on Netlify:
To deploy the project on Netlify, follow these steps:

1. Push the code to a GitHub repository.
2. Go to Netlify, log in, and connect your GitHub repository.
3. Configure the site with:
-Build Command: npm run build
-Publish Directory: ./build
4. Deploy the site.

Acknowledgments:
This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)