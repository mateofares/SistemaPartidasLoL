package com.loader;

import com.model.*;
import com.repository.ChampionRepository;
import com.repository.MatchRepository;
import com.repository.ParticipationRepository;
import com.repository.PlayerRepository;
import jakarta.servlet.http.Part;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DataLoader implements CommandLineRunner {
    private final ChampionRepository championRepo;
    private final PlayerRepository playerRepo;
    private final MatchRepository matchRepo;
    private final ParticipationRepository participationRepo;

    public DataLoader(ChampionRepository championRepo,
                      PlayerRepository playerRepo,
                      MatchRepository matchRepo,
                      ParticipationRepository participationRepo) {
        this.championRepo = championRepo;
        this.playerRepo = playerRepo;
        this.matchRepo = matchRepo;
        this.participationRepo = participationRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        Champion teemo = new Champion();
        teemo.setDescription("tejon gay" );
        teemo.setDifficulty(Difficulty.MEDIUM);
        teemo.setName("Teemo");
        teemo.setRoles(Set.of(Role.TOP,Role.JUNGLE));
        teemo.setTypeDamages(Set.of(TypeDamage.PHYSICAL,TypeDamage.MAGIC));
        championRepo.save(teemo);

        Player mateo = playerRepo.save(
                new Player("Mateo")
        );

        Match match = new Match(TeamSide.Blue_Side, LocalDate.now());

        Participation participation = new Participation(Role.TOP,
                TeamSide.Blue_Side,
                mateo,
                match,
                teemo);
        matchRepo.save(match);
        participationRepo.save(participation);

            if (championRepo.count() > 1) return;

            List<String> lines = Files.readAllLines(
                    Paths.get("src/main/resources/champions.csv")
            );

            for (int i = 1; i < lines.size(); i++) {

                String[] data = lines.get(i).split(",");

                Champion champion = new Champion();
                champion.setName(data[0]);
                champion.setDescription(data[1]);
                champion.setDifficulty(Difficulty.valueOf(data[2]));

                // Roles
                Set<Role> roles = Arrays.stream(data[3].split("\\|"))
                        .map(Role::valueOf)
                        .collect(Collectors.toSet());
                champion.setRoles(roles);

                // Damage types
                Set<TypeDamage> damages = Arrays.stream(data[4].split("\\|"))
                        .map(TypeDamage::valueOf)
                        .collect(Collectors.toSet());
                champion.setTypeDamages(damages);

                championRepo.save(champion);
            }

            System.out.println("Champions loaded successfully");
    }
}
