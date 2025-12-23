package com.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name="champion")
public class Champion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // to not repeat Id
    private int id;
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

    public Champion(){};

    //setters


    public void setDescription(String description) {
        this.description = description;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public void setId(int id) {
        this.id = id;
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
}
