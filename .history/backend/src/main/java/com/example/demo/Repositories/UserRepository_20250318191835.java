package com.example.demo.Repositories;

package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
