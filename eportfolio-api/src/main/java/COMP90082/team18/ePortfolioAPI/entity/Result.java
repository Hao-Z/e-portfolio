package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

@Data
public class Result<T> {

    private String msg;

    private boolean success;

    private T detail;
}
