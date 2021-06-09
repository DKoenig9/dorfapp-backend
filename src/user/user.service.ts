import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Like, Repository } from 'typeorm';
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

  async findSome(condition: string): Promise<User[]>{
    let usersByUsername =await this.userRepository.find({
      where: {
        username: new RegExp(`^${condition}`),
    }
      });

      // Ab hier hab ich rumprobiert: hab auf die Schnelle keinen Or Befehl gefunden und es dann so versucht.
      let usersByEmail =await this.userRepository.find({
        where: {
          email: new RegExp(`^${condition}`),
      }
        });
        console.log("Suche");
        
        if(usersByUsername.length > usersByEmail.length) return usersByUsername;
        else return usersByEmail;
      }

  async findOne(condition: {id?:string, email?: string, username?: string}): Promise<User> {
    console.log(condition);
    
   
    
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
