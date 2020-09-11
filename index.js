const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [];
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({api: "running..."});
});

//CREATE A USER

server.post("/api/users", (req, res) => {
    const userInfo = req.body;

    //validate that the info is correct here

    if(!userInfo.name || !userInfo.body) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }

    userInfo.id = shortid.generate();
    users.push(userInfo);

    res.status(201).json(userInfo);
});

//GET ALL USERS

server.get("/api/users", (req, res) => {
    res.status(200).json(users);
});


//GET for return of specific user at an id
server.get('/api/users/:id', (req, res) => {
    const userRequested = req.params;
    const foundUser = users.find(user => user.id === userRequested.id);
    if (!foundUser) {
        res.status(404).json({message: "The user with the specified ID does not exist"})
    }
    else {
        res.status(200).json(foundUser);
    }
})

const PORT = 5000;
server.listen(PORT, () => console.log(`\n ** API running on http://localhost:${PORT} **\n`)
);