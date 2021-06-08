import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { v1 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  // async getUserByEmail(email: string): Promise<User[]> {
  // return this.userRepository.find({email});
  // }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async login(email: string, password: string): Promise<User> {
    return this.userRepository.findOne({ email, password });
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }

  async deleteUserById(id: string): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }

  async editUser(
    id: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string,
    userRole: string,
  ): Promise<User> {
    console.log(password);
    
    await this.userRepository.update(
      { id },
      {
        username,
        email,
        password,
        phoneNumber,
        userRole,
      },
    );

    return this.userRepository.findOne({ id });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { email, password, username, phoneNumber } = createUserInput;
    console.log(createUserInput);
    console.log(username);

    const user = this.userRepository.create({
      id: uuid(),
      email,
      password,
      username,
      phoneNumber,
      userRole: 'member',
    });
    return this.userRepository.save(user);
  }
}
