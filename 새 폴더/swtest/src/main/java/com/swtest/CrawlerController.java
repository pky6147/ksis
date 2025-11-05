package com.swtest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CrawlerController {

    private final CrawlerService crawlerService;

    @PostMapping("/crawl/start")
    public String startCrawl(@RequestParam String userId) {
        List<String> testUrls = List.of(
                "https://www.changwon.go.kr/cwportal/10310/10429/10432.web?gcode=1011&idx=867822&amode=view&",
                "https://www.changwon.go.kr/cwportal/10310/10429/10432.web?gcode=1011&idx=867663&amode=view&",
                "https://www.changwon.go.kr/cwportal/10310/10429/10432.web?gcode=1011&idx=867611&amode=view&"
        );
        crawlerService.startCrawling(userId, testUrls);
        return "크롤링 시작";
    }
}
