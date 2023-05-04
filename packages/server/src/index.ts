import express, {Application} from "express";
import {ApolloServer} from "apollo-server-express";
import schema from "./graphql/schema";
import cors from "cors";
import {DataSource} from "typeorm";
import ormconfig from "./db/ormconfig";

const connection = new DataSource(ormconfig);

connection.initialize().then(() =>{
    console.log("Connected to Database successfully!");
    startApolloServer();
})
.catch((err)=>{
    console.error("Failed to connect to databasde!", err);
});


async function startApolloServer() {
    const PORT = 8080;
    const app: Application = express();
    app.use(cors());
    const server: ApolloServer =  new ApolloServer({ schema });
    await server.start();
    server.applyMiddleware({
        app,
        path: "/graphql"
    });
    app.listen(PORT, () => {
        console.log(`server is running a http://localhost:${PORT}`);
    });
}

