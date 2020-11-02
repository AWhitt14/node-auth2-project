
exports.seed = async function(knex) {
 await knex("roles").truncate()
 await knex("roles").insert([
   {name: "basic"}, {name: "admin"}
 ])
};
