package com.bygst.risikolog.repositories;

import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.authentication.jaas.JaasPasswordCallbackHandler;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {


    Optional<Project> findByTitle(String title);


    @Query("""
        select distinct p
        from Project p
        left join fetch p.risks
        """)
    List<Project> findAllWithRisks(

    );

    @Query("""
        select distinct p
        from Project p
        left join fetch p.team
        """)
    List<Project> findAllWithTeam(

    );

    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.team WHERE p.id = :id")
    Project findByIdAndFetchTeamEagerly(@Param("id") Integer id);


}
