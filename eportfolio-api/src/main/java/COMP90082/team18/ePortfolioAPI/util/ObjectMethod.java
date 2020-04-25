package COMP90082.team18.ePortfolioAPI.util;

import java.lang.reflect.Field;

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
}
