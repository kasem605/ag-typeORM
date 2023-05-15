import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schema";
import cors from "cors";
import "reflect-metadata";
import {} from "./entity/User"
// import { DataSource, Repository } from "typeorm";
import {createConnection, Connection, Repository, getRepository} from "typeorm";
//import ormconfig from "./db/ormconfig";
import { User, Post, Like, Comment, Notification } from "./entity";

export type Context = {
    orm: {
        userRepository: Repository<User>;
        postRepository: Repository<Post>;
        commentRepository: Repository<Comment>;
        likeRepository: Repository<Like>;
        notificationRepository: Repository<Notification>;  
    }
}

const connection: Promise<Connection> = createConnection( 
                {     
                    type: "mysql",
                    host: "localhost",
                    port: 3306,
                    username: "ish",
                    password: "ishtiaq",
                    database: "socialdb",
                    entities: [User, Post, Like, Comment, Notification],
                    synchronize: true

            });

connection.then(() =>{
    console.log("Connected to Database successfully!");
    startApolloServer();
})
.catch((err)=>{
    console.error("Failed to connect to databasde!", err);
});

/* const connection = new DataSource(ormconfig);

connection.initialize().then(() =>{
    console.log("Connected to Database successfully!");
    startApolloServer();
})
.catch((err)=>{
    console.error("Failed to connect to databasde!", err);
}); */

async function startApolloServer() {
    const PORT = 8080;
    const app: Application = express();
    app.use(cors());

/*     const userRepository: Repository<User> = connection.getRepository(User);
    const postRepository: Repository<Post> = connection.getRepository(Post);
    const likeRepository: Repository<Like> = connection.getRepository(Like);
    const commentRepository: Repository<Comment> = connection.getRepository(Comment);
    const notificationRepository: Repository<Notification> = connection.getRepository(Notification); */

    const userRepository: Repository<User> = getRepository(User);
    const postRepository: Repository<Post> = getRepository(Post);
    const likeRepository: Repository<Like> = getRepository(Like);
    const commentRepository: Repository<Comment> = getRepository(Comment);
    const notificationRepository: Repository<Notification> = getRepository(Notification);

    const context: Context = {
        orm: {
            userRepository: userRepository,
            postRepository: postRepository,
            likeRepository: likeRepository,
            commentRepository: commentRepository,
            notificationRepository: notificationRepository
        }
    }

    const server: ApolloServer =  new ApolloServer({ schema, context });
    await server.start();
    server.applyMiddleware({
        app,
        path: "/graphql"
    });
    app.listen(PORT, () => {
        console.log(`server is running a http://localhost:${PORT}`);
    });
}
