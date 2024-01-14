# portal

This application acts a portal for user signup and login and is built with Express (Node.js). It uses RESTful architechture. Within the models folder, there is a file named database.js that contains an object that houses all the users that have signed up to the portal.

This app starts a server and listens on port 8081 for connections. Load http://localhost:8081/ in a browser to see the output of the simple home screen. 

User signup (http://localhost:8081/signup) :
When a user is in the signup page and submits their email and password, the server checks against the existing database to confirm the email is unique and a user with the same email has not previously signed up. If unique, the user's email and a hashed version of their password is stored into the database file object. The application hashes passwords with the help of the 'bcrypt' library. 

User login (http://localhost:8081/login) : 
When a user attempts to login with an email and password on the login page, the server checks against the existing database. If no database entry exists with the inputted email and password, an error message will display. Otherwise, the application will take the user to the 'secret' webpage, only for authenticated users.

Authenticated users (http://localhost:8081/secret) :
When a user successfully logs in, the server create a cookie and stores a JSON web token (JWT) within that cookie on the user's browser. The JWT contains encoded data (with the user's ID) that identifies the unique user. So as long as the JWT is valid within the user's browser, the user will not need to log in again and has access to all secret pages. Using EJS as the template engine, the application also prints a unique welcome message, including the user's email on the secret page. 

Log out : 
When a user is logged in and then logs out, the user's cookie (and the attached JWT) shortly becomes invalid, requiring users to log in with their unique email and password again to access the secret page. 
