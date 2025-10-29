package com.backend.crawlling;

import java.io.IOException;
import java.net.URL;
import java.util.Scanner;

public class RobotsChecker {

    public static boolean isAllowed(String pageUrl) {
        try {
            URL url = new URL(pageUrl);
            String host = url.getProtocol() + "://" + url.getHost();
            URL robotsUrl = new URL(host + "/robots.txt");
            Scanner scanner = new Scanner(robotsUrl.openStream());
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine().trim();
                if (line.startsWith("Disallow:")) {
                    String disallowedPath = line.substring(9).trim();
                    if (!disallowedPath.isEmpty() && url.getPath().startsWith(disallowedPath)) {
                        return false;
                    }
                }
            }
            scanner.close();
        } catch (IOException e) {
            // robots.txt 없는 경우 허용
            return true;
        }
        return true;
    }
}