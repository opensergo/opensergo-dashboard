# OpenSergo 控制台

您可以在 OpenSergo 的控制台上查看、修改您的服务信息、服务治理配置。

## 快速开始

1. 下载代码：`git clone https://github.com/opensergo/opensergo-dashboard.git`
2. 在`opensergo-dashboard-server/src/main/resources/application.yaml`中指定mysql的地址
    * mysql的表结构见 [opensergo-dashboard-server/src/main/resources/schema.sql](./opensergo-dashboard-server/src/main/resources/schema.sql)
3. 构建
    * `mvn clean package -Dmaven.test.skip=true`
4. 启动
    * `cd opensergo-dashboard-server/target/; java -jar opensergo-dashboard.jar`
5. 访问 `http://localhost:8080/`

## 打包发布

1. 下载代码后，执行`mvn clean package -Dmaven.test.skip=true -Prelease`
2. `opensergo-dashboard-distribution/target/opensergo-dashboard-${version}.zip`即为打包好的文件
3. 解压后执行其中的`opensergo-dashboard-${version}/bin/startup.sh`即可启动
