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

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String userId = getUserId(session);
        if (userId != null) {
            sessionManager.addSession(userId, session);
            log.info("WebSocket connection established for user: {}", userId);

            // 1초 간격으로 10번 메시지 전송
            ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
            final int[] counter = {0}; // 전송 횟수 카운터

            executor.scheduleAtFixedRate(() -> {
                try {
                    if (counter[0] >= 10 || !session.isOpen()) {
                        executor.shutdown(); // 종료
                        return;
                    }
                    String message = "Hello " + userId + ", message " + (counter[0] + 1);
                    session.sendMessage(new TextMessage(message));
                    counter[0]++;
                } catch (Exception e) {
                    log.error("Error sending WebSocket message", e);
                    executor.shutdown();
                }
            }, 0, 1, TimeUnit.SECONDS);
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
