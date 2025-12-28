package com.converter;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.springframework.core.convert.converter.Converter;
import com.model.Difficulty;
import com.model.Region;
import org.springframework.stereotype.Component;

@Component
public class RegionConverter implements Converter<String, Region> {
    @Override
    public Region convert(String string) {
        return Region.valueOf(string.toUpperCase());
    }
}
