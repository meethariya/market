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
	 * Default constructor.<br>
	 * Default Message: <i>No such Product Found</i>
	 */
	public ProductNotFoundException() {
		super("No such product found");
	}

	/**
	 * Constructor with message
	 * @param message
	 */
	public ProductNotFoundException(String message) {
		super(message);
	}
	
}
