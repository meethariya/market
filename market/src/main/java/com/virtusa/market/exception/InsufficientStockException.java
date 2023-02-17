/**
 * market
 */
package com.virtusa.market.exception;

/**
 * Throws <strong>Checked</strong> Exception Order Product's quantity exceeds stock quantity.
 * @author meet
 * @since 17-Feb-2023
 */
public class InsufficientStockException extends Exception {

	
	private static final long serialVersionUID = 1629799531105953091L;

	/**
	 * Default Constructor
	 */
	public InsufficientStockException() {
		super();
	}

	/**
	 * Constructor with message
	 * @param message
	 */
	public InsufficientStockException(String message) {
		super(message);
	}

}
