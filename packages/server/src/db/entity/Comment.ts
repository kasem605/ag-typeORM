import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";
import { ManyToOne } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn() id: number;
    @Column("text") text: string;    
    @CreateDateColumn() createdAt: Date;
    
    @ManyToOne(type => User, user => user.comments,{ onDelete: "CASCADE"}) author: User;
    @ManyToOne(type => Post, post => post.comments,{ onDelete: "CASCADE"}) post: Post;
}