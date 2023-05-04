import express, {Application} from "express";
import {ApolloServer} from "apollo-server-express";
import schema from "./graphql/schema";
import cors from "cors";
import "reflect-metadata";
import { DataSource } from "typeorm";
import ormconfig from "./db/ormconfig";

//import casual from "casual";

const connection = new DataSource(ormconfig);

connection.initialize().then(() => {
    startApolloServer();
    console.log("Connected to database!!");
}).catch(error => console.log("Database connection error: ", error));

async function startApolloServer() {
    /* let postsIds: string[] =[];
    let userids: string[] = [];

    const mocks = {
        User: () => ({
            id: () => {let uuid = casual.uuid; userids.push(uuid); return uuid},
            fullName: casual.full_name,
            bio: casual.text,
            email: casual.email,
            username: casual.username,
            password: casual.password,
            image: 'https://picsum.photos/seed/picsum/200/300',
            coverImage:  'https://picsum.photos/seed/picsum/200/300',
            postsCount: () => { casual.integer(0)}
        }),

        Post: () => ({
            id: () => {let uuid = casual.uuid; postsIds.push(uuid); return uuid},
            author: casual.random_element(userids),
            text: casual.text,
            image: 'https://picsum.photos/seed/picsum/200/300',
            commentsCount: () => { casual.integer(0)},
            likesCount:  () => { casual.integer(0)},
            likedByAuthUser: Boolean,
            latestLike: casual.first_name,
            createdAt: () => { casual.date()}
        }),

        Comment: () => ({
            id: casual.uuid,
            author: casual.random_element(userids),
            comment: casual.text,
            post: casual.random_element(postsIds),
            createdAt: () => { casual.date()}   
        }),

        Like: () => ({
            id: casual.uuid,
            user: casual.random_element(userids),
            post: casual.random_element(postsIds),
        })
    }; 

    Query: () => ({
        getPostsByUserId: () => [...new Array(casual.integer(10,100))],
        getFeed: () => [...new Array(casual.integer(10,100))],
        getNotificationsByUserId: () => [...new Array(casual.integer(10,100))],
        getCommentsByPostId: () => [...new Array(casual.integer(10,100))],
        getLikesByUPostId: () => [...new Array(casual.integer(10,100))],
        searchusers: () => [...new Array(casual.integer(10,100))],

    }) */

    const PORT = 8080;
    const app: Application = express();
    app.use(cors());
    const server: ApolloServer =  new ApolloServer({schema});
    await server.start();
    server.applyMiddleware({
        app,
        path: "/graphql"
    });
    app.listen(PORT, () => {
        console.log(`server is running a http://localhost:${PORT}`);
    });
}

