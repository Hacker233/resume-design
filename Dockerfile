# 使用 Nginx 官方镜像作为基础镜像
FROM nginx:alpine

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 复制 dist 目录到 Nginx 的默认目录
COPY dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80


# docker network create nginx-proxy

# docker-compose up -d
