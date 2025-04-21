export interface UserData {
  id: string;
  password: string;
  name: string;
  email: string;
  bio: string;
}

export const DUMMY_USER_LIST: UserData[] = [
  {
    id: 'user1',
    password: '1234',
    name: 'Bertha Cummings',
    email: 'Kirsten_Ryan@yahoo.com',
    bio: 'friend',
  },
  {
    id: 'user2',
    password: '1234',
    name: 'Sidney Pacocha',
    email: 'Monique.Lesch94@hotmail.com',
    bio: 'founder, geek',
  },
  {
    id: 'user3',
    password: '1234',
    name: "Irene O'Kon",
    email: 'Otho_Macejkovic62@hotmail.com',
    bio: 'coach, writer, geek ⚽',
  },
  {
    id: 'user4',
    password: '1234',
    name: 'Megan Tremblay DVM',
    email: 'Ray_Conn-Wyman23@gmail.com',
    bio: 'volleyball lover',
  },
];
