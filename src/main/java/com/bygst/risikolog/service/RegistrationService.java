package com.bygst.risikolog.service;

import com.bygst.risikolog.model.Role;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.repositories.RoleRepository;
import com.bygst.risikolog.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;


/**
 * @author Neil Alishev
 */
@Service
@Transactional
public class RegistrationService {

    private final UsersRepository usersRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;



    @Autowired
    public RegistrationService(UsersRepository usersRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public void register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        ArrayList<Role> roles = new ArrayList<>();
        roles.add(roleRepository.findByRole("ROLE_USER").get());
        user.setRoles(roles);
        usersRepository.save(user);
    }


}
