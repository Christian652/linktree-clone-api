import { Controller, Get, Param} from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from './link.entity';

@Controller('links')
export class LinkPublicController {
  constructor(
    private linkService: LinkService
  ) {}

  @Get(':slug')
  public async getUserLinks(@Param('slug') slug: string): Promise<Link[]> {
    const link = await this.linkService.getUserLinks(slug);
    return link;
  }
}