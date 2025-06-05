import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/entities/user.entity';

import { UserRepository } from '../../domain/repositories/user.repository';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) {}
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().lean().exec();
    return users.map((item) => {
      return new User(item.id, item.name, item.email, item.password);
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user
      ? new User(user.id, user.name, user.email, user.password)
      : null;
  }

  async create(user: User): Promise<User> {
    const userInserted = new this.userModel(user);
    const saved = await userInserted.save();
    return saved as User;
  }
}
