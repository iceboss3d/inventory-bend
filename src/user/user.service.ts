import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { apiResponse } from 'src/helpers/apiResponse';
import { Repository } from 'typeorm';
import { LoginDTO, UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async createUser(data: UserDTO) {
        const checkUsername = await this.userRepository.findOne({where: {username: data.username}});

        if (checkUsername) {
            return apiResponse.existingResponse('User with such username exists')
        }
        const user = this.userRepository.create(data);

        await this.userRepository.save(user);

        return apiResponse.successResponseWithData('User Created', user.toResponseObject());
    }

    async login(data: LoginDTO) {
        const user = await this.userRepository.findOne({ where: { username: data.username } });
        if (!user) {
            return apiResponse.notFoundResponse('Invalid Username');
        }
        const same = await bcrypt.compare(data.password, user.password);
        if(!same) {
            return apiResponse.unauthorizedResponse('Invalid Password');
        }
        let userData = {...user.toResponseObject(), token: ''}
        userData.token = jwt.sign(user.toResponseObject(), process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMEOUT_DURATION});

        return apiResponse.successResponseWithData('User Logged In', userData);
    }
}
