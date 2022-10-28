package com.backend.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.backend.backend.model.User;
import com.backend.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUserDetails() {
        List<User> userList = (List<User>) userRepository.findAll();
        return userList;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User fetchUserByEmailId(String email) {
        return userRepository.findByEmail(email);
    }

    public User fetchUserByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}
