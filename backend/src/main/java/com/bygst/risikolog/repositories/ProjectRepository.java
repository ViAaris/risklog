package com.bygst.risikolog.repositories;

import com.bygst.risikolog.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {


    Optional<Project> findByTitle(String title);

//
//    @Query("""
//        select distinct p
//        from Project p
//        left join fetch p.risks
//        """)
//    List<Project> findAllWithRisks(
//
//    );

    @Query("""
        select distinct p
        from Project p
        left join fetch p.team
        """)
    List<Project> findAllWithTeam(

    );

    @Query("""
        select distinct p
        from Project p
        left join fetch p.team
        WHERE p.id = :id
        """)
    Project findByIdAndFetchTeamEagerly(@Param("id") Long id);

    @Query("""
        select distinct p
        from Project p
        left join fetch p.risks
        WHERE p.id = :id
        """)
    Project findByIdAndFetchRisks(@Param("id") Long id);



}
