package com.swtest.handler;

import com.swtest.manager.WebSocketSessionManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Objects;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {

    private final WebSocketSessionManager sessionManager;


    // 크롤링 상태 전송 예시 메서드
    public void sendCrawlingStatus(String userId, String url, String status, String title) {
        log.info("Attempting send to user {}, url {}, status {}, title {}", userId, url, status, title);
        sessionManager.getSession(userId).ifPresentOrElse(session -> {
            try {
                String message = String.format(
                        "{\"url\":\"%s\", \"status\":\"%s\", \"title\":\"%s\"}", url, status, title);
                session.sendMessage(new TextMessage(message));
                log.info("Message sent to user {}", userId);
            } catch (Exception e) {
                log.error("Error sending message", e);
            }
        }, () -> {
            log.warn("No session found for user {}", userId);
        });
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String userId = getUserId(session);
        log.info("WebSocket connection established, URI: {}, userId: {}", session.getUri(), userId);
        if (userId != null) {
            sessionManager.addSession(userId, session);
            log.info("Session added for user: {}", userId);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String userId = getUserId(session);
        if (userId != null) {
            sessionManager.removeSession(userId);
            log.info("WebSocket connection closed for user: {}. Status: {}", userId, status);
        }
    }

    private String getUserId(WebSocketSession session) {
        // Extract userId from URI, e.g., /ws/test/{userId}
        String path = Objects.requireNonNull(session.getUri()).getPath();
        String[] segments = path.split("/");
        if (segments.length > 0) {
            return segments[segments.length - 1];
        }
        return null;
    }
}
