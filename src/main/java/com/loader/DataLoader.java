package com.loader;

import com.model.Champion;
import com.model.Difficulty;
import com.model.Role;
import com.model.TypeDamage;
import com.repository.ChampionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataLoader implements CommandLineRunner {
    private final ChampionRepository championRepository;

    public DataLoader(ChampionRepository championRepository){
        this.championRepository=championRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Champion teemo = new Champion();
        teemo.setDescription("tejon gay" );
        teemo.setDifficulty(Difficulty.MEDIUM);
        teemo.setName("Teemo");
        teemo.setRoles(Set.of(Role.TOP,Role.JUNGLE));
        teemo.setTypeDamages(Set.of(TypeDamage.PhysicalDamage,TypeDamage.MagicDamage));
        championRepository.save(teemo);
    }
}
