package com.alibaba.csp.sentinel.dashboard.repository.application;

import com.alibaba.csp.sentinel.dashboard.domain.application.ApplicationEntity;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface ApplicationRepository extends Repository<ApplicationEntity, String> {
    ApplicationEntity save(ApplicationEntity entity);

    Optional<ApplicationEntity> findByName(String name);

    Iterable<ApplicationEntity> findAll();
}
