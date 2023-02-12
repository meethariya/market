/**
 * market
 */
package com.virtusa.market.controller;

import java.io.IOException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.virtusa.market.exception.CustomerAlreadyExistsException;
import com.virtusa.market.exception.IncorrectFormDetailsException;
import com.virtusa.market.exception.ProductAlreadyExistsException;

/**
 * Handle all exceptions thrown by controllers
 * @author meet
 * @since 11-Feb-2023
 * @see GeneralController
 */

@RestControllerAdvice
public class ExceptionHandlerController {

	private static final Logger log = LogManager.getLogger(ExceptionHandlerController.class);
	
	/**
	 * Handles error for IncorrectFormDetailsException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(IncorrectFormDetailsException.class)
	public ResponseEntity<String> handleIncorrectFormDetailsException(IncorrectFormDetailsException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
	}
	
	/**
	 * Handles error for CustomerAlreadyExistsException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(CustomerAlreadyExistsException.class)
	public ResponseEntity<String> handleCustomerAlreadyExistsException(CustomerAlreadyExistsException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
	}
	
	/**
	 * Handles error for ProductAlreadyExistsException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(ProductAlreadyExistsException.class)
	public ResponseEntity<String> handleProductAlreadyExistsException(ProductAlreadyExistsException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
	}
	
	/**
	 * Handles error for IOException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(IOException.class)
	public ResponseEntity<String> handleIOException(IOException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
	}
}
