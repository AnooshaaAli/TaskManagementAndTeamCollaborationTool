package com.example.demo.Services;

package com.example.demo.Services;

import com.example.demo.Models.Account;
import com.example.demo.Models.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(Account account) {
        User user = new User();
        user.setAccount(account);
        return userRepository.save(user);
    }
}
