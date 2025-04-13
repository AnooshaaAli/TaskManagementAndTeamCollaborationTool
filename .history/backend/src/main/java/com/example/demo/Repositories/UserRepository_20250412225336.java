package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.Models.User;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    static Optional<User> findByAccount_Email(String email) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByAccount_Email'");
    } 
    Optional<User> findByAccount_EmailOrAccount_Username(String email, String username);
    Optional<User> findById(Integer userID);
}
