# 基本镜像
FROM node:lts-alpine

# 查看node版本
RUN node -v

# 查看npm版本
RUN npm -v

# 设置工作目录
WORKDIR /app

# 复制除了node_modules以外的所有文件到容器中
COPY . .

# 查看目录
RUN ls -a

# 删除pnpm-lock.yaml
RUN rm pnpm-lock.yaml

# 清除npm缓存 
RUN rm -rf node_modules
RUN npm cache clear --force

# 安装依赖
RUN npm install npm -g
RUN npm install pnpm -g --registry=https://registry.npm.taobao.org
RUN pnpm install --registry=https://registry.npm.taobao.org

# 设置打包内存限制
RUN pnpm run fix-memory-limit

# 编译应用程序
RUN pnpm build

# 安装 nginx 服务
RUN apk add --no-cache nginx

# 删除默认配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义的Nginx配置文件到容器中
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/

# 安装Git以克隆存储库
RUN apt update && apt install -y git

# 设置访问令牌参数
ARG ACCESS_TOKEN

# 克隆私有存储库，其中包含Nginx证书
RUN git clone https://${ACCESS_TOKEN}@github.com/Hacker233/nginx-server-config.git

# 将证书复制到对应位置
COPY 91huajian-nginx-config/public.pem /etc/nginx/conf.d/
COPY 91huajian-nginx-config/private.key /etc/nginx/conf.d/

# 打开80端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]

# 构建Dockerfile
# docker build --build-arg ACCESS_TOKEN=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 -t resume .

# 启动
# docker run -p 80:80 --name your_container_name your_image_name
