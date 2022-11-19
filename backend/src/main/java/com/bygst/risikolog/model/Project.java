package com.bygst.risikolog.model;

import lombok.*;

import javax.persistence.*;
import java.util.*;

import static javax.persistence.CascadeType.*;

@NoArgsConstructor
@Data
@Entity
@Table(name = "Project")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", unique = true, nullable = false)
    private String title;

    @Column(name = "address")
    private String address;

    @Column(name = "budget")
    private long budget;

    @Column(name="finishing_date")
    @Temporal(TemporalType.DATE)
    private Date finishingDate;

    @Column(name="starting_date")
    @Temporal(TemporalType.DATE)
    private Date startingDate;

    @ElementCollection
    @CollectionTable(name="project_contractors", joinColumns=@JoinColumn(name="project_id"))
    @OrderColumn
    private List<String> contractors;

    @ElementCollection
    @CollectionTable(name="project_advisers", joinColumns=@JoinColumn(name="project_id"))
    @OrderColumn
    private List<String> advisers;

    @OneToMany(mappedBy = "project", cascade = ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @ToString.Exclude
    @OrderColumn(name = "index")
    private Set<UserProject> team;

    @OneToMany(fetch = FetchType.LAZY, cascade = ALL, orphanRemoval = true)
//    @JoinTable(name="project_risks",
//            joinColumns = @JoinColumn(name="project_id"),
//            inverseJoinColumns = @JoinColumn(name="risks_id"))
    @OrderColumn(name = "index")
    private List<Risk> risks;

    public void addRiskToProject(Risk risk){
        if(risks ==  null)risks = new ArrayList<>();
        risks.add(risk);
    }

    public void addTeamMember(User user){
        if(team ==  null)team = new HashSet<>();
        UserProject userProject = new UserProject(this, user);
        team.add(userProject);
        user.getProjects().add( userProject);
    }

    public void removeTeamMember(User user) {
        UserProject userProject = new UserProject( this, user);
        user.getProjects().remove(userProject);
        team.remove(userProject);
        userProject.setProject(null);
        userProject.setUser(null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return budget == project.budget && title.equals(project.title) && Objects.equals(address, project.address) && Objects.equals(finishingDate, project.finishingDate) && Objects.equals(startingDate, project.startingDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, address, budget, finishingDate, startingDate);
    }
}
