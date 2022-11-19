package com.bygst.risikolog.model;


import com.bygst.risikolog.util.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Request")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "projectId")
    private Long projectId;
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private RequestStatus status;
    @ManyToOne
    private User user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Request request = (Request) o;
        return id.equals(request.id) && projectId.equals(request.projectId) && status == request.status && user.equals(request.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, projectId, status, user);
    }
}
