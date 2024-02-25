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


## TODO LIST

- [ ] `command.js` generate action with model (For faster CRUD)
- [ ] `command.js` generate action with middleware (For simplicity auth)
- [ ] create driver for parsing HTTP GET query 

