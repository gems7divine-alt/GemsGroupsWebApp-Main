package GemsGroup.GemsBackend.Repository;

import java.util.Optional;

import GemsGroup.GemsBackend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>{

    Optional<User> findByEmail(String email);

}
