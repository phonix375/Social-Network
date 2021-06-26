
  # Social-Network back-end
  ## Description
  This is a rest API for a social network including routes for management of users, thoughts(post), and comments on thoughts. This project is written in node.js using a MongoDB database and mongoose as a controller.
  ## Table of content
  * [Discreption](#Description)
* [Installation](#Installation)
* [Contributing](#Contributing)
* [How to use](#use)
* [Contact](#Contact)
  ## Installation
After copying the repo to a local computer or hosting location, in the project root folder, you will need to install the dependencies by typing "npm install", after the installation make sure you have a running MongoDB database and run the server by typing "node server.js"
  
  MIT

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


  ## use


 This app has 2 main modules: users and thoughts and it's working with restful API standards with the following routes:

  /api/users  - a post request to this route will create a user and a get request will return all users
  /api/users/<id> -  a get request to this route will return a single user with provided id, put request will update the user and a delete request will delete the user with this ID
  /api/users/<userId>/friends/<friendId> - this route can accept post to add a user as a friend to another user and delete request to remove the user from the friend list of the other user
  /api/thoughts - this route will control the thoughts, so the post will create a thought when you provide JSON with 
  
    * thoughtText
    * username
    * userId

        with the get request, you will get a list with all the thoughts or you can specify on thought if you adding "/<id>".
        to delete/modify a thought you adding /<id> to this route and using the corresponding "delete" or "put" requests.
  
  /api/thoughts/:thoughtId/reactions - this route will a reaction to a specific thought, and you can add /<reaction id> to the end of it to remove the reaction.


  ## Contributing
All contributions are welcome, just submit a pull request or clone the repo
  
  ## Contact 
[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/phonix375)
  
 Email : kotliar.alex@gmail.com

  
[Link to GitHub](https://github.com/phonix375)
  
