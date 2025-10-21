package com.example.demo.ui;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.Alert;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

@Tag("ui") // optional: helps you exclude this test group in CI if needed
public class AddItemUITest {

    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        // Automatically sets up geckodriver (no need for manual path)
        WebDriverManager.firefoxdriver().setup();

        FirefoxOptions options = new FirefoxOptions();

        // Run in headless mode when in CI (GitHub Actions)
        if (System.getenv("CI") != null) {
            options.addArguments("--headless");
            options.addArguments("--disable-gpu");
            options.addArguments("--no-sandbox");
        }

        driver = new FirefoxDriver(options);

        // Load your app (adjust port/URL if needed)
        driver.get("http://localhost:3000/additem");
    }

    @Test
    public void testAddItem() {
        driver.findElement(By.name("name")).sendKeys("Rice");
        driver.findElement(By.name("category")).sendKeys("Food Items");
        driver.findElement(By.name("quantity")).sendKeys("5");
        driver.findElement(By.name("price")).sendKeys("100");
        driver.findElement(By.name("minimumStock")).sendKeys("1");
        driver.findElement(By.name("date")).sendKeys("2025-10-14");

        driver.findElement(By.cssSelector("button[type='submit']")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.alertIsPresent());

        Alert alert = driver.switchTo().alert();
        String alertText = alert.getText();
        alert.accept();

        assertTrue(alertText.contains("Item added successfully"), "Should show success alert");

        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.contains("/dashboard"), "Should navigate to dashboard after adding item");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
