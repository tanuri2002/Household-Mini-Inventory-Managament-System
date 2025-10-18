package com.example.demo.ui;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class AddItemUITest {

    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        // Specify the path to geckodriver.exe (update this path to where you saved it)
        System.setProperty("webdriver.gecko.driver", "C:\\Drivers\\geckodriver.exe"); // Adjust this path
        FirefoxOptions options = new FirefoxOptions();
        //options.addArguments("--headless"); // Run in headless mode for CI
        driver = new FirefoxDriver(options);
        driver.get("http://localhost:3000/additem"); // Adjust to your React app's add item URL
    }

    @Test
    public void testAddItem() {
        // Fill in the form fields
        driver.findElement(By.name("name")).sendKeys("Rice");
        driver.findElement(By.name("category")).sendKeys("Food Items"); // Select from dropdown
        driver.findElement(By.name("quantity")).sendKeys("5");
        driver.findElement(By.name("price")).sendKeys("100");
        driver.findElement(By.name("minimumStock")).sendKeys("1");
        driver.findElement(By.name("date")).sendKeys("2025-10-14"); // Use current or valid date

        // Click the Add Item button
        driver.findElement(By.cssSelector("button[type='submit']")).click();

        // Wait for the alert or navigation
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.alertIsPresent());

        // Switch to alert and accept
        org.openqa.selenium.Alert alert = driver.switchTo().alert();
        String alertText = alert.getText();
        alert.accept();

        // Verify the success message
        assertTrue(alertText.contains("Item added successfully"), "Should show success alert");

        // Optionally verify navigation to /dashboard
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