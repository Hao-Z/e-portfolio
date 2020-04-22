package COMP90082.team18.ePortfolioAPI.DTO;

import lombok.Data;

@Data
public class Result<T> {
    private String msg;

    private boolean success;

    private T detail;

    public Result() {
    }

    public Result(String msg, boolean success, T detail) {
        this.msg = msg;
        this.success = success;
        this.detail = detail;
    }
}
