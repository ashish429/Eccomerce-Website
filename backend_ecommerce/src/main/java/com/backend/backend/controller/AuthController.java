package com.backend.backend.controller;

import com.backend.backend.model.User;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.service.UserService;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @SuppressWarnings("unused")
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

//  Insert User Details REST API
    @PostMapping("/users")
    @ResponseBody
    public User User(@RequestBody User user) throws Exception {
        String tempEmailId = user.getEmail();
        if (tempEmailId != null && !"".equals(tempEmailId)) {
            User userobj = userService.fetchUserByEmailId(tempEmailId);
            if (userobj != null) {
                throw new Exception("User with " + tempEmailId + " is already exist");
            }
        }
        User userObj = null;
        userObj = (userService).saveUser(user);
        return userObj;
    }

//  --------------------User Login Control-----------------------
    @RequestMapping(value = "/allusers", method = RequestMethod.GET)
    @ResponseBody
    public List<User> getUserDetails() {
        List<User> userList = userService.getAllUserDetails();
        return userList;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> loginUser(@RequestBody User user) throws Exception {
        String tempEmail = user.getEmail();
        String tempPass = user.getPassword();
        User userObj = null;
        if (tempEmail != null && tempPass != null) {
            userObj = userService.fetchUserByEmailAndPassword(tempEmail, tempPass);
        }
        if (userObj == null) {
            return (ResponseEntity<?>) ResponseEntity.internalServerError();
        }
        return ResponseEntity.ok(userObj);
    }
    /*
     * @PostMapping(value="/login")
     * 
     * @ResponseBody
     * public ResponseEntity<String> loginUser(@RequestBody User user) throws
     * Exception {
     * String tempEmail = user.getEmail();
     * String tempPass = user.getPassword();
     * User userObj = null;
     * if(tempEmail != null && tempPass != null){
     * userObj = userService.fetchUserByEmailAndPassword(tempEmail,tempPass);
     * }
     * if(userObj == null){
     * return new
     * ResponseEntity<>("Wrong User please write the correct input or signup"
     * ,HttpStatus.NOT_FOUND);
     * }
     * return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
     * }
     */

    @DeleteMapping(path = "/users/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable("id") int id) {
        try {
            userRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (NoSuchElementException nse) {
            nse.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteUser(@RequestBody User user) {
        try {
            userRepository.delete(user);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (NoSuchElementException nse) {
            nse.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}
