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
        if (championRepo.count() > 0 || playerRepo.count() > 0) {
            return; // evita duplicar datos
        }

        /* =========================
           CHAMPIONS
        ========================= */

        Champion teemo = new Champion(
                "Teemo",
                Difficulty.MEDIUM,
                "Stealthy annoying yordle",
                Set.of(Role.TOP, Role.JUNGLE),
                Set.of(TypeDamage.MAGIC, TypeDamage.PHYSICAL)
        );

        Champion ahri = new Champion(
                "Ahri",
                Difficulty.MEDIUM,
                "Mobile mage assassin",
                Set.of(Role.MID),
                Set.of(TypeDamage.MAGIC)
        );

        Champion garen = new Champion(
                "Garen",
                Difficulty.EASY,
                "Tanky fighter",
                Set.of(Role.TOP),
                Set.of(TypeDamage.PHYSICAL)
        );

        Champion leeSin = new Champion(
                "Lee Sin",
                Difficulty.HARD,
                "High skill jungler",
                Set.of(Role.JUNGLE),
                Set.of(TypeDamage.PHYSICAL)
        );

        Champion jinx = new Champion(
                "Jinx",
                Difficulty.MEDIUM,
                "Hyper carry ADC",
                Set.of(Role.ADC),
                Set.of(TypeDamage.PHYSICAL)
        );

        Champion thresh = new Champion(
                "Thresh",
                Difficulty.HARD,
                "Playmaker support",
                Set.of(Role.SUPPORT),
                Set.of(TypeDamage.MAGIC)
        );

        Champion orianna = new Champion(
                "Orianna",
                Difficulty.HARD,
                "Control mage",
                Set.of(Role.MID),
                Set.of(TypeDamage.MAGIC)
        );

        Champion darius = new Champion(
                "Darius",
                Difficulty.MEDIUM,
                "Lane bully",
                Set.of(Role.TOP),
                Set.of(TypeDamage.PHYSICAL)
        );

        Champion viego = new Champion(
                "Viego",
                Difficulty.MEDIUM,
                "Reset skirmisher",
                Set.of(Role.JUNGLE),
                Set.of(TypeDamage.PHYSICAL)
        );

        Champion kaisa = new Champion(
                "KaiSa",
                Difficulty.HARD,
                "Hybrid ADC",
                Set.of(Role.ADC),
                Set.of(TypeDamage.PHYSICAL, TypeDamage.MAGIC)
        );

        Champion leona = new Champion(
                "Leona",
                Difficulty.EASY,
                "Tank engage",
                Set.of(Role.SUPPORT),
                Set.of(TypeDamage.MAGIC)
        );

        Champion zed = new Champion(
                "Zed",
                Difficulty.HARD,
                "AD assassin",
                Set.of(Role.MID),
                Set.of(TypeDamage.PHYSICAL)
        );

        Champion lux = new Champion(
                "Lux",
                Difficulty.EASY,
                "Burst mage support",
                Set.of(Role.MID, Role.SUPPORT),
                Set.of(TypeDamage.MAGIC)
        );

        Champion renekton = new Champion(
                "Renekton",
                Difficulty.MEDIUM,
                "Early game bruiser",
                Set.of(Role.TOP),
                Set.of(TypeDamage.PHYSICAL)
        );

        Champion graves = new Champion(
                "Graves",
                Difficulty.MEDIUM,
                "Ranged jungler",
                Set.of(Role.JUNGLE),
                Set.of(TypeDamage.PHYSICAL)
        );

        Champion ezreal = new Champion(
                "Ezreal",
                Difficulty.HARD,
                "Skillshot ADC",
                Set.of(Role.ADC),
                Set.of(TypeDamage.PHYSICAL, TypeDamage.MAGIC)
        );

        Champion nami = new Champion(
                "Nami",
                Difficulty.MEDIUM,
                "Enchanter support",
                Set.of(Role.SUPPORT),
                Set.of(TypeDamage.MAGIC)
        );

        Champion yasuo = new Champion(
                "Yasuo",
                Difficulty.HARD,
                "Mechanical carry",
                Set.of(Role.MID, Role.TOP),
                Set.of(TypeDamage.PHYSICAL)
        );

        Champion mordekaiser = new Champion(
                "Mordekaiser",
                Difficulty.EASY,
                "AP juggernaut",
                Set.of(Role.TOP),
                Set.of(TypeDamage.MAGIC)
        );

        Champion twitch = new Champion(
                "Stealth ADC",
                Difficulty.MEDIUM,
                "Twitch",
                Set.of(Role.ADC),
                Set.of(TypeDamage.PHYSICAL)
        );

        championRepo.saveAll(List.of(
                teemo, ahri, garen, leeSin, jinx,
                thresh, orianna, darius, viego, kaisa,
                leona, zed, lux, renekton, graves,
                ezreal, nami, yasuo, mordekaiser, twitch
        ));

        /* =========================
           PLAYERS
        ========================= */

        playerRepo.saveAll(List.of(
                new Player("Faker", 300, Region.KR, Elo.CHALLENGER),
                new Player("Chovy", 280, Region.KR, Elo.CHALLENGER),
                new Player("Knight", 270, Region.LAS, Elo.CHALLENGER),
                new Player("Caps", 250, Region.EUW, Elo.GRANDMASTER),
                new Player("ShowMaker", 260, Region.KR, Elo.GRANDMASTER),
                new Player("Rekkles", 240, Region.EUW, Elo.MASTER),
                new Player("Doublelift", 230, Region.NA, Elo.MASTER),
                new Player("Perkz", 220, Region.EUW, Elo.DIAMOND),
                new Player("Bjergsen", 215, Region.NA, Elo.MASTER),
                new Player("Humanoid", 210, Region.EUW, Elo.DIAMOND),
                new Player("Uzi", 290, Region.LAS, Elo.CHALLENGER),
                new Player("TheShy", 275, Region.LAS, Elo.CHALLENGER),
                new Player("Deft", 260, Region.KR, Elo.MASTER),
                new Player("Gumayusi", 245, Region.KR, Elo.GRANDMASTER),
                new Player("Keria", 240, Region.KR, Elo.GRANDMASTER),
                new Player("Impact", 230, Region.NA, Elo.MASTER),
                new Player("Sneaky", 220, Region.NA, Elo.DIAMOND),
                new Player("Jankos", 250, Region.EUW, Elo.GRANDMASTER),
                new Player("Oner", 240, Region.KR, Elo.GRANDMASTER),
                new Player("Peanut", 260, Region.KR, Elo.MASTER)
        ));

        System.out.println("✔ DataLoader finished: 20 champions & 20 players loaded");
    }
}
