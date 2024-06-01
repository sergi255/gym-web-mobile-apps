# Gym Web & Mobile Apps
Gym Web and Mobile Apps is a project that includes a web application and a mobile app to support the user during workouts at the gym. Its main functionality is to manage the calendar of workouts assigned to the user.  He or she can add workouts to the calendar along with a specific date and times to perform them. Workouts can be edited and also deleted if necessary.
The user can personalize his workouts by assigning exercises with repetitions and sets. These can be selected from a predefined database of exercises, or the user can add his own exercise and assign it to a category (body part). 
The user's account has a view of training statistics related to their account. The user can also edit his body parameters and account details.

## Server side
The server is built using Node.js and Express. It handles all backend operations such as API requests, user authentication, and data management. The server connects to a PostGreSQL database to store user information, gym workouts, user exercise etc. Key functionalities of the server include handling user authentication (login and registration), managing user calendar, managing workouts and exercises and edit his profile.

## Web Client
The web application is developed using React, providing a responsive and user-friendly interface. Users can register, log in, view his account calendar, manage trainings and exercises, display stats and edit user profile. 

## Mobile Client
The mobile application, built with React Native, supports both iOS and Android platforms. It mirrors the web application's functionalities, offering users the ability to register, log in, view his account calendar, manage trainings and exercises, display stats and edit user profile. 

## Project running
To run project run following commands:
Install dependencies for the server:
```
  cd server
  npm install 
```
Start the server:
```
  npm run dev
```
Install dependencies for the web client:
```
  cd ../client
  npm install
```
Start the web client:
```
  npm start
```
Install dependencies for the mobile:
```
  cd ../mobile
  npm install
```
Start the mobile client:
```
  npm start
```
And user need to scan QR code from your terminal using ExpoGO app.
All the commands that help namage the project are from NodeJS.
## Page screenshots
1. Training details - left side information about training (date, time), right side exercises assigned to training.
<img src = "https://github.com/sergi255/gym-web-mobile-apps/blob/main/screenshots/1.jpg" style="width: 75%; display: inline-block;"/>
2. Training form - with this form user can add or edit your training. On the left side information about training (date, time), on the right side exercises assigned to training.
<img src = "https://github.com/sergi255/gym-web-mobile-apps/blob/main/screenshots/2.jpg" style="width: 75%; display: inline-block;"/>
3. Exercise form - by this form user can add your own exercise to database. The required details are the name, category and description of the exercise.
<img src = "https://github.com/sergi255/gym-web-mobile-apps/blob/main/screenshots/3.jpg" style="width: 75%; display: inline-block;"/>
4. Stats tabke - in this table user can display information about training saved on his account.
<img src = "https://github.com/sergi255/gym-web-mobile-apps/blob/main/screenshots/5.jpg" style="width: 75%; display: inline-block;"/>
More screenshots avalaible in 'screenshots' directory.

