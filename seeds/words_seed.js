/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('words').del()
  await knex('words').insert([
    { 
      id: 1, 
      user_id: 1, 
      word: 'apple', 
      translation: 'яблуко', 
      progress: 0, 
      notes: 'Fruit', 
      date: '2024-02-13' 
    },
    { 
      id: 2, 
      user_id: 2, 
      word: 'car', 
      translation: 'машина', 
      progress: 0, 
      notes: 'Vehicle', 
      date: '2024-02-13' 
    },
    { 
      id: 3, 
      user_id: 1, 
      word: 'tree', 
      translation: 'дерево', 
      progress: 0, 
      notes: '', 
      date: '2024-02-13' 
    },
    { 
      id: 4, 
      user_id: 2, 
      word: 'hello', 
      translation: 'привіт', 
      progress: 0, 
      notes: '', 
      date: '2024-02-13' 
    },
    { 
      id: 5, 
      user_id: 1, 
      word: 'sad', 
      translation: 'сумний', 
      progress: 0, 
      notes: 'A feeling', 
      date: '2024-02-13' 
    },
    { 
      id: 6, 
      user_id: 3, 
      word: 'hard', 
      translation: 'тяжко', 
      progress: 0, 
      notes: 'A feeling', 
      date: '2024-02-13' 
    },
    { 
      id: 7, 
      user_id: 3, 
      word: 'brain', 
      translation: 'мозок', 
      progress: 0, 
      notes: '', 
      date: '2024-02-13' 
    },
    { 
      id:8, 
      user_id: 3, 
      word: 'learning', 
      translation: 'вчитися', 
      progress: 0, 
      notes: '', 
      date: '2024-02-13' 
    },
    { 
      id: 9, 
      user_id: 1, 
      word: 'sleep', 
      translation: 'спати', 
      progress: 0, 
      notes: 'something people enjoy', 
      date: '2024-02-13' 
    },
    { 
      id: 10, 
      user_id: 2, 
      word: 'cow', 
      translation: 'корова', 
      progress: 0, 
      notes: 'a mammal', 
      date: '2024-02-13' 
    },
  ]);
};