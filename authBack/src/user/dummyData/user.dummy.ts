import { faker } from '@faker-js/faker';

export interface UserDataType {
  id: string;
  password: string;
  name: string;
  email: string;
  bio: string;
}

export const userList: UserDataType[] = [
  {
    id: 'user1',
    password: '1234',
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.person.bio(),
  },
  {
    id: 'user2',
    password: '1234',
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.person.bio(),
  },
  {
    id: 'user3',
    password: '1234',
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.person.bio(),
  },
  {
    id: 'user4',
    password: '1234',
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.person.bio(),
  },
];
