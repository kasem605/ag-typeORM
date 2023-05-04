import {DataSourceOptions} from "typeorm";

const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    username: "ish",
    password: "ishtiaq",
    synchronize: false
};

export = dataSourceOptions;