package com.virtusa.market;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Super market application starts from here. Spring boot will scan all
 * sub-package for Beans and Configurations
 * 
 * @author meet
 * @since 11-Feb-2023
 */
@SpringBootApplication
public class MarketApplication extends SpringBootServletInitializer {

	/**
     * Used when run as JAR
     */
	public static void main(String[] args) {
		SpringApplication.run(MarketApplication.class, args);
	}

	/**
     * Used when run as WAR
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(MarketApplication.class);
    }
}
