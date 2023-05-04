import { DataSourceOptions} from "typeorm";

export default {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "ish",
    password: "ishtiaq",
    database: "socialdb",
    entities: [],
    synchronize: true
} as DataSourceOptions;