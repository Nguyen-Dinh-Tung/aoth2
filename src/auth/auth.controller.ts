import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
        const user = req.user;
        const token = this.authService.createJwt(user);
        res.redirect(`${process.env.CLIENT_SUCCESS_URL}?token=${token}`);
    }
    
    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuth() {
    }
  
    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuthRedirect(@Req() req) {
      return {
        message: 'User information from Facebook',
        user: req.user,
      };
    }
  
}
