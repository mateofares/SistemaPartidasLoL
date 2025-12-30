package com.service;

import com.dto.ChampionDTO;
import com.exceptions.NotFoundException;
import com.mapper.MapperChampion;
import com.model.Champion;
import com.model.Difficulty;
import com.model.Role;
import com.repository.ChampionRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChampionService implements IChampionService{

    private ChampionRepository championRepository;
    private MapperChampion mapperChampion;

    public ChampionService(ChampionRepository championRepository,
                           MapperChampion mapperChampion){
        this.championRepository=championRepository;
        this.mapperChampion=mapperChampion;
    }

    @Override
    public List<ChampionDTO> getAllChampions() {
        List<ChampionDTO> championDTOS = new ArrayList<>(championRepository.findAll().size());
        for (Champion c : championRepository.findAll()){
            championDTOS.add(mapperChampion.toChampionDTO(c));
        }
        return championDTOS;
    }
    // ESTOS 3 LOS DEJO IGUAL ,PERO EL UNICO ENDPOINT QUE USO ES EL DEL FILTER
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
       // role = roleConverter.convert(String.valueOf(role));
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

    public List<ChampionDTO> filter(String name,Role role,Difficulty difficulty){
        List<Champion> champions = championRepository.findAll();

        if (name != null) {
            champions = champions.stream()
                    .filter(c -> c.getName().equalsIgnoreCase(name))
                    .toList();
        }

        if (role != null) {
            champions = champions.stream()
                    .filter(c -> c.getRoles().contains(role))
                    .toList();
        }

        if (difficulty != null) {
            champions = champions.stream()
                    .filter(c -> c.getDifficulty() == difficulty)
                    .toList();
        }

        return champions.stream()
                .map(c -> mapperChampion.toChampionDTO(c))
                .toList();
    }

    // estos despues, primero los getters
    @Override
    public void addChampion(ChampionDTO championDTO) {
        if (championDTO != null){
            Champion newChampion = new Champion(
                    championDTO.getDescription(),
                    championDTO.getDifficulty(),
                    championDTO.getName(),
                    championDTO.getRoles(),
                    championDTO.getTypeDamages()
            );
            championRepository.save(newChampion);
        } else {
            throw new RuntimeException("ChampionDTO is null");
        }
    }

    @Override
    public void deleteChampion(Long id) {
        if (championRepository.existsById(id)){
            championRepository.deleteById(id);
        } else {
            throw new RuntimeException("Not exists champion with id: "+id);
        }
    }

}
