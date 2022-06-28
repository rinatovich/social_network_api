import {Sequelize} from "sequelize";
import {localBD} from "../settings/config.js";

export const sequelize = new Sequelize(localBD.database, localBD.username, localBD.password, {
    dialect: "mysql",
    host: localBD.host,
    logging: false
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}







