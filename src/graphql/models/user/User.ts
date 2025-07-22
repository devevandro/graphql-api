import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
    id: String = '';

  @Field()
    name: String = '';

  @Field()
    email: String = '';

  @Field(() => [String], { nullable: true })
  roles?: String[] = [];
}
