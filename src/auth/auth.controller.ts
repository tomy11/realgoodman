import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/login.dto';
import { IResponse } from '../utils/Response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() userRegis: SignupDto): Promise<IResponse> {
    try {
      const result: any = await this.authService.signup(userRegis);
      if (result == true) {
        const resultData: IResponse = {
          message: 'register user successfuly',
          status: true,
          data: result,
        };
        return resultData;
      } else {
        const resultData: IResponse = {
          message: 'email or username duplicate in the system',
          status: false,
          data: result,
        };

        return resultData;
      }
    } catch (error) {
      console.log('error ', error);
      const result: IResponse = {
        message: 'error register ',
        status: false,
        data: error.message,
      };

      return result;
    }
  }

  @Post('/login')
  async login(@Body() userLogin: LoginDto): Promise<any> {
    console.log('userLogin : ', userLogin);
    try {
      const result: any = await this.authService.signin(userLogin);

      if (result != null || result != undefined) {
        const resultData: IResponse = {
          message: 'login user successfuly',
          status: true,
          data: result,
        };

        return resultData;
      } else {
        const resultData: IResponse = {
          message: 'login user not found',
          status: true,
          data: null,
        };
        return resultData;
      }
    } catch (error) {
      console.log('error ', error);
      const result: IResponse = {
        message: 'login email or password error',
        status: false,
        data: error.message,
      };
      return result;
    }
  }
}
