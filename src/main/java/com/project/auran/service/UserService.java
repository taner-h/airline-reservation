package com.project.auran.service;

import com.project.auran.model.Role;
import com.project.auran.model.User;
import com.project.auran.repository.RoleRepository;
import com.project.auran.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("no user found with given id"));

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                authorities);
    }

    public Page<User> getUsers(Integer page, Integer pageSize, String sortBy) {
        return userRepository.findAll(PageRequest.of(page, pageSize, Sort.Direction.ASC, sortBy));

    }

    public User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("no user found with given id (" + userId + ")"));
    }

    public User addUser(User user) {
        Optional<User> userEmailOptional = userRepository.findUserByEmail(user.getEmail());
        if (userEmailOptional.isPresent())
            throw new RuntimeException("a user by that email already exists.");
        Optional<User> usernameOptional = userRepository.findUserByUsername(user.getUsername());
        if (usernameOptional.isPresent())
            throw new RuntimeException("a user by that email already exists.");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.getRoles().add(new Role(
                (long) 2,
                "USER"));
        userRepository.save(user);
        return user;
    }

    public User addRoleToUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("no user found with given id"));

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalStateException("no role found with given id"));
        user.getRoles().add(role);
        userRepository.save(user);
        return user;

    }

    public void deleteUser(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("no user found with given id"));
        userRepository.deleteById(userId);
    }

    public User revokeRoleFromUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("no user found with given id"));

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalStateException("no role found with given id"));
        user.getRoles().remove(role);
        userRepository.save(user);
        return user;

    }
}
