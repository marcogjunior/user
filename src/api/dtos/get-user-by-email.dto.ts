import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetUserByEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'jhon-dier@example.com',
    description: 'Valid user email address',
  })
  email!: string;
}
