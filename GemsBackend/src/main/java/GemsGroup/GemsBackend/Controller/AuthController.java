package GemsGroup.GemsBackend.Controller;

import GemsGroup.GemsBackend.DTO.AuthResponse;
import GemsGroup.GemsBackend.DTO.LoginRequest;
import GemsGroup.GemsBackend.DTO.RegisterRequest;
import GemsGroup.GemsBackend.Service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public AuthResponse register(
            @RequestBody RegisterRequest request){

        return service.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request){

        return service.login(request);
    }
}