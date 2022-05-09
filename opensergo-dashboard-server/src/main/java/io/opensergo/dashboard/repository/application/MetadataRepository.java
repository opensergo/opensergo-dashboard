package io.opensergo.dashboard.repository.application;

import io.opensergo.dashboard.domain.application.MetadataEntity;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface MetadataRepository extends Repository<MetadataEntity, String> {
    MetadataEntity save(MetadataEntity entity);

    Optional<MetadataEntity> findByAppName(String appName);

    Optional<MetadataEntity> findBySha256(String sha256);
}
