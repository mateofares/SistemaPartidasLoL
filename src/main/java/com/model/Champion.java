package com.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name="champion")
public class Champion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // to not repeat Id
    private Long id;
    private String name;
    private String description;
    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<TypeDamage> typeDamages;

    @OneToMany(mappedBy = "champion")
    private Set<Participation> participations;

    public Champion(){};

    //setters


    public void setDescription(String description) {
        this.description = description;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void setTypeDamages(Set<TypeDamage> typeDamages) {
        this.typeDamages = typeDamages;
    }

    //getters


    public String getDescription() {
        return description;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<Participation> getParticipations() {
        return participations;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Set<TypeDamage> getTypeDamages() {
        return typeDamages;
    }
}
