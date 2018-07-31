/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('todos')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('todos').insert([
          {
            updated_at: new Date(),
            title: 'Assignment 1',
            description: 'Stdy Nodejs Folder structures',
            user_id:1,
            is_completed:'0',
            is_active: '1'
          },
          {
            updated_at:new Date(),
            title: 'Assignment 2',
            description: 'assignment 2',
            user_id:2,
            is_completed:'0',
            is_active: '1'
          },
          {
            updated_at:new Date(),
            title: 'Football 3',
            description: 'Football 3',
            user_id:2,
            is_completed:'0',
            is_active: '1'
          },
          {
            updated_at:new Date(),
            title: 'Homework 4',
            description: 'Stdy ReactJs Folder structures',
            user_id:1,
            is_completed:'0',
            is_active: '1'
          },
          {
            updated_at:new Date(),
            title: 'Learn C# 5',
            description: 'assignment 5',
            user_id:2,
            is_completed:'0',
            is_active: '1'
          },
          {
            updated_at:new Date(),
            title: 'Kitchen work 6',
            description: 'Stdy ReactJs Folder structures',
            user_id:1,
            is_completed:'0',
            is_active: '1'
          },
          {
            updated_at:new Date(),
            title: 'Shopping 7',
            description: 'Stdy ReactJs Folder structures',
            user_id:1,
            is_completed:'0',
            is_active: '1'
          },
          {
            updated_at:new Date(),
            title: 'Shooping 8',
            description: 'Stdy ReactJs Folder structures',
            user_id:2,
            is_completed:'0',
            is_active: '1'
          }
        ])
      ]);
    });
}
