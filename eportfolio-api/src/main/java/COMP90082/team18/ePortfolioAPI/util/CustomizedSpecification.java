package COMP90082.team18.ePortfolioAPI.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

@Data
@AllArgsConstructor
public class CustomizedSpecification<T> implements Specification<T> {

    private String key;
    private String opr;
    private Object val;

    @Override
    public Predicate toPredicate (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

        switch (opr) {
            case ">":
                return builder.greaterThanOrEqualTo(root.<String>get(key), val.toString());
            case "<":
                return builder.lessThanOrEqualTo(root.<String>get(key), val.toString());
            case "=":
                return builder.equal(root.get(key), val);
            case "!=":
                return builder.notEqual(root.get(key), val);
            case "%":
                if (root.get(key).getJavaType() == String.class) {
                    return builder.like(root.<String>get(key), "%" + val + "%");
                }
        }
        return null;
    }

}
