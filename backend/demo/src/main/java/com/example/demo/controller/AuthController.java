package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        User savedUser = userService.signup(user) ;
        return ResponseEntity.ok(savedUser);
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User loginRequest) {
//        User user = userService.authenticateByEmail(loginRequest.getEmail(), loginRequest.getPassword());
//        String token = jwtUtil.generateToken(user.getEmail());
//
//        // return both token and username
//        return ResponseEntity.ok(
//                Map.of(
//                        "token", token,
//                        "username", user.getUsername()
//                )
//        );
//    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User loginRequest, HttpServletResponse response) {
//        try {
//            User user = userService.authenticateByEmail(loginRequest.getEmail(), loginRequest.getPassword());
//            if (user != null) {
//                String token = jwtUtil.generateToken(user.getEmail());
//                // Set token in response (e.g., cookie or header for frontend)
//                response.addHeader("Authorization", "Bearer " + token);
//                // Redirect to home page
//                response.sendRedirect("/home"); // Adjust to match your frontend route
//                return null; // Response handled by redirect
//            } else {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed: " + e.getMessage());
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            User user = userService.authenticateByEmail(loginRequest.getEmail(), loginRequest.getPassword());
            if (user != null) {
                String token = jwtUtil.generateToken(user.getEmail());

                // RETURN JSON - NO REDIRECT!
                return ResponseEntity.ok(
                        Map.of(
                                "success", true,
                                "token", token,
                                "username", user.getUsername(),
                                "message", "Login successful"
                        )
                );
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("success", false, "message", "Invalid credentials"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "Login failed: " + e.getMessage()));
        }
    }

}