package GemsGroup.GemsBackend.Service;

import java.util.Optional;

import GemsGroup.GemsBackend.DTO.LoginRequest;
import GemsGroup.GemsBackend.DTO.RegisterRequest;
import GemsGroup.GemsBackend.Entity.User;
import GemsGroup.GemsBackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    UserRepository repository;

    public String register(RegisterRequest request){

        Optional<User> user=repository.findByEmail(request.getEmail());

        if(user.isPresent()){
            return "Email already exists";
        }

        User newUser=new User();

        newUser.setFullName(request.getFullName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());

        repository.save(newUser);

        return "Registration Successful";
    }

    public String login(LoginRequest request){

        Optional<User> user=repository.findByEmail(request.getEmail());

        if(user.isEmpty()){
            return "Invalid Email";
        }

        if(!user.get().getPassword().equals(request.getPassword())){
            return "Invalid Password";
        }

        return "Login Successful";
    }

}
