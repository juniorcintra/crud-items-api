import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    const itemCreated = this.prisma.item.create({ data: createItemDto });

    return itemCreated;
  }

  findAll() {
    const itemsFound = this.prisma.item.findMany();

    return itemsFound;
  }

  findOne(id: number) {
    const itemFound = this.prisma.item.findUnique({ where: { id: id } });

    return itemFound;
  }

  update(id: number, updateItemDto: CreateItemDto) {
    const itemUpdated = this.prisma.item.update({
      where: { id: id },
      data: updateItemDto,
    });

    return itemUpdated;
  }

  remove(id: number) {
    const itemDeleted = this.prisma.item.delete({ where: { id: id } });

    return itemDeleted;
  }
}
