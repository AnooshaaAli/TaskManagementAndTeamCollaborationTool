package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.Models.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByAccount_Email(String email); 
    Optional<User> findByAccount_EmailOrAccount_Username(String email, String username);
    Optional<User> findById(Integer userID);
    @Query("SELECT u FROM User u WHERE u.account.username = :username")
    User findUserByAccountUsername(@Param("username") String username);
}
