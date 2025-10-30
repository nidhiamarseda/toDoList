import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  /**
   * Initializes the authentication service with user repository and JWT service.
   * @param userRepository TypeORM repository for `User` entities
   * @param jwtService Service used to sign and verify JWT tokens
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  /**
   * Registers a new user by hashing the password and saving the user entity.
   * @param username Desired unique username
   * @param password Plaintext password to be hashed
   * @returns The persisted `User` entity
   * @throws ConflictException If the username already exists
   */
  async register(username: string, password: string) {
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword });
    return this.userRepository.save(user);
  }


  /**
   * Authenticates a user and issues a signed JWT access token.
   * @param username Username attempting to log in
   * @param password Plaintext password supplied for verification
   * @returns Object containing the `access_token`
   * @throws UnauthorizedException If credentials are invalid
   */
  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid username or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid username or password');

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }


  /**
   * Finds a user by username for validation or lookup purposes.
   * @param username Username to search
   * @returns The matching `User` entity or `null` if not found
   */
  async validateUser(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
