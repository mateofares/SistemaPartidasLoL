package com.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Check;

import java.util.Set;

@Entity
@Table(name = "player")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;
    @Check(constraints = "level > 0")
    private int level;
    @Enumerated(EnumType.STRING)
    private Elo elo;
    @Enumerated(EnumType.STRING)
    private Region region;

    @OneToMany(mappedBy = "player")
    private Set<Participation> participations;

    public Player(){}

    public Player(String nickname,int level,Region region,Elo elo){
        this.nickname=nickname;
        this.level=level;
        this.region=region;
        this.elo=elo;
    }

    public void setElo(Elo elo) {
        this.elo = elo;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Long getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    public int getLevel() {
        return level;
    }

    public Region getRegion() {
        return region;
    }

    public Elo getElo() {
        return elo;
    }

    public Set<Participation> getParticipations() {
        return participations;
    }
}
