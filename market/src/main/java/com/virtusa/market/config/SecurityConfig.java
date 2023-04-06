/**
 * market
 */
package com.virtusa.market.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author meet
 * @since 10-Feb-2023
 * @see PasswordEncoderBean
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

	@Autowired
	private DataSource dataSource;
	
	@Value("${angular}")
	private String angularPath;
	
	private String[] authenticatedUrls = { "/postLogin", "/product", "/product/*", "/review/*", "/inventory",
			"/category" };
	
	private String[] permitAllUrls = {"/", "/v3/api-docs/**", "/swagger-ui/**", "/register"};

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
				.requestMatchers(permitAllUrls).permitAll()
				.requestMatchers(authenticatedUrls).authenticated()
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
			.logout()
			 .permitAll()
			 .and()
			.csrf()
				.disable();

		return http.build();
	}

	/**
	 * Sets query to get User for login and role verification.
	 * Password encoder is autowired.<br>
	 * {@link PasswordEncoderBean#passwordEncoder()}
	 * 
	 * @param auth
	 * @param pe
	 * @throws Exception
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
	 * Cross origin security configuration.<br>
	 * returns WebMvcConfigurer
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins(this.angularPath);
	}
}
