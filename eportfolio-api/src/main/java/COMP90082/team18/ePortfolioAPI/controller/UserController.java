package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.*;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.security.JWTMethod;
import COMP90082.team18.ePortfolioAPI.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.servlet.http.HttpServletResponse;

import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.JWT_HEADER_STRING;
import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

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

        String token = JWTMethod.create(result);
        response.addHeader(JWT_HEADER_STRING, TOKEN_PREFIX + token);
        response.addHeader("Access-Control-Expose-Headers", "Authorization");

        return modelMapper.map(result, UserDTO.class);
    }

    @PatchMapping(value = "/users/{id}/password")
    public void changePassword(@PathVariable Long id, @RequestBody PasswordDTO passwordDTO){
        passwordDTO.setNewPassword(bCryptPasswordEncoder.encode(passwordDTO.getNewPassword()));
        userService.changePassword(id, passwordDTO);
    }

    @PostMapping(value = "/signup/checkuser")
    public boolean checkUser(@RequestBody User user){
        return userService.checkUsername(user);
    }

    @GetMapping(value = "/users/{id}/shared-link")
    public String getSharedLink(){
        return userService.createSharedLink();
    }

    @GetMapping("/users/{id}/about")
    public AboutDTO getAbout(@PathVariable Long id){
        return modelMapper.map(userService.getUser(id), AboutDTO.class);
    }

    @PatchMapping("/users/{id}/about")
    public AboutDTO patchAbout(@PathVariable Long id, @RequestBody AboutDTO aboutDTO){
        User result = userService.patchUser(id, modelMapper.map(aboutDTO, User.class));
        return modelMapper.map(result, AboutDTO.class);
    }

    @GetMapping("/users/{id}/introduction")
    public IntroductionDTO getIntroduction(@PathVariable Long id){
        return modelMapper.map(userService.getUser(id), IntroductionDTO.class);
    }

    @PatchMapping("/users/{id}/introduction")
    public IntroductionDTO patchIntroduction(@PathVariable Long id, @RequestBody IntroductionDTO introductionDTO){
        User result = userService.patchUser(id, modelMapper.map(introductionDTO, User.class));
        return modelMapper.map(result, IntroductionDTO.class);
    }

    @GetMapping("/users/{id}/profile")
    public ProfileDTO getProfile(@PathVariable Long id){
        return modelMapper.map(userService.getUser(id), ProfileDTO.class);
    }

    @PatchMapping("/users/{id}/profile")
    public ProfileDTO patchProfile(@PathVariable Long id, @RequestBody ProfileDTO profileDTO){
        User result = userService.patchUser(id, modelMapper.map(profileDTO, User.class));
        return modelMapper.map(result, ProfileDTO.class);
    }

    @GetMapping("/users/{id}/user-information")
    public UserDTO getUser(@PathVariable Long id){
        return modelMapper.map(userService.getUser(id), UserDTO.class);
    }

    @PatchMapping("/users/{id}/user-information")
    public UserDTO patchUser(@PathVariable Long id, @RequestBody UserDTO userDTO){
        User result = userService.patchUser(id, modelMapper.map(userDTO, User.class));
        return modelMapper.map(result, UserDTO.class);
    }
}
