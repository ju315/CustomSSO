import { Injectable } from '@nestjs/common';

import { userList } from './dummyData/user.dummy';

@Injectable()
export class UserRepository {
  private userList = userList;
  constructor() {
    //
  }

  findUser(userDto: { userId: string; password: string }) {
    return this.userList.find(
      (x) => x.id === userDto.userId && x.password === userDto.password,
    );
  }
}
