package com.bygst.risikolog.repositories;

import com.bygst.risikolog.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.jaas.JaasPasswordCallbackHandler;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {


    Optional<Project> findByTitle(String title);
}
