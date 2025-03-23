package com.example.demo.Config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Base64;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour
    private Key key; // Declare without initializing

    @PostConstruct
    public void init() {

        System.out.println("Secret Key: " + secretKey); // Debug
        this.key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey));
    }

    public String generateToken(String email) {

        String encodedSecret = Base64.getEncoder().encodeToString(Base64.getDecoder().decode(secretKey));
        System.out.println("Encoded Secret Key: " + encodedSecret);

        String token = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        System.out.println("🔹 Secret Key (Base64-decoded): " + Base64.getEncoder().encodeToString(key.getEncoded()));
        System.out.println("🔹 Generated Token: " + token);
        return token;
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
