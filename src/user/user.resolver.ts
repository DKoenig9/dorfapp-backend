import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput } from './user.input';
import { UserService } from './user.service';
import { UserType } from './user.type';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Resolver((of) => UserType)
export class UserResolver {
  saltSecret = bcrypt.genSaltSync();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Query((returns) => UserType)
  async userById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Query((returns) => UserType)
  async usersBySomething(@Args('text') text: string) {
    let user = await this.userService.findOne({ email: text });
    if (!user) {
      user = await this.userService.findOne({ username: text });
      if (!user) {
        throw new BadRequestException('Keinen Nutzer gefunden');
      } else return user;
    } else return user;
  }

  @Query((returns) => UserType)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    // return this.userService.login(email, password);

    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const token = this.jwtService.sign({ id: user.id });

    return user;
  }

  @Query((returns) => [UserType])
  async users() {
    return this.userService.getUsers();
  }

  @Mutation((returns) => UserType)
  async deleteUserById(@Args('id') id: string) {
    const user = await this.userService.getUserById(id);

    this.userService.deleteUserById(id);
    return user;
  }

  @Mutation((returns) => UserType)
  async editUser(
    @Args('id') id: string,
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('phoneNumber') phoneNumber: string,
    @Args('userRole') userRole: string,
  ) {
    let hashedPassword: string;
    if (password) {
     hashedPassword  = await bcrypt.hash(password, this.saltSecret);
    }else {
      const user = await this.userService.getUserById(id);
      hashedPassword = user.password;
    }
    await this.userService.editUser(
      id,
      username,
      email,
      hashedPassword,
      phoneNumber,
      userRole,
    );
    return this.userService.findOne({ id });
  }

  @Mutation((returns) => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    console.log(createUserInput);
    const email = createUserInput.email;

    if (await this.userService.findOne({ email })) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(
      createUserInput.password,
      this.saltSecret,
    );

    createUserInput.password = hashedPassword;
    return this.userService.createUser(createUserInput);
  }
}
