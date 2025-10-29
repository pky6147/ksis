package com.backend.crawlling;

import lombok.Getter;
import lombok.Setter;
import java.util.Map;

@Getter
@Setter
public class CrawlRequest {
    private String url;
    private String areaSelector;
    private String itemSelector;
    private Map<String, String> columns;
}