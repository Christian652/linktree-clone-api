import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkDTO } from './dto/link.dto';
import { Link } from './link.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';
import { IsUserLoggedEqualsGuard } from 'src/user/guards/isUserLoggedEquals.guard';
import { UpdateLinkDTO } from './dto/update-link.dto';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/user/user.entity';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('links')
export class LinkController {
  constructor(
    private linkService: LinkService
  ) {}

  @Post()
  @Roles(Role.User)
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async create(
    @Body() linkDTO: LinkDTO,
    @GetUser() user: User
  ): Promise<Link> {
    try {
      linkDTO.user = user;
      const link = await this.linkService.save(linkDTO);
      return link;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async update(
    @Body() linkDTO: UpdateLinkDTO,
    @GetUser() user: User
  ): Promise<Link> {
    try {
      linkDTO.user = user;
      const link = await this.linkService.save(linkDTO);
      return link;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  public async getAll(): Promise<Link[]> {
    try {
      const link = await this.linkService.getAll();
      return link;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @Roles(Role.User)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedLink = await this.linkService.delete(id);
      return deletedLink
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}