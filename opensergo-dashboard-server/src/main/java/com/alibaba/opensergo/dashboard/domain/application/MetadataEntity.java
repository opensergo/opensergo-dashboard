package com.alibaba.opensergo.dashboard.domain.application;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("metadata")
public class MetadataEntity {
    @Id
    private Long id;

    private String sha512;

    private String appName;

    private String metadata;
}
