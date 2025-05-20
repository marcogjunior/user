import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { GetUserByEmailQuery } from "./get-user-by-email.query";

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery,User|null> {

    constructor(@Inject(UserRepositoryImpl)private readonly userRepo: UserRepository) {}
    async execute(query: GetUserByEmailQuery): Promise<User|null> {
        return await this.userRepo.findByEmail(query.email);
    }
}
    

  
