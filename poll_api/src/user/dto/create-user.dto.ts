import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  
  firstName: string;
  lastName: string;
  username: string;
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Хамгийн бага 6 оронтой код хийнэ үү!' })
  password: string;
  
}
