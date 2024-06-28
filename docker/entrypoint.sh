#!/bin/sh

# 启动 Nginx
nginx &

# 等待 Nginx 启动
sleep 5

# 申请/更新 SSL 证书
certbot --nginx -d 91huajian.cn --non-interactive --agree-tos --email 1584775297@qq.com

# 停止 Nginx
nginx -s stop

# 启动 Nginx 并保持前台运行
nginx -g 'daemon off;'
