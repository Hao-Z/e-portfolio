package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.UserDTO;
import COMP90082.team18.ePortfolioAPI.entity.Profile;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.security.JWTMethod;
import COMP90082.team18.ePortfolioAPI.service.ProfileService;
import COMP90082.team18.ePortfolioAPI.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.servlet.http.HttpServletResponse;

import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.HEADER_STRING;
import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping(value = "/signup")
    public UserDTO signUp(@RequestBody @Valid User user, BindingResult bindingResult, HttpServletResponse response){
        if(bindingResult.hasErrors()){
            throw new IllegalArgumentException("Invalid fields for user information.");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User result = userService.signUp(user);

        profileService.createProfile(user.getId());

        String token = JWTMethod.create(result);
        response.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
        response.addHeader("Access-Control-Expose-Headers", "Authorization");

        return modelMapper.map(result, UserDTO.class);
    }

    @PostMapping(value = "/signup/checkuser")
    public boolean checkUser(@RequestBody User user){
        return userService.checkUsername(user);
    }
}
