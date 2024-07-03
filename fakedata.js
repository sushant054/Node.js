/*Faker
To generate fake data in database
installation=>npm i @faker-js/faker
*/
const { faker } = require('@faker-js/faker');

let createRandomUser= ()=>{
  return {
    user: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

console.log(createRandomUser());