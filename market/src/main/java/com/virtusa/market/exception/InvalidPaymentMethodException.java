/**
 * market
 */
package com.virtusa.market.exception;

/**
 * Throws <strong>Checked</strong> Exception if Payment method is not correct.
 * @author meet
 * @since 17-Feb-2023
 */
public class InvalidPaymentMethodException extends Exception {

	private static final long serialVersionUID = 2222209169491528655L;

	/**
	 * Default constructor
	 */
	public InvalidPaymentMethodException() {
		super();
	}

	/**
	 * Constructor with message
	 * @param message
	 */
	public InvalidPaymentMethodException(String message) {
		super(message);
	}

	
}
