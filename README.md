# Turkish Football Platform (TFP) 
![alt text](https://github.com/SU-CS308-22FA/Team-41-Frontend/blob/main/src/assets/tfpLogo.png "Logo Title Text 1") 
# Table of contents
* [General info](#general-info)
  * [Description](#description)
  * [Contributors](#contributors)
  * [Features](#features)
* [User Documentation](#user-documentation)
  * [Install/Run](#install-/-run)
  * [Report Bug](#report-bug)
  * [Known Bugs](#known-bugs)
* [Developer Documentation](#developer-documentation)
  * [Back-end](#back-end)
  * [Front-end](#front-end)


# General Info

## Description

Turkish Football Platform is a web application created for football fans and TFF officials. This application provides various features for the users, whereas it has features for the admins that will help them to do their duties in an easier and fairer way. Our primary aim for creating this application is to provide a fair assignment system and an equitable schedule for the teams competing in Turkish Super League. In addition, we are also aiming to make football fans keep track of the league easily, and involve them in the referee assignment process. The application can be reached with the following link: [TFP Application]( https://su-cs308-22fa.github.io/Team-41-Frontend/ )

## Contributors
- Ataollah Hosseinzadeh Fard
- Emirhan Delican
- Mete Harun Akçay

## Features
Features for the users:
- Have a profile page that enables them to keep track of their activities, by creating an account.
- View Today's Matches.
- View the whole fixture of the league.
- View the results of previous matches.
- View the teams and players competing in the league.
- Get notifications before the matches of the teams that saved as "Favorite".
- View the current standings of the league.
- View the referees of the league.
- Evaluate referees by rating after matches.
- Post a comment on matches.
- Report the comments if they find it offensive/toxic.
- Send feedback about the application.


Features for admins:
- All the view features mentioned above.
- View the feedback sent by users.
- Assign referees to matches.
- Make a schedule.
- Delete reported comments if found inappropriate.

# User Documentation
## Install - Run
- The application does not require any installation to run. Users can visit: [here]( https://su-cs308-22fa.github.io/Team-41-Frontend/ ) and start their journey on the site. They firstly need to create an account, then log in with their credentials after they confirmed their account from their email accounts. At that point, users are free to benefit the various features of the app.
- If users want to install and run the software on their device, detalied information on how to do it is given in the [Developer Documentation](#developer-documentation). 
## Report Bug
We would be grateful if users report bugs/issues they found on our application. Issues can be reported on the [Issues](https://github.com/SU-CS308-22FA/Team-41-Frontend/issues) tab on the left corner of the repository navigation bar. It would be a good idea to give the details about the issue while reporting so that we can truly understand the issue and help you accordingly. A good guide about how to report issues can be found in [here]( https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html).
## Known Bugs
Moreover, you can report your issues or give feedback about the application on [CONTACT](https://su-cs308-22fa.github.io/Team-41-Frontend/feedback) TAB in the navigation bar of the application.
- Since the project is not finished, unfortunately we have some bugs. Here are some known bugs/issues for now:
  - There is no "Settings" yet.
  - The application does not work well with relatively smaller screens i.e phones, tablets.
  - A user can give multiple ratings to a referee for the same match.
  - Admin and user interfaces are not distinct.
 
# Developer Documentation
## Back-end
### Setup
- If you would like to work on the backend part of the project, you need to clone this … repository into your local machine. Before proceeding to development phase, please be make sure that you have the following dependencies installed in your machine.
  -	Jdk18
  -	Maven
  -	IntelliJ
- Although, IntelliJ is not a must it is highly recommended to use IntelliJ as an IDE, since the core development team uses it, and there might be some incompatibilities with other ides. After you set the development environment, you also need to get the project dependencies, which is inside the “pom.xml” file. Note that you need a web container to run the project on your local machine, if you are using IntelliJ, you do not need to do anything, it provides default tomcat server to run your project inside. However, if you are using other editors or ides you need to setup your environment accordingly. This project uses PostgreSQL as the database, you can either download it from web, or you may create a docker container that runs a PostgreSQL server inside. You can configure the database connection from the “application.properties” file. From this point, you can start development.
### Folder Structure
- In this kind of medium sized projects, it is crucial to keep everything maintainable, so that the development process can continue forever. Therefore, it is important to write a clean code with efficient file structure. We have used three layered structure while developing the project. The names and duties of these layers are listed below. Controller Layer: Controller layer is where we created the endpoints that receives the http requests. For instance, the controller class of the User Microservice has an endpoint “…/api/v1/users/login” attached to a method, so that whenever a post request comes to this endpoint, the attached method runs. However, the only job of this method is to forward the necessary information, such as path parameters, path variables, headers, to the service layer. Service Layer: Service layer is where the business logic is handled. It communicates with other services, interacts with the database through the singleton data access object, throws an appropriate error if necessary. Data Access Layer: Data access layer is where the interaction with the database is handled. Since the “Spring Data JPA” was used in the project, The only thing to do in this part was to create an interface and add the necessary methods inside it. For instance, when you want to find a user with its id, you create the prototype of the function inside the interface as “ User findUserById(Long id)”, the implementation of this method automatically created by Spring Data JPA. Besides these three layers, there are also two more side concepts, which are data transfer objects (DTO) and entity classes. Entity classes are where the database entities were designed with the help of annotations. For instance, if you would like a class to mapped into an entity in the database you need to put “@Entity” annotation above the class. It is also possible to manage primary keys, foreign keys, nullability and many more with the annotations. Moreover, the DTO’s are necessary to prevent a security breach, when 21 responding back to outside world. For instance, if an entity class has an attribute that should not be seen by anyone, then the response cannot be an instance of that entity class. There should be another class without that attribute, and the object to be returned should be an instance of this class. This was the general structure of our backend application developed in this project.

### Deployment
- The deployment of the backend application is done through Heroku. Heroku provides a very easy user experience for deployment, most of the complicated stuff are automatically handled within the Heroku environment. You do not even need create a jar file yourself, you attach your github repository and simply click deploy. Heroku detects the requirements and creates an environment to run your code. It even handles the database connection automatically. That is simply how we deployed our backend application to a remote server.

## Front-end
### Setup
- As a developer, if you would like to work on the front-end part of this project, the first thing you should do is to clone this repository into your local machine. In that way, you will have access to the codebase, and you can modify it as you wish. However, before you proceed to development phase, make sure that you have the required dependencies. The required dependencies as follows.
  -	Node.js
  -	Vue3
  -	VueRouter
- After you installed these dependencies, you also need to get the project dependencies. In order to do that, you need to open a terminal in your project folder and type command “npm install”. After this, you are ready to build and run the project. To do that, again using the terminal type the command “npm run serve”, this will automatically build and run the project on port 8080 default. 

### Folder Structure


### Deployment 

