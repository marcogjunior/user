import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { GetUserByEmailHandler } from './get-user-by-email.handler';
import { GetUserByEmailQuery } from './get-user-by-email.query';

describe('AppService', () => {
  let service: GetUserByEmailHandler;
  let mockRepository: Partial<UserRepositoryImpl>;
  beforeEach(() => {
    mockRepository = {
      findByEmail: jest
        .fn()
        .mockResolvedValue({ id: '123', name: 'John Doe', email: 'teste@123' }),
    };
    service = new GetUserByEmailHandler(mockRepository as UserRepositoryImpl);
  });

  it('should return User!', async () => {
    var result = await service.execute(new GetUserByEmailQuery('teste@123'));

    expect(result?.email).toBe('teste@123');
    expect(result?.id).toBe('123');
    expect(result?.name).toBe('John Doe');
  });
});
