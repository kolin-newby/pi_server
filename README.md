# pi_server
server on raspberry pi for traffic_data_app

Sound Traffic Reporting Project - CSCI 3308 | Group 111-4

Bennett Miller, Kolin Newby, Aidan O’Connor, Sam Sly, Ria Thakkar, Yi Wu

The goal of this project is to create software that will collect data on the decibal volume of a given location and display said data
to the user of the software via a web interface.

The practical use of this software would be to allow a given user to determine the traffic/business of a given area in order to inform
there decision on where to go.

The target user of this software, in our case, would be college students looking for the quietest places to study on campus; however,
this software would be applicable to many other use cases, such as street traffic in a city or the sound traffic in any business location.

File Structure: The files are layed out the same way they are layed out on the raspberry pi-server

Folders
Project Milestones - contains all the milestones for the project
database - contains the initial initialization file for the sql database
resources - contains the js and css files for the website
views - contains the pug files for the home page as well as unfinished pug files

Files
server.js - the server file for running the server
demo.mp4 - a minute long demo of the app running

Building/Running

All that needs to be done to start the server is to start postgreSQL in the background (as we did in lab 7) and start the server.js file
by typing "node server.js". Once the command line prompt "listening on port 2048" appears you can go to busybuffs.com to view the page
