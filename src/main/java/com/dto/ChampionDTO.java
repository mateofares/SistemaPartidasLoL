package com.dto;

import com.model.Difficulty;
import com.model.Role;
import com.model.TypeDamage;

import java.util.Set;

public class ChampionDTO {

    private Long id;
    private String name;
    private String description;
    private Set<Role> roles;
    private Difficulty difficulty;
    private Set<TypeDamage> typeDamages;

    public ChampionDTO() {};
    public ChampionDTO(
            Long id,
            String name,
            String description,
            Set<Role> roles,
            Difficulty difficulty,
            Set<TypeDamage> typeDamages
    ){
        this.id=id;
        this.description=description;
        this.name=name;
        this.roles=roles;
        this.difficulty=difficulty;
        this.typeDamages=typeDamages;
    }

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

    public Set<Role> getRoles() {
        return roles;
    }

    public Set<TypeDamage> getTypeDamages() {
        return typeDamages;
    }
}
