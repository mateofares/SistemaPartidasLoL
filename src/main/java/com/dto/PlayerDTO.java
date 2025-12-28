package com.dto;

import com.model.Champion;
import com.model.Elo;
import com.model.Region;

import java.util.List;

public class PlayerDTO {
    private long id;
    private String nickname;
    private Region region;
    private int level;
    private Elo elo;

    public PlayerDTO(){};

    public PlayerDTO(long id, String nickname, Region region, int level,Elo elo) {
        this.id = id;
        this.nickname = nickname;
        this.region=region;
        this.level=level;
        this.elo=elo;
    }

    public Elo getElo() {
        return elo;
    }

    public long getId() {
        return id;
    }

    public int getLevel() {
        return level;
    }

    public String getNickname() {
        return nickname;
    }

    public Region getRegion() {
        return region;
    }
}
