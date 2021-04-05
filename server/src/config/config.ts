const path = require('path');

const env = (process.env.NODE_ENV || 'development').trim();

switch (env) {
    case "development":
        require('dotenv').config();
        break;
    case "test":
        require('dotenv').config({ path: path.resolve(__dirname, "..", "..", ".env.test") })
        break;
}

type configType = {
    mode: string,
    connection: {
        host?: string,
        user?: string,
        password?: string,
        database?: string,
    },
    headers: {
        accessToken: string,
        session: string,
    },
    regex: {
        uuidv4: RegExp,
        authorization: RegExp
    }
}

export const config: configType = {
    mode: env,
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
    headers: {
        accessToken: "authorization",
        session: "session",
    },
    regex: {
        uuidv4: /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        authorization: /^Bearer [0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    }
}
