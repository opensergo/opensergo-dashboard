package com.alibaba.csp.sentinel.dashboard.service.application;

import com.alibaba.csp.sentinel.dashboard.domain.application.ApplicationEntity;
import com.alibaba.csp.sentinel.dashboard.repository.application.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;

    public ApplicationEntity insertOrUpdate(ApplicationEntity applicationEntity) {
        applicationRepository.findByName(applicationEntity.getName()).ifPresent(oldApp -> {
            applicationEntity.setId(oldApp.getId());
        });
        return applicationRepository.save(applicationEntity);
    }

    public List<ApplicationEntity> findAll() {
        ArrayList<ApplicationEntity> list = new ArrayList<ApplicationEntity>();
        for (ApplicationEntity applicationEntity : applicationRepository.findAll()) {
            list.add(applicationEntity);
        }
        return list;
    }
}
