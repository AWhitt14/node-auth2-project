const db = require("../data/config")

function findUser(user) {
    return db("users").join("roles as r", "r.id","users.role").where("username", user).first("users.*","r.name as role")
    
}

function findById(id) {
    return db("users").join("roles as r", "r.id","users.role").where("users.id", id).first("users.*","r.name as role")
    
}

async function createUser(user) {
    const [id] = await db("users").insert(user)
    return findById(id)

}


function getRoles() {
    return db("roles")
}

module.exports = {
 createUser, findUser, getRoles
}