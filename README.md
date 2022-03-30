# OpenSergo Dashboard

You can view and modify your service information and service governance configuration on the OpenSergo dashboard.

## Quick Start

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
