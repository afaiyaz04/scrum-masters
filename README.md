# IT Project COMP30022

## Project Overview
In our course we were assigned to develop a Customer Relationship Management (CRM) system. The system was built on our client’s requirements. The system will have 2 groups of users - administration and sales staff. This system has the following functions for its users:
- record and access customer information, orders, and contracts
- generate reports on clients 
- record and access sales staff information (admins only)
- transfer client orders

The system uses the OAuth2.0 internet protocol for the security of the users when logging into the system. 
All team members split into smaller functional groups in order to bring about different technologies into the system.

Confluence Documentation: https://scrummasters21.atlassian.net/wiki/spaces/TG/pages/164008/Project+Documentation

Heroku Deployment: https://comp30022-scrummaster-crm.herokuapp.com/

## Installation and Running the Application Locally
### Installing Dependencies
1. Navigate to root folder, and run the following command
`npm install`
2. Navigate to `/client` folder, and run the following command
`npm install`
### Running the app
1. Start the backend by navigating to the root folder, and run the following command
`npm run start`
2. In another terminal window, navigate to the `/client` folder, and run the following command
`npm run start`
3. The application is now running on http://localhost:3000
