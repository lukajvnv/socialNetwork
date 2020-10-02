package com.lilly021.social.converters;

public interface ConverterInterface<T, Dto> {
    Dto convertToDto(T object);
    T convertFromDto(Dto object);
}
