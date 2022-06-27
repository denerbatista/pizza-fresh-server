import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { Table } from './entities/table.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TableService {
  tables: Table[] = [];

  findAll() {
    return this.tables;
  }

  create(createTableDto: CreateTableDto) {
    const table: Table = { id: uuidv4(), ...createTableDto };

    this.tables.push(table);

    return table;
  }
}
