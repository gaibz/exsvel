# Welcome to ExSvel Project

### Current status of this project is in BETA

ExSvel is a project that aims to provide a simple and easy way to create a web application using Svelte and Express. 

The reason i built this is for my own personal project, because i need a simple, fast, and easy way to create a web application. And also stable, secure and reliable.

I want to make it easy for start a new project, so you can just download this as archive (.zip, .tar.gz, etc...) or just clone a git repository

## Getting Started

you can clone this repository and start your project with the following commands:

```bash
git clone https://github.com/gaibz/exsvel.git
```

## Prerequisites

You need to have **Node.js** installed on your machine.

## Installing

To install the project dependencies, run the following command:

```bash
npm install
```

```bash
cp env .env
```

Generate a JWT Secret Key, the key should be used in the `.env` file on line `APP_JWT_SECRET`.

```bash
node command.js jwt_secret
```


## Running the Server

To run the servers, run the following command:

```bash
npm run start:server
```

## Directory Structure

The project has the following directory structure:

```
/-- public (For static files)
/-- server (For server-side code)
    /-- actions (For server-side actions)
    /-- libraries (For server-side libraries)
    /-- commands (For Listed Command Generated)
    /-- databases (For Database specific action (Model, seeder, migration)
    /-- drivers (For Framework Specific driver)
/-- ui (For client-side code)
```


## Commands 

This framework comes with a `command` that you can use to generate a new component, build automation, etc.. List of available commands are :

```bash
node command.js
```

Example for Command Usage : 
```bash
node command.js migration:create create_users_table
```


## Other things to note

### Model, Migration and ORM

This Project uses sequelize as the ORM. You can check it out on the sequelize documentation on [Sequelize](https://sequelize.org/)


## About Query Standard for Indexing

query should be look like : `http://localhost:3000/api/v1/someaction?page=1&per_page=10&sort_by=id:desc&search=hello+world&filter[field]=value&filter[another_field]=another_value,another_value2&fields=field,another_field&filter[greater_than_field]=:gt:10&filter[less_than_field]=:lt:10&filter[greater_than_or_equal_field]=:gte:10&filter[less_than_or_equal_field]=:lte:10&filter[like_field]=:like:hello`

You can use built in function to parse the query to standard query for Modeling..

```javascript
// In your action file : 
const {parseIntoModelQuery, parseQueryString} = require("./server/drivers/QueryParser")
// .... inside index function

// in case you want to define searchable columns
let searchable_columns = ['searchable_1', 'searchable_2'];

// in case you want to strict the where (cannot customized by user)
let append_where = {
    some_field : 'some_value'
};

let model_query = parseIntoModelQuery(this.getFullUrl(req), searchable_columns, append_where);
//.... Done
```

```javascript
// the query object will now look like this
model_query = {
  where: {
    field: 'value',
    another_field: { [Symbol(in)]: [Array] },
    greater_than_field: { [Symbol(gt)]: '10' },
    less_than_field: { [Symbol(lt)]: '10' },
    greater_than_or_equal_field: { [Symbol(gte)]: '10' },
    less_than_or_equal_field: { [Symbol(lte)]: '10' },
    like_field: { [Symbol(like)]: '%hello%' },
    [Symbol(or)]: [ [Object], [Object] ]
  },
  limit: 10,
  offset: 0,
  order: [ [ 'id', 'desc' ] ]
}

// which is ready to be used in sequelize model
```

```javascript
// Example of using the query in sequelize model
const YourModel = require("./server/models/YourModel");
YourModel.findAll(query).then((result) => {
    // do something with the result
});
```


## TODO LIST

- [ ] `command.js` generate action with model (For faster CRUD)
- [ ] `command.js` generate action with middleware (For simplicity auth)
- [x] create driver for parsing HTTP GET query 
- [x] make auth system with JWT in middleware
