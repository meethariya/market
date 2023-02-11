/**
 * market
 */
package com.virtusa.market.exception;

/**
 * Throws <strong>Unchecked</strong> Exception if any form field entered is incorrect
 * @author meet
 * @since 11-Feb-2023
 */
public class IncorrectFormDetailsException extends RuntimeException{

	private static final long serialVersionUID = -8777899016178879785L;

	/**
	 * Default Constructor
	 */
	public IncorrectFormDetailsException() {
		super();
	}

	/**
	 * Constructor with Message
	 * @param message
	 */
	public IncorrectFormDetailsException(String message) {
		super(message);
	}
	
}
