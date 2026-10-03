# 密码工具箱

安全场景的浏览器端密码工具箱，提供随机密码生成、密码强度检测、Base64 编解码和 URL 编解码。核心计算仍在浏览器本地完成，后端仅提供容器健康检查 API。

## 快速启动

```bash
cp .env.example .env
docker compose up -d --build
```

访问地址：

- 前端：http://localhost:8272
- 后端健康检查：http://localhost:3272/api/health

停止服务：

```bash
docker compose down
```

## 主要功能

- 随机密码生成器：支持长度和字符集配置。
- 密码强度检测器：展示强度等级、熵值和破解时间估算。
- Base64 编解码：支持 UTF-8 文本转换。
- URL 编解码：支持 `encodeURIComponent` 与 `decodeURIComponent`。

## 本地开发

前端开发：

```bash
cd frontend
npm install
npm run dev
```

后端开发：

```bash
cd backend
npm install
npm start
```

测试与构建：

```bash
cd frontend
npm test
npm run build

cd ../backend
npm test
```

## 技术栈

| 模块 | 技术 |
| --- | --- |
| 前端 | React 18、Vite 5、Vitest |
| 后端 | Node.js HTTP Server |
| 数据库 | PostgreSQL 16 命名卷 |
| 部署 | Docker Compose、Nginx |

## 目录结构

```text
.
├── frontend/              # React 前端源码与 Nginx 配置
├── backend/               # 健康检查 API
├── database/              # PostgreSQL 初始化脚本
├── docker-compose.yml     # 一键部署编排
├── .env                   # 本地默认环境变量
├── .env.example           # 环境变量模板
└── README.md
```

## 环境变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `COMPOSE_PROJECT_NAME` | `gb-172` | Compose 项目名 |
| `FRONTEND_PORT` | `8272` | 前端宿主机端口 |
| `BACKEND_PORT` | `3272` | 后端宿主机端口 |
| `DB_PORT` | `5772` | PostgreSQL 宿主机端口 |
| `DB_NAME` | `gb172` | 数据库名 |
| `DB_USER` | `gb172` | 数据库用户 |
| `DB_PASSWORD` | `gb172_password` | 数据库密码 |
| `DB_ROOT_PASSWORD` | `gb172_root_password` | 兼容统一规范的根密码变量 |
| `JWT_SECRET` | `change_me_gb_172_password_toolbox` | 兼容统一规范的密钥变量 |

## Docker 部署说明

Compose 文件使用顶层 `name: gb-172`，不包含废弃的 `version` 字段；所有服务设置 `container_name`。数据库数据保存在命名卷 `db_data`，避免中文路径绑定挂载问题。前端 Nginx 将 `/api/` 反向代理到 `backend:3272`。

如端口冲突，修改 `.env` 中的 `FRONTEND_PORT`、`BACKEND_PORT` 或 `DB_PORT` 后重新执行：

```bash
docker compose up -d --build
```

## License

MIT
