package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping(value = "/signup")
    public Result<Object> signUp(@RequestBody @Valid User user, BindingResult bindingResult, HttpServletResponse response){
        Result<Object> res = new Result<>();
        if(bindingResult.hasErrors()){
            System.out.println("400 bad request; maybe invalid fields for user information");
            res.setMsg("400 bad request; maybe invalid fields for user information");
            res.setSuccess(false);
            res.setDetail(bindingResult.getAllErrors());
        }
        else{
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            res = userService.signUp(user, res, response);
        }
        return res;
    }

    @PostMapping(value = "/signup/checkuser")
    public Result<Object> checkUser(String username){
        Result<Object> res = new Result<>();
        if(userService.checkUsername(username)){
            res.setMsg("200 ok");
            res.setSuccess(true);
        }
        else{
            res.setMsg("400 bad request");
            res.setSuccess(false);
        }
        return res;
    }

}
