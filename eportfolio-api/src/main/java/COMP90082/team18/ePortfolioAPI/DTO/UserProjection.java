package COMP90082.team18.ePortfolioAPI.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.FieldResult;
import javax.persistence.SqlResultSetMapping;

@Data
@AllArgsConstructor

public class UserProjection {

    String uemail;
    String uusername;
    String edegree;
    String egrade;

}
