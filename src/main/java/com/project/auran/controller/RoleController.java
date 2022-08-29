package com.project.auran.controller;

import com.project.auran.model.Role;
import com.project.auran.service.RoleService;
import com.project.auran.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "role")
public class RoleController {
    
    private final RoleService roleService;
   
    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }
    @GetMapping
    public List<Role> getRoles(){
        return roleService.getRoles();
    }

    @PostMapping
    public Role addNewRole(@RequestBody Role role){
        return roleService.addNewRole(role);
    }



}
