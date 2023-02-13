/**
 * market
 */
package com.virtusa.market.exception;

/**
 * Throws <strong>Checked</strong> Exception if Product not found.
 * @author meet
 * @since 13-Feb-2023
 */
public class ProductNotFoundException extends Exception {

	private static final long serialVersionUID = 2589880048248436159L;

	/**
	 * Default constructor
	 */
	public ProductNotFoundException() {
		super();
	}

	/**
	 * Constructor with message
	 * @param message
	 */
	public ProductNotFoundException(String message) {
		super(message);
	}
	
}
