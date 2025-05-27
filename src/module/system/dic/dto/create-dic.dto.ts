import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

class IDicData {
  @ApiProperty({ description: '字典ID' })
  id?: number;
  @ApiProperty({ description: '字典值', required: true })
  value: string;
  @ApiProperty({ description: '字典标签', required: true })
  label: string;
}
export class CreateDicDto {
  @ApiProperty({ description: '字典ID' })
  @IsOptional()
  dictID?: number;

  @ApiProperty({ description: '字典名称', required: true })
  @IsNotEmpty()
  @IsString({ message: '字典名称必须为字符串' })
  dictName: string;

  @ApiProperty({ description: '字典类型', required: true })
  @IsNotEmpty()
  @IsString({ message: '字典类型必须为字符串' })
  dictType: string;

  @ApiProperty({ description: '字典状态' })
  @IsOptional()
  @IsNumber({}, { message: '字典状态必须为数字' })
  status: number;

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString({ message: '备注必须为字符串' })
  remark: string;

  @ApiProperty({ description: '字典数据', type: [IDicData] })
  @IsOptional()
  dicData: IDicData[];
}
