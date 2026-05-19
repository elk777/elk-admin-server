
<div align="center">
<img src="https://img1.baidu.com/it/u=1382078311,1776434426&fm=253&fmt=auto&app=138&f=JPEG" width="200" height="120" alt="NestJS" />

<h1 align="center">Elk Admin Server</h1>

<p>基于 NestJS + Prisma + MySQL + Redis 的后台管理系统服务端</p>

<p>
  <img src="https://img.shields.io/badge/NestJS-10.x-E0234E?logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-6.x-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/pnpm-latest-F69220?logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/JWT-认证-000000?logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/LICENSE-MIT-blue" alt="License" />
</p>

<p align="center">
  <a href="https://github.com/elk777/elk-admin-server">项目仓库</a>
  <a href="https://github.com/elk777/elk-admin-server/issues">问题反馈</a>
  <a href="https://github.com/elk777/elk-admin-server#参与贡献">参与贡献</a>
</p>

</div>

## 简介

Elk Admin Server 是一个基于 [NestJS](https://nestjs.com/) 框架的后台管理系统服务端项目。采用 TypeScript 开发，集成 Prisma ORM 操作 MySQL 数据库，使用 Redis 做缓存，JWT 做身份认证，提供完整的 RBAC（基于角色的访问控制）权限管理体系。

项目开箱即用，适配前端 Vue 2 管理端系统，支持用户管理、角色管理、菜单权限管理、部门管理、数据字典管理等常见后台功能，并集成 Swagger 接口文档，方便前后端联调。

## 功能特性

- **用户管理** — 用户的增删改查，支持角色和部门关联，事务操作保证数据一致性
- **角色管理** — 角色的增删改查，角色与菜单权限的多对多关联
- **菜单权限管理** — 支持目录、菜单、按钮三种类型，自动生成前端路由树
- **部门管理** — 树形部门结构，支持父子关系和祖先链路记录
- **数据字典** — 字典类型与字典数据管理，通用的键值对查找表
- **JWT 认证** — 基于 Passport + JWT 的身份认证，Token 缓存在 Redis 中，支持全局守卫
- **文件上传** — 单文件和多文件上传，静态文件托管
- **统一响应** — 全局拦截器统一响应格式 `{ code, message, data }`
- **全局异常处理** — 区分 HTTP 异常与业务异常，返回统一错误格式
- **请求校验** — 基于 class-validator 的全局参数验证管道
- **日志系统** — 基于 Winston 的日志记录，支持按天轮转和归档压缩
- **API 文档** — 集成 Swagger，启动后访问 `/api-docs` 即可查看

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 运行时 | Node.js |
| 开发框架 | NestJS 10 |
| 开发语言 | TypeScript 5.1 |
| 数据库 | MySQL 8.x |
| ORM | Prisma 6.4 |
| 缓存 | Redis (ioredis) |
| 认证 | JWT + Passport |
| 参数校验 | class-validator + Joi |
| 日志 | Winston + winston-daily-rotate-file |
| API 文档 | Swagger (@nestjs/swagger) |
| 包管理 | pnpm |
| 测试 | Jest + Supertest |
| 代码规范 | ESLint + Prettier |

## 项目结构

```
vue2_project_server/
├── prisma/                        # Prisma 数据库相关
│   ├── schema.prisma              # 数据模型定义
│   ├── prisma.service.ts          # Prisma 客户端服务
│   ├── prisma.module.ts           # Prisma 全局模块
│   └── migrations/                # 数据库迁移文件
├── src/
│   ├── main.ts                    # 应用入口
│   ├── app.module.ts              # 根模块
│   ├── config/                    # 配置文件（数据库、Redis、JWT、环境校验）
│   ├── common/                    # 公共组件
│   │   ├── Interceptors/          # 响应拦截器
│   │   ├── decorators/            # 自定义装饰器 (@Public)
│   │   ├── exceptions/            # 自定义业务异常
│   │   ├── filters/               # 全局异常过滤器
│   │   ├── interfaces/            # 接口定义
│   │   └── pipes/                 # 全局参数校验管道
│   ├── constants/                 # 常量枚举（错误码、权限类型）
│   ├── utils/                     # 工具函数（路由树转换）
│   └── module/
│       ├── common/                # 通用模块
│       │   ├── logger/            # Winston 日志模块
│       │   ├── redis/             # Redis 缓存模块
│       │   └── upload/            # 文件上传模块
│       └── system/                # 业务模块
│           ├── auth/              # 认证模块（登录/登出/获取用户信息）
│           ├── user/              # 用户管理
│           ├── role/              # 角色管理
│           ├── menu/              # 菜单权限管理
│           ├── dept/              # 部门管理
│           └── dic/               # 数据字典管理
├── test/                          # E2E 测试
├── .env                           # 基础环境变量
├── .env.development               # 开发环境变量
├── .env.production                # 生产环境变量
├── package.json
├── tsconfig.json
├── nest-cli.json
└── pnpm-lock.yaml
```

## 数据模型

```
sys_user          用户表
sys_role          角色表
sys_menu          菜单/权限表
sys_dept          部门表
sys_user_role     用户-角色关联表（多对多）
sys_role_menu     角色-菜单关联表（多对多）
sys_user_dept     用户-部门关联表（多对一）
sys_dict_type     字典类型表
sys_dict_data     字典数据表
```

## 快速开始

### 环境要求

- **Node.js** >= 16
- **pnpm** >= 8
- **MySQL** >= 8.0
- **Redis** >= 6.0

### 克隆项目

```bash
git clone https://github.com/elk/vue2_project_server.git
cd vue2_project_server
```

### 安装依赖

```bash
pnpm install
```

### 环境配置

根据你的本地环境修改以下配置文件：

**.env** — 基础配置（数据库连接串）

```env
DATABASE_URL="mysql://root:password@127.0.0.1:3306/elk_db"
```

**.env.development** — 开发环境

```env
NODE_ENV=development
PORT=63210
DB_HOST=127.0.0.1
DB_PORT=33061
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=elk_db
REDIS_HOST=127.0.0.1
REDIS_PORT=63795
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=300m
```

**.env.production** — 生产环境

```env
NODE_ENV=production
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=demo-elk
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30m
```

### 数据库初始化

```bash
# 生成 Prisma Client
pnpm run prisma:generate

# 同步数据库（推送 schema 到数据库）
pnpm run prisma:push-DB

# 或者使用 migrate 方式
pnpm run prisma:migrate-create
```

### 启动项目

```bash
# 开发模式（热更新）
pnpm run start:dev

# 调试模式
pnpm run start:debug

# 生产模式
pnpm run build:pro
pnpm run start:prod
```

启动后访问：

- 服务地址：`http://127.0.0.1:63210`（开发）/ `http://127.0.0.1:3000`（生产）
- API 文档：`http://127.0.0.1:63210/api-docs`

## 脚本命令

| 命令 | 说明 |
| --- | --- |
| `pnpm run start` | 启动开发服务 |
| `pnpm run start:dev` | 启动开发服务（热更新） |
| `pnpm run start:debug` | 启动调试服务（热更新） |
| `pnpm run start:prod` | 启动生产服务 |
| `pnpm run build:dev` | 构建开发版本 |
| `pnpm run build:pro` | 构建生产版本 |
| `pnpm run lint` | ESLint 检查并自动修复 |
| `pnpm run format` | Prettier 格式化 |
| `pnpm run test` | 运行单元测试 |
| `pnpm run test:cov` | 运行测试并生成覆盖率报告 |
| `pnpm run test:e2e` | 运行 E2E 测试 |
| `pnpm run prisma:generate` | 生成 Prisma Client |
| `pnpm run prisma:pull-DB` | 从数据库拉取 Schema |
| `pnpm run prisma:push-DB` | 推送 Schema 到数据库 |
| `pnpm run prisma:migrate-create` | 创建数据库迁移 |

## 接口概览

| 模块 | 接口路径 | 说明 |
| --- | --- | --- |
| 认证 | `POST /auth/login` | 用户登录 |
| 认证 | `POST /auth/logout` | 用户登出 |
| 认证 | `GET /getUserInfo` | 获取当前用户信息 |
| 认证 | `GET /generateRouters` | 获取前端路由表 |
| 用户 | `/system/user/*` | 用户增删改查 |
| 角色 | `/system/role/*` | 角色增删改查 |
| 菜单 | `/system/menu/*` | 菜单增删改查 |
| 部门 | `/system/dept/*` | 部门增删改查 |
| 字典 | `/system/dic/*` | 字典增删改查 |
| 上传 | `POST /upload/file` | 单文件上传 |
| 上传 | `POST /upload/files` | 多文件上传 |

详细的接口文档请访问启动后的 `/api-docs` Swagger 页面。

## 主要依赖

| 依赖 | 说明 |
| --- | --- |
| `@nestjs/core` | NestJS 核心框架 |
| `@nestjs/passport` | Passport 认证集成 |
| `@nestjs/jwt` | JWT 令牌支持 |
| `@nestjs/swagger` | Swagger API 文档 |
| `@nestjs/config` | 环境变量配置管理 |
| `@prisma/client` | Prisma ORM 客户端 |
| `ioredis` | Redis 客户端 |
| `class-validator` | DTO 参数校验 |
| `class-transformer` | 数据转换 |
| `winston` | 日志框架 |
| `humps` | 命名风格转换（snake_case → camelCase） |

## 相关项目

| 项目 | 说明 |
| --- | --- |
| [Elk Admin 前端](https://github.com/elk/vue2_project) | 基于 Vue 2 的管理端前端项目 |

## 参与贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'feat: 添加某个功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 开源协议

[MIT](LICENSE)
