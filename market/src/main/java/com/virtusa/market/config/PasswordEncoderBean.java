/**
 * market
 */
package com.virtusa.market.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @author meet
 * @since 11-Feb-2023
 * @see SecurityConfig
 */
@Configuration
public class PasswordEncoderBean {

	/**
	 * Separate configuration file to avoid circular reference in security configuration
	 * @return BCryptPasswordEncoder
	 */	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
