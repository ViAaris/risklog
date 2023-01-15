package com.bygst.risikolog.repositories;

import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("""
        select distinct u
        from users u
        left join fetch u.projects
        """)
    List<User> findAllWithProjects(

    );
}
