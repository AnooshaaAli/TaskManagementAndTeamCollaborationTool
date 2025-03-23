package com.example.demo.Config;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws ServletException, IOException {
    String authHeader = request.getHeader("Authorization");

    // 🔴 Print the received Authorization header
    System.out.println("Authorization Header: " + authHeader);

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        System.out.println("🔴 No Bearer token found!");
        chain.doFilter(request, response);
        return;
    }

    String token = authHeader.substring(7);
    System.out.println("Extracted Token: " + token);

    String username = jwtUtil.extractEmail(token);
    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (jwtUtil.validateToken(token)) {
            System.out.println("Token is valid for: " + username);
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                    null, userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authToken);
        } else {
            System.out.println("Token is invalid!");
        }
    }
    chain.doFilter(request, response);
    }  
      
}
