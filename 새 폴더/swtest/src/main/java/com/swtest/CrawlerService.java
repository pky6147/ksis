//package com.swtest;
//
//import com.swtest.handler.WebSocketHandler;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class CrawlerService {
//
//    private final WebSocketHandler webSocketHandler;
//
//    // 테스트용 크롤링 시뮬레이션
//    public void startCrawling(String userId, List<String> urls) {
//        new Thread(() -> {
//            for (String url : urls) {
//                try {
//                    // 상태: 대기
//                    webSocketHandler.sendCrawlingStatus(userId, url, "waiting", "");
//
//                    // 실제 크롤링 대신 딜레이 (1초)
//                    Thread.sleep(3000);
//
//                    // 상태: 성공 + 가짜 제목
//                    String fakeTitle = "크롤링된 제목 for " + url;
//                    webSocketHandler.sendCrawlingStatus(userId, url, "success", fakeTitle);
//
//                } catch (InterruptedException e) {
//                    // 상태: 실패
//                    webSocketHandler.sendCrawlingStatus(userId, url, "fail", "");
//                    Thread.currentThread().interrupt();
//                }
//            }
//        }).start();
//    }
//}