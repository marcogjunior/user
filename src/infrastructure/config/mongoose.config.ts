import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';

export const MongooseConfig = MongooseModule.forRoot(process.env.MONGO_URI!);
export const UserModelConfig = MongooseModule.forFeature([
  { name: 'User', schema: UserSchema },
]);
