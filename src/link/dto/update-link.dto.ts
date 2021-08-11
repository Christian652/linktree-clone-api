import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/user.entity';

export class UpdateLinkDTO {

    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @Type(() => User)
    @IsOptional()
    user: User;

}