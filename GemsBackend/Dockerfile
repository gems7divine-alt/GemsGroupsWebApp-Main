FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/*.jar app.jar.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar.jar"]