package COMP90082.team18.ePortfolioAPI.util;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.Map;

@Service
public class ObjectMethod {
    @Autowired
    private ModelMapper modelMapper;

    public <T> T update(T baseObj, T updateObj) {
        try {
            for (Field field : baseObj.getClass().getDeclaredFields()) {
                field.setAccessible(true);
                field.set(baseObj, field.get(updateObj) == null ? field.get(baseObj) : field.get(updateObj));
            }
        } catch (IllegalAccessException e) {
            throw new IllegalArgumentException("Wrong argument!");
        }
        return baseObj;
    }

    public <T> T update(T baseObj, Map<String, Object> updateObj) {
        try {
            for (Field field : baseObj.getClass().getDeclaredFields()) {
                field.setAccessible(true);
                if (updateObj.containsKey(field.getName())) {
                    Object value = updateObj.get(field.getName());
                    if(value != null){
                        value = modelMapper.map(value, field.getType());
                    }
                    field.set(baseObj, value);
                }
            }
        } catch (IllegalAccessException e) {
            throw new IllegalArgumentException("Wrong argument!");
        }
        return baseObj;
    }
}
