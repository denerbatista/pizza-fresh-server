import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  handleError(error: Error) {
    console.log(error.message);
    throw new UnprocessableEntityException(error.message);
  }

  async findById(id: string): Promise<Product> {
    const record: Product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException(`Entrada de id: '${id}' não encontrada`);
    }
    return record;
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    return this.findById(id);
  }

  create(dto: CreateProductDto): Promise<Product | void> {
    const data: Product = { ...dto };
    return this.prisma.product.create({ data }).catch(this.handleError);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const record = await this.findById(id);
    try {
      const data: Partial<Product> = { ...dto };
      return this.prisma.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(record);
    }
  }

  async delete(id: string) {
    await this.findById(id);
    return await this.prisma.product.delete({ where: { id } });
  }
}
