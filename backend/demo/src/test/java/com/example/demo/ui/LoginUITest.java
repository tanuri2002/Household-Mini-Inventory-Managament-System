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
import org.openqa.selenium.NoSuchSessionException;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginUITest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        System.setProperty("webdriver.gecko.driver", "C:\\Drivers\\geckodriver.exe");

        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--width=1920", "--height=1080"); // Stable size
        // options.addArguments("--headless"); // UNCOMMENT if needed

        driver = new FirefoxDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(20)); // 20s timeout
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10)); // Longer
        driver.manage().window().maximize();

        driver.get("http://localhost:3000/login");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.name("email")));
        System.out.println("Opened login page successfully");
    }

    @Test
    public void testSuccessfulLogin() {
        System.out.println("Starting login test...");

        // STEP 1: Enter credentials
        driver.findElement(By.name("email")).clear();
        driver.findElement(By.name("email")).sendKeys("test@example.com");
        driver.findElement(By.name("password")).clear();
        driver.findElement(By.name("password")).sendKeys("test");
        System.out.println("Entered credentials");

        // STEP 2: Click submit
        driver.findElement(By.cssSelector("button[type='submit']")).click();
        System.out.println("Clicked submit button");

        // STEP 3: NO ALERTS NEEDED - Your Login.js navigates directly!
        System.out.println("Direct navigation - no alerts!");

        // STEP 4: Wait for navigation (EXTRA STABLE)
        try {
            System.out.println("Waiting for navigation to /home...");
            wait.until(ExpectedConditions.urlContains("/home"));
            System.out.println("Navigation successful!");

        } catch (Exception e) {
            String currentUrl = driver.getCurrentUrl();
            System.out.println("CURRENT URL: " + currentUrl);

            // EXTRA DEBUG: Take screenshot
            try { Thread.sleep(3000); } catch (InterruptedException ie) {}

            throw new RuntimeException(
                    "Navigation failed! URL: " + currentUrl +
                            "\nOpen http://localhost:3000/login manually to debug", e);
        }

        // STEP 5: Final verification
        String finalUrl = driver.getCurrentUrl();
        System.out.println("FINAL URL: " + finalUrl);
        assertTrue(finalUrl.contains("/home"), "Expected /home");
        System.out.println("TEST PASSED!");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            try {
                Thread.sleep(2000); // Give 2s to finish
                driver.quit();
                System.out.println("Browser closed");
            } catch (Exception e) {
                System.out.println("Session closed");
            }
        }
    }
}