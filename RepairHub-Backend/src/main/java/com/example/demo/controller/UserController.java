package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // Register user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        User registeredUser = userService.registerUser(user);

        if (registeredUser == null) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message",
                            "Email already registered"
                    ));
        }

        return ResponseEntity.ok(registeredUser);
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody Map<String, String> loginData) {

        String email = loginData.get("email");
        String password = loginData.get("password");

        User user = userService.loginUser(email, password);

        if (user == null) {

            return ResponseEntity
                    .status(401)
                    .body(Map.of(
                            "message",
                            "Invalid email or password"
                    ));
        }

        return ResponseEntity.ok(user);
    }

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Get user by email
    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

 // Update customer profile
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User user
    ) {

        User updatedUser =
                userService.updateUser(id, user);

        if (updatedUser == null) {

            return ResponseEntity
                    .status(404)
                    .body(
                        Map.of(
                            "message",
                            "User not found"
                        )
                    );
        }

        return ResponseEntity.ok(updatedUser);
    }
    // Delete user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
 // Pending technicians for admin

    @GetMapping("/technicians/pending")
    public List<User> getPendingTechnicians(){

        return userService.getPendingTechnicians();

    }

    @GetMapping("/technicians")
    public List<User> getVerifiedTechnicians(){

        return userService.getVerifiedTechnicians();

    }

    // Approve technician
   
    @PutMapping("/technician/approve/{id}")
    public User approveTechnician(
            @PathVariable Long id){

        return userService.approveTechnician(id);

    }



    // Reject technician

    @PutMapping("/technician/reject/{id}")
    public User rejectTechnician(
            @PathVariable Long id){

        return userService.rejectTechnician(id);

    }
    
    
}