package com.alibaba.opensergo.dashboard.repository.application;

import com.alibaba.opensergo.dashboard.domain.application.MetadataEntity;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface MetadataRepository extends Repository<MetadataEntity, String> {
    MetadataEntity save(MetadataEntity entity);

    Optional<MetadataEntity> findByAppName(String appName);
}
