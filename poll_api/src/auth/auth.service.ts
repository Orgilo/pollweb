// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,

    ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Хэрэглэхчийн Нэр эсвэл Нууц үг буруу байна.');
    }

    const passwordIsMatch = await argon2.verify(user.password, password);
    if (!passwordIsMatch) {
      throw new UnauthorizedException('User or password are incorrect!');
    }

    return user;
  }
  async login(user: IUser) {
   const { id, email} = user
   return {
    id,
    email,
    token: this.jwtService.sign({ id: user.id, email: user.email}),
   }
  }
}
