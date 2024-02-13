/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    { id: 1, 
      nickname: 'Alex', 
      email: 'alex@google.com', 
      password: 'asdf1234' },
    { 
      id: 2, 
      nickname: 'Aryna', 
      email: 'aryna@hotmail.com', 
      password: 'aryna1234' },
    { 
      id: 3, 
      nickname: 'Nikki', 
      email: 'nikki@brainstation.com', 
      password: '12nikki34' 
    },    
  ]);
};
