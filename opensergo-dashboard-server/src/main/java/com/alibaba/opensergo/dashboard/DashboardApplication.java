package com.alibaba.opensergo.dashboard;

import com.alibaba.csp.sentinel.init.InitExecutor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

/**
 * OpenSergo dashboard application.
 *
 * @author luyanbo
 */
@ComponentScan(basePackages = {
        "com.alibaba.opensergo.dashboard",
        "com.alibaba.csp.sentinel.dashboard"
})
@EnableJdbcRepositories(basePackages = {
        "com.alibaba.opensergo.dashboard",
        "com.alibaba.csp.sentinel.dashboard"
})
@SpringBootApplication
public class DashboardApplication {

    public static void main(String[] args) {
        triggerSentinelInit();
        SpringApplication.run(DashboardApplication.class, args);
    }

    private static void triggerSentinelInit() {
        new Thread(() -> InitExecutor.doInit()).start();
    }
}
