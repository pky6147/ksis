package com.backend.crawlling;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/crawl")
public class CrawlController {

    private final CrawlService crawlService;

    /** ✅ 전체 페이지 미리보기 캡처 */
    @GetMapping("/preview")
    public ResponseEntity<Map<String, Object>> previewPage(@RequestParam String url) {
        try {
            Map<String, Object> data = crawlService.captureFullPageWithHtml(url);

            Map<String, Object> result = new HashMap<>();
            result.put("image", Base64.getEncoder().encodeToString((byte[]) data.get("image")));
            result.put("html", data.get("html"));

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    /** ✅ 기존 복합 컬럼 추출 (areaSelector + itemSelector + columns) */
    @PostMapping("/extract")
    public ResponseEntity<List<Map<String, String>>> extractData(@RequestBody CrawlRequest request) {
        try {
            List<Map<String, String>> data = crawlService.crawlBySelectors(
                    request.getUrl(),
                    request.getAreaSelector(),
                    request.getItemSelector(),
                    request.getColumns()
            );
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    /** ✅ 간단 텍스트 추출 (프론트 검증용) */
    @PostMapping("/extract2")
    public ResponseEntity<Map<String, Object>> extractSimple(@RequestBody ExtractRequest request) {
        try {
            List<String> resultList = crawlService.crawlSimpleExtract(
                    request.getUrl(),
                    request.getAreaSelector(),
                    request.getItemSelector()
            );

            Map<String, Object> result = new HashMap<>();
            result.put("data", resultList);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /** HTML영역 클릭 시 미리보기에 하이라이트 */
    @PostMapping("/highlight")
    public ResponseEntity<Map<String, Object>> highlightElement(@RequestBody Map<String, String> request) {
        String url = request.get("url");
        String selector = request.get("selector");

        try {
            Map<String, Object> rect = crawlService.getElementRect(url, selector);
            return ResponseEntity.ok(rect);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}