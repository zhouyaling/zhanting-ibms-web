FROM registry.cn-chengdu.aliyuncs.com/tiqiyun/nginx:1.16-alpine
COPY dist /usr/share/nginx/html/
RUN chown -R 101.101 /usr/share/nginx/html/