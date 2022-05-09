package io.opensergo.dashboard.grpc.service;

import com.google.protobuf.util.JsonFormat;
import io.grpc.stub.StreamObserver;
import io.opensergo.dashboard.domain.application.MetadataEntity;
import io.opensergo.dashboard.repository.application.MetadataRepository;
import io.opensergo.dashboard.service.application.ApplicationService;
import io.opensergo.proto.service_contract.v1.MetadataServiceGrpc;
import io.opensergo.proto.service_contract.v1.ReportMetadataReply;
import io.opensergo.proto.service_contract.v1.ReportMetadataRequest;
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

    @Autowired
    private ApplicationService applicationService;

    @SneakyThrows
    @Override
    public void reportMetadata(ReportMetadataRequest request, StreamObserver<ReportMetadataReply> responseObserver) {
        String appName = request.getAppName();
        MetadataEntity metadataEntity;
        Optional<MetadataEntity> metadataOptional = metadataRepository.findByAppName(appName);
        metadataEntity = metadataOptional.orElseGet(MetadataEntity::new);

        JsonFormat.Printer jsonPrinter = JsonFormat.printer()
                .includingDefaultValueFields()
                .sortingMapKeys()
                .omittingInsignificantWhitespace();
        String metadata = jsonPrinter.print(request);

        log.info("reportMetadata request: {}", metadata);

        metadataEntity = recordMetadata(appName, metadataEntity, metadata);
        applicationService.createApplication(appName, metadataEntity.getSha256());

        responseObserver.onNext(ReportMetadataReply.newBuilder().build());
        responseObserver.onCompleted();
    }

    private MetadataEntity recordMetadata(String appName, MetadataEntity metadataEntity, String metadata) {
        metadataEntity.setAppName(appName);
        metadataEntity.setMetadata(metadata);
        metadataEntity.setSha256(DigestUtils.sha256Hex(metadata));
        return metadataRepository.save(metadataEntity);
    }
}
