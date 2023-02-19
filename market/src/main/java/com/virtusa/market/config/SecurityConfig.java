/**
 * market
 */
package com.virtusa.market.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author meet
 * @since 10-Feb-2023
 * @see PasswordEncoderBean
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends AbstractSecurityWebApplicationInitializer implements WebMvcConfigurer {

	@Autowired
	private DataSource dataSource;

	/**
	 * Security configuration for all URLs, Login, Logout, CSRF and basic HTTP.
	 * 
	 * @param http
	 * @return Security FilterChain
	 * @throws Exception
	 */
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http
			.authorizeHttpRequests()
				.requestMatchers("/").permitAll()
				.requestMatchers("/register").anonymous()
				.requestMatchers("/postLogin").authenticated()
				.requestMatchers("/product").authenticated()
				.requestMatchers("/product/*").authenticated()
				.requestMatchers("/inventory").authenticated()
				.requestMatchers("/customer/**").hasAuthority("Customer")
				.requestMatchers("/manager/**").hasAuthority("Manager")
				.and()
			.httpBasic()
				.and()
			.cors()
				.and()
			.formLogin()
				.usernameParameter("email")
				.defaultSuccessUrl("/postLogin")
				.permitAll()
				.and()
			.csrf()
				.disable();

		return http.build();
	}

	/**
	 * Sets query to get User for login and role verification.
	 * Password encoder is autowired.
	 * 
	 * @param auth
	 * @param pe
	 * @throws Exception
	 * @see {@link PasswordEncoderBean#passwordEncoder()}
	 */
	@Autowired
	public void configure(AuthenticationManagerBuilder auth, PasswordEncoder pe) throws Exception {
		auth
			.jdbcAuthentication()
			.usersByUsernameQuery("SELECT email, password, enabled FROM user WHERE email = ?")
			.authoritiesByUsernameQuery("select email, role FROM user where email=?")
			.dataSource(dataSource)
			.passwordEncoder(pe);
	}

	/**
	 * Cross origin security configuration
	 * 
	 * @return WebMvcConfigurer
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("http://localhost:4200");
	}
}
