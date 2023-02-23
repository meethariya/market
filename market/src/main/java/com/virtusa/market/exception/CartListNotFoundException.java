/**
 * market
 */
package com.virtusa.market.exception;

/**
 * Throws <strong>Unchecked</strong> Exception if CartList item is not found
 * @author meet
 * @since 24-Feb-2023
 */
public class CartListNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -2987066402544457214L;

	/**
	 * Default constructor.
	 */
	public CartListNotFoundException() {
		super();
	}

	/**
	 * Constructor with message.
	 * @param message
	 */
	public CartListNotFoundException(String message) {
		super(message);
	}
	
}
