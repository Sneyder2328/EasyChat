import { config } from '../config/config';

export const knexConfig = {
    development: {
        client: "mysql",
        connection: config.connection,
        debug: true,
    },
    production: {
        client: "mysql",
        connection: config.connection,
        debug: true,
        log: {
            warn(message) {
            },
            error(message) {
            },
            deprecate(message) {
            },
            debug(message) {
            },
        }
    },
    test: {
        client: "mysql",
        connection: config.connection,
        debug: true,
        log: {
            warn(message) {
            },
            error(message) {
            },
            deprecate(message) {
            },
            debug(message) {
            },
        }
    }
}