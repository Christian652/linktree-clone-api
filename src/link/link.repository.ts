import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Link } from './link.entity';
import { LinkDTO } from './dto/link.dto';
import { User } from 'src/user/user.entity';

@EntityRepository(Link)
export class LinkRepository extends Repository<Link> {

  public async saveLink(
    linkDto: LinkDTO,
  ): Promise<Link> {
    const { id, url, user, title, color } = linkDto;

    const link_ = new Link();
    link_.id = id ? id : null;
    link_.url = url;
    link_.title = title;
    link_.color = color;
    link_.user = user;

    await link_.save();

    return link_;
  }

  public async getAll() {
    return await this.find({
      relations: ['user']
    });
  }


  public async delete_(linkId) {
    this.delete(linkId);
  }

}