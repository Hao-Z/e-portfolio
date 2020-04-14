package COMP90082.team18.ePortfolioAPI.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Data
@Entity
public class Profile {
    @Id
    private Long id;

    @JsonFormat(pattern="dd-MM-yyyy")
    private Date birthday;

    private String phoneNumber;

    @OneToOne
    @MapsId
    private User user;

    public Map<String, Object> body(){
        Map<String, Object> body = new HashMap<String, Object>();
        body.put("id", id);
        body.put("userId", user.getId());
        body.put("username", user.getUsername());
        body.put("birthday", birthday);
        body.put("phoneNumber", phoneNumber);
        return body;
    }

    public Profile update(Profile newProfile) {
        if(newProfile.getBirthday() != null) this.setBirthday(newProfile.getBirthday());
        if(newProfile.getPhoneNumber() != null) this.setPhoneNumber(newProfile.getPhoneNumber());
        return this;
    }
}

