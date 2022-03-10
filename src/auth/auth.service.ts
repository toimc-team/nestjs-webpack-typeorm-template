import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from '@/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import type { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateuserPassword(
      authCredentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken: string = await this.jwtService.sign(payload);

    this.logger.debug(
      `Generator JWT token with payload ${JSON.stringify(payload)}`,
    );
    return { accessToken };
  }
}
