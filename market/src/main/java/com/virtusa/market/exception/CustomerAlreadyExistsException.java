/**
 * market
 */
package com.virtusa.market.exception;

/**
 * Throws <strong>Checked</strong> Exception if Customer already exists in database
 * @author meet
 * @since 11-Feb-2023
 */
public class CustomerAlreadyExistsException extends Exception {

	private static final long serialVersionUID = -8430498551896512038L;

	/**
	 * Default Constructor
	 */
	public CustomerAlreadyExistsException() {}

	/**
	 * Constructor with message
	 * @param message
	 */
	public CustomerAlreadyExistsException(String message) {
		super(message);
	}

}
