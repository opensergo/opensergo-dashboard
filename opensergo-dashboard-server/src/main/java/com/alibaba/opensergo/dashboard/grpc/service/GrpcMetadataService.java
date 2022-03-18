package com.alibaba.opensergo.dashboard.grpc.service;

import com.alibaba.opensergo.api.proto.MetadataServiceGrpc;
import com.alibaba.opensergo.api.proto.ReportMetadataReply;
import com.alibaba.opensergo.api.proto.ReportMetadataRequest;
import com.alibaba.opensergo.dashboard.domain.application.MetadataEntity;
import com.alibaba.opensergo.dashboard.repository.application.MetadataRepository;
import com.google.protobuf.util.JsonFormat;
import io.grpc.stub.StreamObserver;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Slf4j
@GrpcService
public class GrpcMetadataService extends MetadataServiceGrpc.MetadataServiceImplBase {

    @Autowired
    private MetadataRepository metadataRepository;

    @SneakyThrows
    @Override
    public void reportMetadata(ReportMetadataRequest request, StreamObserver<ReportMetadataReply> responseObserver) {
        String appName = request.getName();
        MetadataEntity metadataEntity;
        Optional<MetadataEntity> metadataOptional = metadataRepository.findByAppName(appName);
        metadataEntity = metadataOptional.orElseGet(MetadataEntity::new);

        JsonFormat.Printer jsonPrinter = JsonFormat.printer()
                .includingDefaultValueFields()
                .sortingMapKeys()
                .omittingInsignificantWhitespace();
        String metadata = jsonPrinter.print(request);
        log.debug("reportMetadata request: {}", metadata);
        metadataEntity.setAppName(appName);
        metadataEntity.setMetadata(metadata);
        metadataEntity.setSha512(DigestUtils.sha512Hex(metadata));
        metadataRepository.save(metadataEntity);
    }
}
