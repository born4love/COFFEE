## Rocketmq部署docker

下载 rocketmq-all-4.7.1-bin-release.zip 并解压重命名为 rocketmq

执行 docker-compose up -d

## 启动项目容器

需要使用 maven 构建 rocketmq client 项目 , 并映射到容器内

```
docker run -it -d --name rocket-project --network rocketmq_rocknet -v /usr/local/projects/java:/data/ -w /data openjdk:8-jdk /bin/bash
```
