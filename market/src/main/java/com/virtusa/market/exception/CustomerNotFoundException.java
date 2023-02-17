/**
 * market
 */
package com.virtusa.market.exception;

/**
 * Throws <strong>Unchecked</strong> Exception if Customer is not found.
 * @author meet
 * @since 17-Feb-2023
 */
public class CustomerNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = 2114959955745893830L;

	/**
	 * Default Constructor
	 */
	public CustomerNotFoundException() {
		super();
	}

	/**
	 * Constructor with email
	 * @param email
	 */
	public CustomerNotFoundException(String email) {
		super("No Customer with email: " + email);
	}

	
}
