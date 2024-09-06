import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as ExcelJS from 'exceljs';

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

  async generateExcelItems(): Promise<Buffer> {
    // Supondo que o modelo 'professional' exista no seu Prisma Service
    const profissionais = await this.prisma.item.findMany();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Profissionais');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nome', key: 'nome', width: 30 },
      { header: 'Descrição', key: 'descricao', width: 30 },
      { header: 'Imagem', key: 'image', width: 50 },
    ];

    profissionais.forEach((item) => {
      worksheet.addRow({
        id: item.id,
        nome: item.nome,
        descricao: item.descricao,
        image: item.image,
      });
    });

    // Converter o ArrayBuffer para Buffer
    const buffer = Buffer.from(await workbook.xlsx.writeBuffer());

    return buffer;
  }
}
