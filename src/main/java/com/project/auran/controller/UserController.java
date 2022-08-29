package com.project.auran.controller;

import com.project.auran.model.Airline;
import com.project.auran.model.User;
import com.project.auran.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.management.DescriptorKey;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Page<User> getUsers(@RequestParam(defaultValue = "0") Integer page,
                                     @RequestParam(defaultValue = "20") Integer pageSize,
                                     @RequestParam(defaultValue = "id") String sortBy) {
        return userService.getUsers(page, pageSize, sortBy);
    }

    @GetMapping(path = "{userId}")
    public User getUser(@PathVariable Long userId){
        return userService.getUser(userId);
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PutMapping(path = "{userId}/role/{roleId}")
    public User addRoleToUser(@PathVariable Long userId,
                              @PathVariable Long roleId){
        return userService.addRoleToUser(userId, roleId);
    }

    @PutMapping(path = "{userId}/revokeRole/{roleId}")
    public User revokeRoleFromUser(@PathVariable Long userId,
                              @PathVariable Long roleId){
        return userService.revokeRoleFromUser(userId, roleId);
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(path ="{userId}" )
    public void deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
    }


}
