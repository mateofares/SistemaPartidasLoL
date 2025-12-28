package com.converter;

import com.model.Difficulty;
import com.model.Role;
import org.springframework.stereotype.Component;
import org.springframework.core.convert.converter.Converter;

import java.lang.annotation.Annotation;

@Component
public class DifficultyConverter implements Converter<String, Difficulty> {

    @Override
    public Difficulty convert(String source) {
        return Difficulty.valueOf(source.toUpperCase());
    }
}
