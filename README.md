# Relive Project

As it currently stands the project is built in 3 different sections, each within a folder.

Hopefully we can phase out the database and express sections in favor of a seperate dedicated server for the webapp to communicate with.

All commands should be run within their respective projects folder.

## relive-webapp

The actual website. 

Requires Node.js and npm, within npm requires angular.

Command to start:

```sh
ng serve
```

Ctrl+C to stop it.

If it refuses to serve run the following then retry.

```sh
npm install
```

## relive-db

This is where the Database lives. 

Requires Docker (and all its dependencies) to run and its where the data is stored.

Command to start it up:

```sh
docker compose up
```

Use ctrl+c to turn it off

Command after turn off:

```sh
docker compose down
```

If there are issues with the tables both existing and not existing on your local machine simply delete the "sql" folder here.

## relive-express

This is where the node.js express layer lives and its role is to serve as a layer to communicate between the webapp and the database.

Requires Node.js and npm. in npm it requires 'express' and 'mysql' to run. I also recommend installing 'nodemon' from npm as well.

If you have nodemon installed simply run:

```sh
nodemon
```

if you dont run the following:

```sh
node server.js
```

both can be stopped with Ctrl+C
