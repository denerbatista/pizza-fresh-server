import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger'; // < NOVO IMPORT

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('find-all')
  @ApiOperation({
    summary: 'Listar todos os produtos',
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get('find-one/:id')
  @ApiOperation({
    summary: 'Visualizar um produto pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch('edit/:id')
  @ApiOperation({
    summary: 'Editar um produto pelo ID',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Criar um produto',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um produto pelo ID',
  })
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
