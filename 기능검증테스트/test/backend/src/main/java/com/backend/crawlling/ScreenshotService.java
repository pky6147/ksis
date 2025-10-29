package com.backend.crawlling;

import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ScreenshotService {

    public ResponseEntity<byte[]> captureFullPage(String url) {
        try {
            byte[] imageBytes = captureFullPageBytes(url);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            log.error("스크린샷 실패: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(null);
        }
    }

    public byte[] captureFullPageBytes(String url) throws Exception {
        log.info("전체 스크린샷 시작: {}", url);

        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new", "--no-sandbox", "--disable-dev-shm-usage");
        options.addArguments("--window-size=1920,1080");

        WebDriver driver = new ChromeDriver(options);

        try {
            driver.get(url);
            Thread.sleep(3000);

            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript(
                    "document.querySelectorAll('header, footer, .sticky').forEach(e => e.style.display='none');"
            );

            long scrollHeight = (Long) js.executeScript("return document.body.scrollHeight");
            List<BufferedImage> captures = new ArrayList<>();
            long scrolled = 0;

            while (scrolled < scrollHeight) {
                byte[] bytes = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
                BufferedImage img = ImageIO.read(new ByteArrayInputStream(bytes));

                long remaining = scrollHeight - scrolled;
                int cropHeight = img.getHeight();
                if (remaining < img.getHeight()) {
                    cropHeight = (int) remaining;
                    img = img.getSubimage(0, img.getHeight() - cropHeight, img.getWidth(), cropHeight);
                }

                captures.add(img);

                int scrollStep = (remaining < img.getHeight()) ? (int) remaining : img.getHeight();
                scrolled += scrollStep;
                if (scrolled < scrollHeight) {
                    js.executeScript("window.scrollTo(0, arguments[0]);", scrolled);
                    Thread.sleep(400);
                }
            }

            int width = captures.get(0).getWidth();
            int totalHeight = captures.stream().mapToInt(BufferedImage::getHeight).sum();
            BufferedImage combined = new BufferedImage(width, totalHeight, BufferedImage.TYPE_INT_RGB);

            Graphics2D g2d = combined.createGraphics();
            int y = 0;
            for (BufferedImage img : captures) {
                g2d.drawImage(img, 0, y, null);
                y += img.getHeight();
            }
            g2d.dispose();

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(combined, "png", baos);
            return baos.toByteArray();

        } finally {
            driver.quit();
        }
    }
}