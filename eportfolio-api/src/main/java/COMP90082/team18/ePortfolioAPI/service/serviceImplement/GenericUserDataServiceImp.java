package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.service.GenericUserDataService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenericUserDataServiceImp implements GenericUserDataService {

    @Override
    public List<Object> getAllObjects(Long id) {
        return null;
    }

    @Override
    public Object getObject(Long id, Long objectId) {
        return null;
    }

    @Override
    public Object postObject(Long id, Object object) {
        return null;
    }

    @Override
    public Object putObject(Long id, Long objectId, Object object) {
        return null;
    }
}
