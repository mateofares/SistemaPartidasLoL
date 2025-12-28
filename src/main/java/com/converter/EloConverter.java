package com.converter;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.springframework.core.convert.converter.Converter;
import com.model.Elo;
import org.springframework.stereotype.Component;

@Component
public class EloConverter implements Converter<String,Elo> {

    @Override
    public Elo convert(String string) {
        return Elo.valueOf(string.toUpperCase());
    }

}
