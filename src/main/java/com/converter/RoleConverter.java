package com.converter;

import com.model.Role;
import org.springframework.stereotype.Component;
import org.springframework.core.convert.converter.Converter;

import java.lang.annotation.Annotation;

@Component
public class RoleConverter implements Converter<String,Role> {

    @Override
    public Role convert(String source) {
        return Role.valueOf(source.toUpperCase());
    }
}
