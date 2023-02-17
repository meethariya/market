/**
 * market
 */
package com.virtusa.market.exception;

/**
 * Throws <strong>Unchecked</strong> Exception if User is not found
 * @author meet
 * @since 17-Feb-2023
 */
public class UserNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -5515529491492953283L;

	/**
	 * Default Constructor
	 */
	public UserNotFoundException() {
		super();
	}

	/**
	 * Constructor with userEmail
	 * @param email
	 */
	public UserNotFoundException(String email) {
		super("No user with email: " + email);
	}

	
}
