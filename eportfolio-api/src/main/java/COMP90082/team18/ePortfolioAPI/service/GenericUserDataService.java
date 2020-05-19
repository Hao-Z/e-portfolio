package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.entity.GenericUserData;

import java.util.List;

public interface GenericUserDataService {
    <T extends GenericUserData> List<T> getAllObjects(Long id, Class T);

    <T extends GenericUserData> T getObject(Long id, Long objectId, Class T);

    <T extends GenericUserData> T postObject(Long id, T object);

    <T extends GenericUserData> T putObject(Long id, Long objectId, T object);

    <T extends GenericUserData> void deleteObject(Long id, Long objectId, Class T);
}
