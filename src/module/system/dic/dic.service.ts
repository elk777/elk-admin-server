import { Injectable } from '@nestjs/common';
import { CreateDicDto } from './dto/create-dic.dto';
import { UpdateDicDto } from './dto/update-dic.dto';
import { ListDicDto } from './dto/list-dic.dto';

// 引入prisma服务
import { PrismaService } from 'prisma/prisma.service';
// 引入humps
import { camelizeKeys } from 'humps';

@Injectable()
export class DicService {
  constructor(private prisma: PrismaService) {}

  /**
   * 创建字典
   * @param createDicDto
   * @returns
   */
  async create(createDicDto: CreateDicDto) {
    const { dicData } = createDicDto;
    const dicType = this.prisma.sys_dict_type.create({
      data: {
        dictName: createDicDto.dictName,
        dictType: createDicDto.dictType,
        status: createDicDto.status,
      },
    });
    const dictData = this.prisma.sys_dict_data.createMany({
      data: dicData.map((item) => {
        return {
          id: item.id.toString(),
          dictCode: createDicDto.dictType,
          dictLabel: item.label,
          dictValue: item.value,
        };
      }),
    });
    // 事务
    const dic = await this.prisma.$transaction([dicType, dictData]);
    return dic;
  }

  /**
   * 获取字典列表
   * @param param: ListDicDto
   * @returns
   */
  async findAll({ pageNum, pageSize }: ListDicDto) {
    const dicList = await this.prisma.sys_dict_type.findMany({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });
    return camelizeKeys(dicList);
  }

  /**
   * 获取字典详情
   * @param id
   * @returns
   */
  async findOne(id: number) {
    const dicTypes = await this.prisma.sys_dict_type.findUnique({
      where: {
        dictID: id,
      },
    });
    const dicData = await this.prisma.sys_dict_data.findMany({
      where: {
        dictCode: dicTypes.dictType,
      },
    });
    let dicFilterData = [];
    if (dicData.length > 0) {
      dicFilterData = dicData.map((item) => {
        return {
          id: item.id,
          code: item.dictCode,
          label: item.dictLabel,
          value: item.dictValue,
        };
      });
    }
    return { ...dicTypes, dicData: dicFilterData };
  }

  /**
   * 更新字典
   * @param updateDicDto
   * @returns
   */
  async update(updateDicDto: UpdateDicDto) {
    const { dicData } = updateDicDto;
    const dicType = this.prisma.sys_dict_type.update({
      where: { dictID: updateDicDto.dictID },
      data: {
        dictName: updateDicDto.dictName,
        dictType: updateDicDto.dictType,
        status: updateDicDto.status,
        updateTime: new Date(),
      },
    });
    const dictDatas = dicData.map((item) =>
      this.prisma.sys_dict_data.updateMany({
        where: { id: item.id.toString() },
        data: {
          dictLabel: item.label,
          dictValue: item.value,
        },
      }),
    );
    // 事务
    const dic = await this.prisma.$transaction([dicType, ...dictDatas]);
    if (!dic) {
      return '更新失败';
    } else {
      return '更新成功';
    }
  }

  /**
   * 删除字典
   * @param id
   * @returns
   */
  async remove(id: number) {
    const dicTypeData = await this.prisma.sys_dict_type.findFirst({
      where: { dictID: id },
    });
    const dicData = this.prisma.sys_dict_data.deleteMany({
      where: { dictCode: dicTypeData.dictType },
    });
    const dicType = this.prisma.sys_dict_type.delete({
      where: { dictID: id },
    });
    const dic = await this.prisma.$transaction([dicData, dicType]);
    if (!dic) {
      return '删除失败';
    } else {
      return '删除成功';
    }
  }

  /**
   * 获取字典数据
   * @param dictCode
   * @returns
   */
  getDicData(dictCode: string) {
    const dicData = this.prisma.sys_dict_data.findMany({
      where: { dictCode },
    });
    if (!dicData) {
      return '获取失败';
    } else {
      return dicData;
    }
  }
}
