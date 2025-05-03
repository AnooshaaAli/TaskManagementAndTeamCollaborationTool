# Step 1: Build stage (optional if you build externally)
FROM maven:3.9.4-eclipse-temurin-17 AS builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

# Step 2: Runtime stage
FROM openjdk:23-jdk-slim

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
