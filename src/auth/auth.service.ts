import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, SignupDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signup(data: SignupDto): Promise<any> {
    const user = await this.userService.findByEmail(data.email);
    if (user) {
      console.log('user duplicate');
      return false;
    } else {
      //save user
      const saltOrRounds = 10;
      const salt = await bcrypt.genSalt(saltOrRounds);
      const hash = await bcrypt.hash(data.password, salt);

      const newUser: CreateUserDto = {
        username: data.username,
        email: data.email,
        password: hash,
        active: 0,
      };
      await this.userService.create(newUser);
      return true;
    }
  }

  async signin(data: LoginDto): Promise<any> {
    const user = await this.userService.findByEmail(data.email);
    if (user) {
      const isMatch = await bcrypt.compare(data.password, user.password);
      const payload = { email: user.email, name: user.username };
      const access_token = await this.jwtService.sign(payload);
      const currentTimes = Date.now();
      const exptime = currentTimes + 1000 * 60 * 60 * 24;

      if (isMatch === true) {
        const datas: any = {
          userName: user.username,
          email: user.email,
          expiryDate: exptime.toString(),
          token: access_token,
        };

        return datas;
      } else {
        //
        console.log('Please check your login email or password');
        return null;
      }
    }
  }
}
