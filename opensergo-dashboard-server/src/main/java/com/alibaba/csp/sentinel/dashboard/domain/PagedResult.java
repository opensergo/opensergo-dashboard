package com.alibaba.csp.sentinel.dashboard.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagedResult<T extends List<?>> extends Result<T> {
    /**
     * current page number
     */
    private Integer pageNumber;

    /**
     * how many pages are available in total
     */
    private Integer totalPages;

    /**
     * the max number of items to be returned
     */
    private Integer pageSize;


    public static <T extends List<?>> PagedResult<T> ofSuccess(T data) {
        PagedResult<T> result = new PagedResult<T>();
        result.setSuccess(true);
        result.setMsg("success");
        result.setData(data);
        return result;
    }
}
