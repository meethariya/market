package com.virtusa.market;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Super market application starts from here.
 * Spring boot will scan all sub-package for Beans and Configurations
 * @author meet
 * @since 11-Feb-2023
 */
@SpringBootApplication
public class MarketApplication {

	public static void main(String[] args) {
		SpringApplication.run(MarketApplication.class, args);
	}

}
