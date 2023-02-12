/**
 * market
 */
package com.virtusa.market.exception;

/**
 * Throws <strong>Checked</strong> Exception if Product already exists in database
 * @author meet
 * @since 12-Feb-2023
 */
public class ProductAlreadyExistsException extends Exception {

	
	
	private static final long serialVersionUID = 8688543052434115477L;

	/**
	 * Default Constructor
	 */
	public ProductAlreadyExistsException() {
		super();
	}

	/**
	 * Constructor with message
	 * @param message
	 */
	public ProductAlreadyExistsException(String message) {
		super(message);
	}

}
