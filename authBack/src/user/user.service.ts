import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
    //
  }

  userSignIn(userDto: { userId: string; password: string }) {
    const user = this.userRepository.findUser(userDto);
    console.log(user);

    if (!user) {
      throw new HttpException('User is not exist!', 404);
    }

    return {
      success: true,
    };
  }

  userSignOut() {
    return 'user sign out';
  }

  userRegister() {
    return 'user register';
  }
}
