/**
 * market
 */
package com.virtusa.market.exception;

/**
 * Throws <strong>Unchecked</strong> Exception if Review is not found
 * @author meet
 * @since 14-Mar-2023
 */
public class ReviewNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -8713347458700425457L;

	/**
	 * Default Constructor
	 */
	public ReviewNotFoundException() {
		super();
	}

	/**
	 * Constructor with message
	 * @param message
	 */
	public ReviewNotFoundException(String message) {
		super(message);
	}

}
