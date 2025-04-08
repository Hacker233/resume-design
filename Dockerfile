# 使用官方的 nginx 镜像作为基础镜像
FROM nginx:latest

# 将本地的 dist 目录复制到 nginx 的默认静态文件目录
COPY ./dist /usr/share/nginx/html

# 暴露容器的 80 和 443 端口
EXPOSE 80
EXPOSE 443

# 默认命令，启动 nginx 服务
CMD ["nginx", "-g", "daemon off;"]

# docker-compose up -d
