package GemsGroup.GemsBackend.Service;

import GemsGroup.GemsBackend.DTO.AuthResponse;
import GemsGroup.GemsBackend.DTO.LoginRequest;
import GemsGroup.GemsBackend.DTO.RegisterRequest;
import GemsGroup.GemsBackend.Entity.User;
import GemsGroup.GemsBackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    // Register
    public AuthResponse register(RegisterRequest request){

        Optional<User> user =
                repository.findByEmail(request.getEmail());

        if(user.isPresent()){

            return new AuthResponse(
                    false,
                    "Email already exists",
                    null
            );
        }

        User newUser = new User();

        newUser.setFullName(request.getFullName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());

        repository.save(newUser);

        return new AuthResponse(
                true,
                "Registration Successful",
                newUser.getEmail()
        );
    }

    // Login
    public AuthResponse login(LoginRequest request){

        Optional<User> user =
                repository.findByEmail(request.getEmail());

        if(user.isEmpty()){

            return new AuthResponse(
                    false,
                    "Invalid Email",
                    null
            );
        }

        if(!user.get().getPassword().equals(request.getPassword())){

            return new AuthResponse(
                    false,
                    "Invalid Password",
                    null
            );
        }

        return new AuthResponse(
                true,
                "Login Successful",
                user.get().getEmail()
        );
    }
}