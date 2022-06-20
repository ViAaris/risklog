package com.bygst.risikolog.service;

import com.bygst.risikolog.model.User;
import com.bygst.risikolog.repositories.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Optional<User> loadUserByUsername(String username) {
        Optional<User> user = usersRepository.findByUsername(username);
        return user;
    }
}
