package io.opensergo.dashboard.controller.application;

import com.alibaba.csp.sentinel.dashboard.domain.PagedResult;
import com.alibaba.csp.sentinel.dashboard.domain.Result;
import io.opensergo.dashboard.domain.application.ApplicationEntity;
import io.opensergo.dashboard.repository.application.ApplicationRepository;
import io.opensergo.dashboard.vo.application.ApplicationItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author luyanbo
 */
@RestController
@RequestMapping(value = "/api/application/")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @GetMapping("/getApplicationList")
    public PagedResult<List<ApplicationItem>> getApplicationList(
            HttpServletRequest request,
            Pageable pageable
    ) {
        List<ApplicationItem> appItemList = new ArrayList<>();
        List<ApplicationEntity> appEntityList = applicationRepository.findAll();
        for (ApplicationEntity appEntity : appEntityList) {
            ApplicationItem appItem = new ApplicationItem();
            appItem.setAppName(appEntity.getName());
            appItemList.add(appItem);
        }
        return PagedResult.ofSuccess(appItemList);
    }

    @GetMapping("/describeApplication")
    public Result<ApplicationItem> describeApplication(
            HttpServletRequest request,
            String appName
    ) {
        Optional<ApplicationEntity> appEntity = applicationRepository.findByName(appName);
        if (appEntity.isPresent()) {
            ApplicationItem appItem = new ApplicationItem();
            appItem.setAppName(appEntity.get().getName());
            appItem.setSha256(appEntity.get().getSha256());
            return Result.ofSuccess(appItem);
        }
        return Result.ofSuccess(null);
    }
}
