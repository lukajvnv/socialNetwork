package com.lilly021.social.service;

import java.util.List;

public interface ServiceInterface<T, Dto, Id> {
    List<Dto> getAll();
    Dto save(Dto object);
    Dto getOne(Id id);
    void delete(Id id);
    Dto convertToDto(T object);
    T convertFromDto(Dto object);
}
