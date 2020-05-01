package COMP90082.team18.ePortfolioAPI.service;

import java.util.List;

public interface GenericUserDataService {
    List<Object> getAllObjects(Long id);

    Object getObject(Long id, Long objectId);

    Object postObject(Long id, Object object);

    Object putObject(Long id, Long objectId, Object object);
}
