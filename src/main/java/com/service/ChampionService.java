package com.service;

import com.converter.RoleConverter;
import com.dto.ChampionDTO;
import com.dto.PlayerDTO;
import com.exceptions.NotFoundException;
import com.mapper.MapperChampion;
import com.model.Champion;
import com.model.Difficulty;
import com.model.Role;
import com.repository.ChampionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ChampionService implements IChampionService{

    private ChampionRepository championRepository;
    private MapperChampion mapperChampion;
    private RoleConverter roleConverter;

    public ChampionService(ChampionRepository championRepository,
                           MapperChampion mapperChampion,
                           RoleConverter roleConverter){
        this.championRepository=championRepository;
        this.mapperChampion=mapperChampion;
        this.roleConverter=roleConverter;
    }

    @Override
    public List<ChampionDTO> getAllChampions() {
        List<ChampionDTO> championDTOS = new ArrayList<>(championRepository.findAll().size());
        for (Champion c : championRepository.findAll()){
            championDTOS.add(mapperChampion.toChampionDTO(c));
        }
        return championDTOS;
    }

    @Override
    public ChampionDTO findByNickname(String nickname) {
        for (ChampionDTO c : getAllChampions()){
            if (c.getName().equalsIgnoreCase(nickname)){
                return c;
            }
        }
        throw new NotFoundException("The Champion doesn't exist");
    }

    @Override
    public List<ChampionDTO> findByRole(Role role) {
        List<ChampionDTO> championsRole = new ArrayList<>();
        role = roleConverter.convert(String.valueOf(role));
        for (ChampionDTO c : getAllChampions()){
            if (c.getRoles().contains(role)){
                championsRole.add(c);
            }
        }
        return championsRole;
    }

    @Override
    public List<ChampionDTO> findByDifficulty(Difficulty difficulty) {
        List<ChampionDTO> championsRole = new ArrayList<>();
        for (ChampionDTO c : getAllChampions()){
            if (c.getDifficulty() == difficulty){
                championsRole.add(c);
            }
        }
        return championsRole;
    }
    // estos despues, primero los getters
    @Override
    public void addChampion() {

    }

    @Override
    public void deleteChampion() {

    }
}
