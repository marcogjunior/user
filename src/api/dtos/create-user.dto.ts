import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Jhon Dier',
    description: 'Valid user name',
  })
  name!: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'jhon-dier@example.com',
    description: 'Valid user email address',
  })
  email!: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is too short. Minimum length is 8 characters.',
  })
  @MaxLength(20, {
    message: 'Password is too long. Maximum length is 20 characters.',
  })
  @Matches(/(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter and one number.',
  })
  @ApiProperty({
    example: '######',
    description: 'Valid user password',
  })
  password!: string;
}
