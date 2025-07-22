import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../../models/user/User';

const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', roles: ['admin'] },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return users;
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg('id') id: string): Promise<User | undefined> {
    return users.find(user => user.id === id);
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string
  ): Promise<User> {
    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
    };
    users.push(newUser);
    return newUser;
  }
}
