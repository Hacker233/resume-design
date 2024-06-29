# 使用官方 Node.js 镜像作为基础镜像
FROM node:18 as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install -g pnpm
RUN pnpm install

# 复制所有文件到容器中
COPY . .

# 构建项目
RUN pnpm build

# 使用nginx作为生产环境
FROM nginx:alpine as production-stage

# 复制nginx配置文件
COPY docker/nginx.conf /etc/nginx/nginx.conf

# 删除默认的Nginx网站配置
RUN rm -rf /usr/share/nginx/html/*

# 复制构建结果到Nginx网站目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80
EXPOSE 443

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]

# 启动 entrypoint 脚本
# ENTRYPOINT ["/entrypoint.sh"]

# 构建 Docker 镜像
# docker build -t 91huajian-web -f docker/Dockerfile .

# 运行 Docker 容器
# docker run -d -p 80:80 -p 443:443 --name 91huajian-web-container 91huajian-web
