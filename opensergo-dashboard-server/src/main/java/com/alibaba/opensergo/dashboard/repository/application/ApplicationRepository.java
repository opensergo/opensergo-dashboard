package com.alibaba.opensergo.dashboard.repository.application;

import com.alibaba.opensergo.dashboard.domain.application.ApplicationEntity;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface ApplicationRepository extends Repository<ApplicationEntity, String> {
    ApplicationEntity save(ApplicationEntity entity);

    Optional<ApplicationEntity> findByName(String name);

    Iterable<ApplicationEntity> findAll();
}
