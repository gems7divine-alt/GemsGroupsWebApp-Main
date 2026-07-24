package GemsGroup.GemsBackend.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    public CorsConfig() {
        System.out.println("******** CORS CONFIG LOADED ********");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")
                        .allowedOriginPatterns(
                                "http://localhost:5173",
                                "http://82.25.104.27",
                                "http://82.25.104.27:5173",
                                "https://gems-groups.in",
                                "https://www.gems-groups.in"
                        )
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowCredentials(false);

            }
        };
    }
}