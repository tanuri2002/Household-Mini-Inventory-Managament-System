package com.example.demo.ui;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import java.time.Duration;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginUITest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        System.setProperty("webdriver.gecko.driver", "C:\\Drivers\\geckodriver.exe");
        FirefoxOptions options = new FirefoxOptions();
        // options.addArguments("--headless"); // WATCH LIVE!
        driver = new FirefoxDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://localhost:3000/login");
    }

    @Test
    public void testSuccessfulLogin() {
        driver.findElement(By.name("email")).sendKeys("test@example.com");
        driver.findElement(By.name("password")).sendKeys("password123");
        driver.findElement(By.cssSelector("button[type='submit']")).click();

        // Wait for alert or URL change
        try {
            wait.until(ExpectedConditions.alertIsPresent());
            var alert = driver.switchTo().alert();
            System.out.println("ALERT: " + alert.getText());
            alert.accept();
            System.out.println("ALERT ACCEPTED");
        } catch (Exception e) {
            System.out.println("ℹNo alert found");
        }

        // Now wait for React navigation to /home
        try {
            Thread.sleep(2000); // give it 2s to finish navigate()
            wait.until(ExpectedConditions.urlToBe("http://localhost:3000/home"));
        } catch (Exception e) {
            System.out.println("Navigation wait timeout");
        }

        String currentUrl = driver.getCurrentUrl();
        System.out.println("🔍 FINAL URL: " + currentUrl);
        assertEquals("http://localhost:3000/home", currentUrl);
    }


    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}