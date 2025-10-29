package com.backend.crawlling;

import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.Point;
import org.openqa.selenium.Dimension;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.*;
import java.util.List;

@Slf4j
@Service
public class CrawlService {
    /** HTML + 전체 페이지 캡처 동시 수행 */
    public Map<String, Object> captureFullPageWithHtml(String url) throws Exception {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--window-size=1920,1080");

        WebDriver driver = new ChromeDriver(options);

        try {
            driver.get(url);
            Thread.sleep(3000);

            // ✅ HTML 소스 추출
            String html = driver.getPageSource();

            // ✅ 페이지 전체 높이 계산
            JavascriptExecutor js = (JavascriptExecutor) driver;
            long scrollHeight = (Long) js.executeScript("return document.body.scrollHeight");

            // ✅ 전체 스크린샷 병합
            BufferedImage combined = new BufferedImage(1920, (int) scrollHeight, BufferedImage.TYPE_INT_RGB);
            Graphics2D g2d = combined.createGraphics();

            long scrolled = 0;
            while (scrolled < scrollHeight) {
                byte[] bytes = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
                BufferedImage img = ImageIO.read(new java.io.ByteArrayInputStream(bytes));

                int height = img.getHeight();
                if (scrolled + height > scrollHeight) {
                    height = (int) (scrollHeight - scrolled);
                    img = img.getSubimage(0, img.getHeight() - height, img.getWidth(), height);
                }

                g2d.drawImage(img, 0, (int) scrolled, null);
                scrolled += height;
                if (scrolled < scrollHeight)
                    js.executeScript("window.scrollTo(0, arguments[0]);", scrolled);

                Thread.sleep(400);
            }
            g2d.dispose();

            // ✅ 이미지 바이트 변환
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(combined, "png", baos);

            // ✅ 결과 묶어서 반환
            Map<String, Object> result = new HashMap<>();
            result.put("html", html);
            result.put("image", baos.toByteArray());
            return result;

        } finally {
            driver.quit();
        }
    }

    /**
     * 복합 컬럼 기반 크롤링 (기존 기능)
     */
    public List<Map<String, String>> crawlBySelectors(String url, String areaSelector, String itemSelector, Map<String, String> columns) throws Exception {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        WebDriver driver = new ChromeDriver(options);
        List<Map<String, String>> results = new ArrayList<>();

        try {
            driver.get(url);
            Thread.sleep(2000);

            List<WebElement> areas = driver.findElements(By.cssSelector(areaSelector));
            for (WebElement area : areas) {
                List<WebElement> items = area.findElements(By.cssSelector(itemSelector));
                for (WebElement item : items) {
                    Map<String, String> row = new HashMap<>();
                    for (Map.Entry<String, String> col : columns.entrySet()) {
                        try {
                            List<WebElement> colEls = item.findElements(By.cssSelector(col.getValue()));
                            if (!colEls.isEmpty()) {
                                row.put(col.getKey(), colEls.get(0).getText().trim());
                            } else {
                                row.put(col.getKey(), "");
                            }
                        } catch (Exception e) {
                            row.put(col.getKey(), "");
                        }
                    }
                    results.add(row);
                }
            }
        } catch (Exception e) {
            log.error("크롤링 중 오류 발생: {}", e.getMessage());
        } finally {
            driver.quit();
        }

        return results;
    }

    /**
     * ✅ 단일 Selector 기준 간단 추출 (프론트 검증용)
     * - 영역 선택 후 결과 미리보기용
     * - 단순히 text() 결과만 반환
     */
    public List<String> crawlSimpleExtract(String url, String areaSelector, String itemSelector) throws Exception {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        WebDriver driver = new ChromeDriver(options);
        List<String> results = new ArrayList<>();

        try {
            driver.get(url);
            Thread.sleep(2000);

            // 선택된 영역 내에서만 탐색
            List<WebElement> areas = driver.findElements(By.cssSelector(areaSelector));
            for (WebElement area : areas) {
                List<WebElement> items = area.findElements(By.cssSelector(itemSelector));
                for (WebElement item : items) {
                    results.add(item.getText().trim());
                }
            }

        } catch (Exception e) {
            log.error("간단 추출 중 오류 발생: {}", e.getMessage());
            throw e;
        } finally {
            driver.quit();
        }

        return results;
    }

    /** 미리보기 하이라이트 */
    public Map<String, Object> getElementRect(String url, String selector) throws Exception {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--window-size=1920,1080");

        WebDriver driver = new ChromeDriver(options);

        try {
            driver.get(url);
            Thread.sleep(2000);

            WebElement element = driver.findElement(By.cssSelector(selector));
            Point location = element.getLocation();
            Dimension size = element.getSize();

            Map<String, Object> rect = new HashMap<>();
            rect.put("x", location.getX());
            rect.put("y", location.getY());
            rect.put("width", size.getWidth());
            rect.put("height", size.getHeight());

            return rect;
        } finally {
            driver.quit();
        }
    }
}