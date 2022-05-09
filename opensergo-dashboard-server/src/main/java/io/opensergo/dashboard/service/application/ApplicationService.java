package io.opensergo.dashboard.service.application;

import io.opensergo.dashboard.domain.application.ApplicationEntity;
import io.opensergo.dashboard.repository.application.ApplicationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public void createApplication(String appName, String sha256) {
        ApplicationEntity app = applicationRepository.findByName(appName).orElseGet(() ->
                ApplicationEntity.builder()
                        .name(appName)
                        .sha256(sha256)
                        .build()
        );
        applicationRepository.save(app);
    }
}
