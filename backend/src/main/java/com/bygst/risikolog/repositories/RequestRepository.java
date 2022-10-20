package com.bygst.risikolog.repositories;


import com.bygst.risikolog.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    void deleteByProjectId(Long projectId);
}
