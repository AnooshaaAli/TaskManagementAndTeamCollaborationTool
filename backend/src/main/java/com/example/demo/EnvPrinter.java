package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class EnvPrinter implements CommandLineRunner {
    @Override
    public void run(String... args) {
        System.out.println("===== ENV VARS =====");
        Map<String, String> env = System.getenv();
        env.forEach((key, value) -> System.out.println(key + ": " + value));
        System.out.println("====================");
    }
}
