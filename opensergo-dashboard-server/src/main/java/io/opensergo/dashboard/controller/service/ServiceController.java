package io.opensergo.dashboard.controller.service;

import com.alibaba.csp.sentinel.dashboard.domain.PagedResult;
import com.alibaba.csp.sentinel.dashboard.domain.Result;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import io.opensergo.dashboard.domain.application.MetadataEntity;
import io.opensergo.dashboard.repository.application.ApplicationRepository;
import io.opensergo.dashboard.repository.application.MetadataRepository;
import io.opensergo.dashboard.vo.service.MethodItem;
import io.opensergo.dashboard.vo.service.ServiceItem;
import io.opensergo.proto.service_contract.v1.MethodDescriptor;
import io.opensergo.proto.service_contract.v1.ReportMetadataRequest;
import io.opensergo.proto.service_contract.v1.ServiceDescriptor;
import io.opensergo.proto.service_contract.v1.ServiceMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * @author luyanbo
 */
@RestController
@RequestMapping(value = "/api/service/")
public class ServiceController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private MetadataRepository metadataRepository;

    @GetMapping("/queryService")
    public PagedResult<List<ServiceItem>> queryService(
            String appName,
            String protocol,
            Pageable pageable
    ) throws InvalidProtocolBufferException {
        Optional<MetadataEntity> metadataOptional = metadataRepository.findByAppName(appName);
        if (!metadataOptional.isPresent()) {
            return PagedResult.ofSuccess(new ArrayList<>());
        }
        MetadataEntity appEntity = metadataOptional.get();
        String metadataStr = appEntity.getMetadata();
        ReportMetadataRequest.Builder reqBuilder = ReportMetadataRequest.newBuilder();
        JsonFormat.parser().merge(metadataStr, reqBuilder);

        List<ServiceItem> serviceItems = new ArrayList<>();
        for (ServiceMetadata serviceMetadata : reqBuilder.getServiceMetadataList()) {
            if (!serviceMetadata.getProtocolsList().contains(protocol)) {
                continue;
            }
            for (ServiceDescriptor serviceDescriptor : serviceMetadata.getServiceContract().getServicesList()) {
                ServiceItem serviceItem = new ServiceItem();
                serviceItem.setAppName(reqBuilder.getAppName());
                serviceItem.setServiceName(serviceDescriptor.getName());
                serviceItems.add(serviceItem);
            }
        }
        return PagedResult.ofSuccess(serviceItems);
    }

    @GetMapping("/queryServiceMethod")
    public Result<List<MethodItem>> queryServiceMethod(
            String appName,
            String serviceName,
            String protocol,
            Pageable pageable
    ) throws InvalidProtocolBufferException {
        Optional<MetadataEntity> metadataOptional = metadataRepository.findByAppName(appName);
        if (!metadataOptional.isPresent()) {
            return Result.ofSuccess(null);
        }
        MetadataEntity appEntity = metadataOptional.get();
        String metadataStr = appEntity.getMetadata();
        ReportMetadataRequest.Builder reqBuilder = ReportMetadataRequest.newBuilder();
        JsonFormat.parser().merge(metadataStr, reqBuilder);

        List<MethodItem> methodItems = new ArrayList<>();
        Set<String> methodNames = new HashSet<>();
        for (ServiceMetadata serviceMetadata : reqBuilder.getServiceMetadataList()) {
            if (!serviceMetadata.getProtocolsList().contains(protocol)) {
                continue;
            }
            for (ServiceDescriptor serviceDescriptor : serviceMetadata.getServiceContract().getServicesList()) {
                if (serviceName.equals(serviceDescriptor.getName())) {
                    for (MethodDescriptor methodDescriptor : serviceDescriptor.getMethodsList()) {
                        if (methodNames.contains(methodDescriptor.getName())) {
                            continue;
                        }
                        methodNames.add(methodDescriptor.getName());
                        MethodItem methodItem = new MethodItem();
                        methodItem.setMethodName(methodDescriptor.getName());
                        methodItems.add(methodItem);
                    }
                }
            }
        }
        return Result.ofSuccess(methodItems);
    }
}
