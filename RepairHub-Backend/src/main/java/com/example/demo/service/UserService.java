package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register User
    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return null;
        }

        return userRepository.save(user);
    }

    // Login User
    public User loginUser(String email, String password) {

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();

            if (user.getPassword().equals(password)) {
                return user;
            }
        }

        return null;
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Get user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // Update user
 // Update customer profile
    public User updateUser(
            Long id,
            User updatedUser
    ) {

        Optional<User> optionalUser =
                userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return null;
        }

        User existingUser =
                optionalUser.get();

        if (
            updatedUser.getFullName() != null &&
            !updatedUser.getFullName().trim().isEmpty()
        ) {

            existingUser.setFullName(
                    updatedUser.getFullName().trim()
            );
        }

        if (
            updatedUser.getPhone() != null &&
            !updatedUser.getPhone().trim().isEmpty()
        ) {

            existingUser.setPhone(
                    updatedUser.getPhone().trim()
            );
        }

        if (
            updatedUser.getAddress() != null &&
            !updatedUser.getAddress().trim().isEmpty()
        ) {

            existingUser.setAddress(
                    updatedUser.getAddress().trim()
            );
        }

        /*
         * Email, password and role are not changed
         * from the customer profile page.
         */

        return userRepository.save(existingUser);
    }
    // Delete user
    public String deleteUser(Long id) {

        if (userRepository.existsById(id)) {

            userRepository.deleteById(id);

            return "User deleted successfully!";
        }

        return "User not found!";
    }
    
    
 // Get pending technicians
    public List<User> getPendingTechnicians(){

        return userRepository
                .findByRoleAndAccountStatus(
                        "TECHNICIAN",
                        "PENDING"
                );
    }



    // Approve technician
    public User approveTechnician(Long id){

        Optional<User> optionalUser =
                userRepository.findById(id);


        if(optionalUser.isEmpty()){

            return null;
        }


        User user = optionalUser.get();


        user.setAccountStatus(
                "VERIFIED"
        );


        return userRepository.save(user);
    }



    // Reject technician
    public User rejectTechnician(Long id){

        Optional<User> optionalUser =
                userRepository.findById(id);


        if(optionalUser.isEmpty()){

            return null;
        }


        User user = optionalUser.get();


        user.setAccountStatus(
                "REJECTED"
        );


        return userRepository.save(user);
    }
    
    public List<User> getVerifiedTechnicians(){

        return userRepository
                .findByRoleAndAccountStatus(
                        "TECHNICIAN",
                        "VERIFIED"
                );

    }
}