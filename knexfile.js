module.exports = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: "./data/users.db3",
    },
    migrations: {
        directory: "./data/migration"
    },
    seeds: {
        directory: "./data/seeds"
    },
    pool: {
        afterCreate: (conn,done) => {
            conn.run("PRAGMA foreign_keys = ON",done)
        }
    }
}