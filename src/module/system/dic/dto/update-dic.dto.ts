import { PartialType } from '@nestjs/mapped-types';
import { CreateDicDto } from './create-dic.dto';

export class UpdateDicDto extends PartialType(CreateDicDto) {}
