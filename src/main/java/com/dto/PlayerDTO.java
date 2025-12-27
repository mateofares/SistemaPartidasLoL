package com.dto;

import com.model.Champion;

import java.util.List;

public class PlayerDTO {
    private long id;
    private String nickname;

    public PlayerDTO(){};

    public PlayerDTO(long id,String nickname) {
        this.id = id;
        this.nickname = nickname;
    }
}
