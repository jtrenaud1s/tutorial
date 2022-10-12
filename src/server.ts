import express from "express";
import bodyParser from "body-parser";
import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";

// Create datasource, so typeorm knows what database to use and how to connect to it
// tell typeorm where it can locate entity files
// enable logging so you can see the queries as they happen in the console
// synchronize being true means that when the server starts, typeorm will update the database with any new or modified entity tables
const dataSource = new DataSource({
  type: "sqlite",
  database: `./db.sqlite`,
  entities: ["./src/entities/*.ts"],
  logging: true,
  synchronize: true,
});

// create an instance of the express framework
const app = express();

// enable the json body parser middleware so express will automatically parse request bodies as json into a javascript object
app.use(bodyParser.json());

// select a port for the server to run on
const port = 3000;

// attempt to connect to the database, THEN....
dataSource.initialize().then((connection) => {
  //... get a reference to the user entity's repository
  const userRepo = dataSource.getRepository(User);

  // create a get endpoint at /users
  app.get("/users", async (req, res) => {
    // get all users from the user table
    const users: User[] = await userRepo.find();

    // set the response status to 200 and send the response with the user list in the body
    res.status(200).send(users);
  });

  // create a get endpoint at /users
  app.get("/users/:id", async (req, res) => {
    // get the ID from the url variable and convert it to a number
    const id = Number(req.params.id);

    const user = await userRepo.findOne({ where: { id: id } });

    // set the response status to 200 and send the response with the user list in the body
    res.status(200).send(user);
  });

  // create a post endpoint at /users
  app.post("/users", async (req, res) => {
    // get the body of the request
    const data = req.body;

    // create a new user entity from the request body and save it to the database
    const user = await userRepo.save(data);

    // respond with 201 created and send back the newly inserted user entity
    res.status(201).send(user);
  });

  // create a put endpoint at /users
  app.put("/users", async (req, res) => {
    // get the body of the request
    const data = req.body;

    // save the user to the database with the modified values from the request body
    const user = await userRepo.save(data);
    // respond with 200 okay and send back the newly inserted user entity

    res.status(200).send(user);
  });

  // create a delete endpoint at /users
  app.delete("/users/:id", async (req, res) => {
    // get the ID from the url variable and convert it to a number
    const id = Number(req.params.id);

    // delete the user with the given id from the database
    await userRepo.delete({ id: id });
    res.status(200).send();
  });

  // start the server
  app.listen(port, () => {
    console.log(`API server started on port ${port}`);
  });
});
