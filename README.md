# e-Portfolio
This project is currently deployed on http://www.myeportfolio.net.

## Tech Stack:
* SpringBoot
* Lombok
* Spring Data JPA
* MySQL
* H2 in-memory DB
* Angular 9
* Ngx Formly
* Bootstrap
* NG-ZORRO
* TypeScript
* HTML
* CSS

## Topics
1. Project scope
2. How to run the application
3. How to access the application
4. The general page breakdown
5. Advantages of the application

## Project scope

### User
* Sign up and login.
* Manage account infomation.
* Create and edit a resume.
* Set the resume private or public.
* Create a shared link so that others can find and view his resume.
### Guest
* Browse and view public resumes.
* Filter and sort resumes.
* View private resumes through shared links.
### Admin
* Browse and view all resumes.
* Search users by username.
* Edit all resumes.
* Delete users.

## How to run this application
* Navigate to the folder /e-portfolio/eportfolio-api under the command line
* Run the command to build the back-end program: **gradle clean build**
* Run the command to start the back-end server: **java -jar ./build/libs/eportfolio-api-0.0.1-SNAPSHOT.jar**
* Navigate to the folder /e-portfolio/eportfolio-ui under the command line
* Run the command to install npm: **npm install**
* Run the command to start the front-end server: **ng serve**

## How to access the application
* You may access the website by accessing below url once the application is up and running.
* http://localhost:4200/
* There is a default admin account. Username: admin, password: 123456.

## The general page breakdown
- Welcome page (URL: /#/, /#/welcome )
    - List of guide images
    - Sign in/Sign up button
    - Explore button
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Uses JWT (store the token in localStorage)
- CV page (URL: /#/cv )
    - List of user CV items
    - CRUD user CV items
    - CV share link button
- My account page (URL: /#/my_account )
    - RUD account information (no creating required)
- Security page (URL: /#/security )
    - private/public setting button
    - change password button
- Explore page (URL: /#/explore )
    - List of industry Fields for filtering cv
    - List of gender choices for filtering cv
    - List of public CV introductions
    - List of choices for ordering cv
- CV show page (URL: /#/cv-show?link=:userid, /#/cv-show?link=:token )
    - CV display page

## Advantages of this application
* The back-end code follows the concept of aspect-oriented programming. 
* The back-end server is stateless using JWT, easy to be auto-scaled and load balanced. 
* Using java generics in back-end programming for all one-to-many user data, so that adding a user-to-many data type only needs to add one Java class without changing anything in controller, service, or repository. 
* User identity JWT and share link use asymmetric encryption, so that a server other than the token-issuing server can verify the token by itself. 
* The share link is secure, containing the permission to view a certain resume with a valid time, and cannot be forged. 
* The front-end uses Ngx Formly and combines it with modal component to deal with lots of business logic of using the dynamic form, simplified a lot of similar code of handling form events and styles. 
* The front-end customizes communication service between components using RxJS based on publish/subscribe model. 
