package COMP90082.team18.ePortfolioAPI.util;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;

public class ObjectMethod {
    public static <T> T update(T baseObj, T updateObj) {
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

    public static <T> T update(T baseObj, Map<String, Object> updateObj) {
        try {
            for (Field field : baseObj.getClass().getDeclaredFields()) {
                field.setAccessible(true);
                if (updateObj.containsKey(field.getName())) {
                    Object value = updateObj.get(field.getName());
                    if (value instanceof Optional) {
                        field.set(baseObj, ((Optional) value).orElse(null));
                    } else {
                        field.set(baseObj, value);
                    }
                }
            }
        } catch (IllegalAccessException e) {
            throw new IllegalArgumentException("Wrong argument!");
        }
        return baseObj;
    }
}
