/**
 * market
 */
package com.virtusa.market.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

/**
 * All Swagger API Configurations.
 * 
 * @author meet
 * @since 29-Mar-2023
 */
@Configuration
public class SwaggerConfig {

	@Value("${name}")
	private String appName;

	@Value("${version}")
	private String version;

	@Value("${github}")
	private String link;

	@Value("${contact.email}")
	private String email;

	@Value("${contact.name}")
	private String name;

	/**
	 * Configuration for Swagger.
	 * @return {@link OpenAPI}
	 */
	@Bean
	public OpenAPI springShopOpenAPI() {
		return new OpenAPI().info(getSwaggerInfo());
	}

	/**
	 * Sets all details such as title, description, version, contact etc for swagger api.
	 * 
	 * 
	 * @return {@link Info}
	 */
	public Info getSwaggerInfo() {
		Info details = new Info();

		details.title(appName + " Backend");
		details.description("SpringBoot3 Backend used with Hibernate and MySQL. Single vendor app");
		details.termsOfService("Terms of services applicable *");

		Contact contactDetails = new Contact();
		contactDetails.email(email);
		contactDetails.name(name);
		contactDetails.url(link);
		details.contact(contactDetails);

		details.license(new License().name("License of Market Backend."));
		details.version(version);

		return details;
	}
}
