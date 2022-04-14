# OpenSergo Dashboard

[![Releases](https://img.shields.io/github/downloads/opensergo/opensergo-dashboard/total.svg)](https://github.com/opensergo/opensergo-dashboard/releases)
[![License: Apache-2.0](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0.txt)

[中文](./README.zh-Hans.md)


You can view and modify your service information and service governance configuration on the OpenSergo dashboard.

## Quick Start

This project requires Java 11 && Maven >= 3.6.0.

1. Download code: `git clone https://github.com/opensergo/opensergo-dashboard.git`
2. Modify `opensergo-dashboard-server/src/main/resources/application.yaml`, specify the mysql server address
    * Table struct: [opensergo-dashboard-server/src/main/resources/schema.sql](./opensergo-dashboard-server/src/main/resources/schema.sql)
3. Build
    * `mvn clean package -Dmaven.test.skip=true`
4. Launch
    * `cd opensergo-dashboard-server/target/; java -jar opensergo-dashboard.jar`
5. Visit `http://localhost:8080/`

## Package and Release

1. Download code, and execute `mvn clean package -Dmaven.test.skip=true -Prelease`
2. `opensergo-dashboard-distribution/target/opensergo-dashboard-${version}.zip` is the release package
3. Extract the package, and execute `opensergo-dashboard-${version}/bin/startup.sh`

## Community

[DingTalk Group](https://page.dingtalk.com/wow/dingtalk/act/en-home): `34826335`

<img src="image/dingtalk-group.jpg" width="300" />
