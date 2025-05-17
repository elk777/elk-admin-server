import { Injectable } from '@nestjs/common';
import { CreateDicDto } from './dto/create-dic.dto';
import { UpdateDicDto } from './dto/update-dic.dto';

@Injectable()
export class DicService {
  create(createDicDto: CreateDicDto) {
    return 'This action adds a new dic';
  }

  findAll() {
    return []
  }

  findOne(id: number) {
    return `This action returns a #${id} dic`;
  }

  update(id: number, updateDicDto: UpdateDicDto) {
    return `This action updates a #${id} dic`;
  }

  remove(id: number) {
    return `This action removes a #${id} dic`;
  }
}
