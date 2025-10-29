package com.backend.crawlling;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExtractRequest {
    private String url;
    private String areaSelector;  // 선택된 영역 기준
    private String itemSelector;  // 추출할 항목
}