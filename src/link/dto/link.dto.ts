import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/user.entity';

export class LinkDTO {
    @IsOptional()    
    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsOptional()
    @Type(() => User)
    user: User;

}