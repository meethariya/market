/**
 * market
 */
package com.virtusa.market.exception;

/**
 * Throws <strong>Unchecked</strong> Exception Order is not found.
 * @author meet
 * @since 17-Feb-2023
 */
public class OrderNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 3262295582694660577L;

	/**
	 * Default Constructor
	 */
	public OrderNotFoundException() {
		super();
	}

	/**
	 * Constructor with message
	 * @param message
	 */
	public OrderNotFoundException(String message) {
		super(message);
	}

	
}
