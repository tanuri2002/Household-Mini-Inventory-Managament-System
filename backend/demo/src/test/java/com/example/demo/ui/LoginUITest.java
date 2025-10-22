package com.example.demo.ui;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.support.ui.*;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginUITest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        // Detect environment (local vs GitHub Actions)
        boolean isCI = System.getenv("GITHUB_ACTIONS") != null;

        // Only set geckodriver path for Windows (local)
        if (!isCI) {
            System.setProperty("webdriver.gecko.driver", "C:\\Drivers\\geckodriver.exe");
        }

        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--width=1920", "--height=1080");

        // Run headless on CI
        if (isCI) {
            options.addArguments("--headless");
        }

        driver = new FirefoxDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.manage().window().maximize();

        driver.get("http://localhost:3000/login");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.name("email")));
        System.out.println("Opened login page successfully");
    }

    @Test
    public void testSuccessfulLogin() {
        System.out.println("Starting login test...");

        driver.findElement(By.name("email")).sendKeys("test@example.com");
        driver.findElement(By.name("password")).sendKeys("test");
        driver.findElement(By.cssSelector("button[type='submit']")).click();

        try {
            wait.until(ExpectedConditions.urlContains("/home"));
        } catch (Exception e) {
            throw new RuntimeException("Login failed or app not running on localhost:3000", e);
        }

        assertTrue(driver.getCurrentUrl().contains("/home"), "Expected /home after login");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            try {
                driver.quit();
                System.out.println("Browser closed");
            } catch (NoSuchSessionException ignored) {}
        }
    }
}
