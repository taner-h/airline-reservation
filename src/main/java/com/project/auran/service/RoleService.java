package com.project.auran.service;

import com.project.auran.model.Airline;
import com.project.auran.model.Role;
import com.project.auran.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    public Role addNewRole(Role role) {
        Optional<Role> roleOptional = roleRepository.findByName(role.getName());
        if (roleOptional.isPresent()) throw new RuntimeException("a role by that name already exists.");
        roleRepository.save(role);
        return role;
    }
}
