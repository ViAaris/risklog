package com.bygst.risikolog.service;

import com.bygst.risikolog.exceptions.InvalidDataException;
import com.bygst.risikolog.model.Role;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.repositories.UsersRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class UsersService {

    private final UsersRepository usersRepository;

    public User save(User user) throws InvalidDataException {
        return usersRepository.save(user);
    }

    public User getUser(int id) throws InvalidDataException {

        return usersRepository.findById(id).get();
    }



    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Optional<User> loadUserByUsername(String username) {
        return usersRepository.findByUsername(username);
    }
}
