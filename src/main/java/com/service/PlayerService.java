package com.service;

import com.dto.ChampionDTO;
import com.dto.PlayerDTO;
import com.dto.PlayerStatsDTO;
import com.dto.PlayerWithChampionStatsDTO;
import com.mapper.MapperChampion;
import com.mapper.MapperPlayer;
import com.model.Elo;
import com.model.Participation;
import com.model.Player;
import com.model.Region;
import com.repository.PlayerRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
@Transactional
public class PlayerService implements IPlayerService {
    private PlayerRepository playerRepository;
    private MapperPlayer mapperPlayer;
    private MapperChampion mapperChampion;

    public PlayerService(MapperPlayer mapperPlayer, PlayerRepository playerRepository,
                         MapperChampion mapperChampion) {
        this.mapperPlayer = mapperPlayer;
        this.playerRepository = playerRepository;
        this.mapperChampion = mapperChampion;
    }

    @Override
    public List<PlayerDTO> getAllPlayers() {
        return playerRepository.findAll().stream().map(p -> mapperPlayer.toPlayerDTO(p)).toList();
    }

    @Override
    public List<PlayerDTO> filter(Long id, String nickname, Region region, Integer level, Elo elo) {
        List<PlayerDTO> players = getAllPlayers();

        if (id != null) {
            players = players.stream().filter(p -> p.getId() == id).toList();
        }
        if (nickname != null) {
            players = players.stream().filter(p -> p.getNickname().equalsIgnoreCase(nickname)).toList();
        }
        if (region != null) {
            players = players.stream().filter(p -> p.getRegion() == region).toList();
        }
        if (level != null) {
            players = players.stream().filter(p -> p.getLevel() == level).toList();
        }
        if (elo != null) {
            players = players.stream().filter(p -> p.getElo() == elo).toList();
        }

        return players;
    }

    @Override
    public void addPlayer(PlayerDTO playerDTO) {
        if (playerDTO != null) {
            Player newPlayer = new Player(
                    playerDTO.getNickname(),
                    playerDTO.getLevel(),
                    playerDTO.getRegion(),
                    playerDTO.getElo()
            );
            playerRepository.save(newPlayer);
        } else {
            throw new RuntimeException("PlayerDTO is null");
        }
    }

    private boolean existsByNickname(String nickname) {
        return getAllPlayers().stream().anyMatch(p -> p.getNickname().equals(nickname));
    }

    @Override
    public void updatePlayer(Long id, String nickname, Region region, Integer level, Elo elo) {
        Player player = playerRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Player doesn't exist"));

        if (nickname != null && !existsByNickname(nickname)) {
            player.setNickname(nickname);
        }
        if (region != null) {
            player.setRegion(region);
        }
        if (level != null) {
            player.setLevel(level);
        }
        if (elo != null) {
            player.setElo(elo);
        }

    }

    @Override
    public void deletePlayer(Long id) {
        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Player doesn't exist"));
        playerRepository.delete(player);
    }

    private int getTotal(Long id) {
        Player player = playerRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Not exists player with that id"));

        return player.getParticipations().size();
    }

    private int getWins(Set<Participation> participations) {

        int wins = participations.stream().filter(participation ->
                participation.getMatch().getTeamWinner() == participation.getTeamSide()).toList().size();

        return wins;
    }

    private int getLosses(Set<Participation> participations) {

        int losses = participations.stream().filter(participation ->
                participation.getMatch().getTeamWinner() != participation.getTeamSide()).toList().size();

        return losses;
    }

    public List<PlayerWithChampionStatsDTO> getChampsStats(Long id) {

        Player player = playerRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Not exists player with that id"));

        Set<Participation> participations = player.getParticipations();

        Map<Long, PlayerWithChampionStatsDTO> statsMap = new HashMap<>();

        for (Participation p : participations) {

            Long champId = p.getChampion().getId();
            String champName = p.getChampion().getName();

            // Si no existe, lo creamos
            statsMap.putIfAbsent(
                    champId,
                    new PlayerWithChampionStatsDTO(champId, champName, 0, 0,0,0)
            );
            //agarro las stats que tiene ese player con ese champ
            PlayerWithChampionStatsDTO stats = statsMap.get(champId);

            // Aumentamos partidas
            stats.setTotalMatches(stats.getTotalMatches() + 1);

            // Si ganó o perdio, aumentamos wins o losses
            if (p.getMatch().getTeamWinner()==p.getTeamSide()) {
                stats.setWins(stats.getWins()+1);
            } else {
                stats.setLosses(stats.getLosses() + 1);
            }

            stats.setWinrate(((double) stats.getWins() / stats.getTotalMatches()) * 100);

        }

        return new ArrayList<>(statsMap.values());
    }

    public PlayerStatsDTO getStats(Long id){

        Player player = playerRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Not exists player with that id"));

        Set<Participation> participations = player.getParticipations();

        int wins = getWins(participations);
        int losses = getLosses(participations);
        int total = wins+losses;
        double winrate = 0;
        if (total > 0) {
            winrate = ((double) wins / total) * 100;
        }
        return new PlayerStatsDTO(
                losses,
                id,
                total,
                winrate,
                wins
        );


    }


}
