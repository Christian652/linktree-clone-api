import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { LinkDTO } from './dto/link.dto';
import { LinkRepository } from './link.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name);

  constructor(
    @InjectRepository(LinkRepository)
    private LinkRepository: LinkRepository,
    readonly userService: UserService
  ) { }

  public async save(
    LinkDTO: LinkDTO,
  ): Promise<Link> {
    try {
      this.logger.log(` Saving ${LinkDTO.url} Link`);
      
      return await this.LinkRepository.saveLink(LinkDTO);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(): Promise<Link[]> {
    return await this.LinkRepository.getAll();
  }

  public async getOne(id: number): Promise<Link> {

    const foundLink = await this.LinkRepository.findOne(id, { relations: ['training_sheets'] });
    if (!foundLink) {
      this.logger.warn(` Can't Found Link With Id : ${id} `);
      throw new NotFoundException(`Não Existe Link Com o Id: ${id}`);
    }
    return foundLink;
  }

  public async getUserLinks(slug: string): Promise<Link[]> {
    const user = await this.userService.getBySlug(slug);
    
    return await this.LinkRepository.find({
      where: {
        user
      }
    });
  }

  public async delete(LinkId: number): Promise<void> {
    try {
      this.logger.log(` Deleting Link : ${LinkId} `);
      await this.LinkRepository.delete_(LinkId);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}