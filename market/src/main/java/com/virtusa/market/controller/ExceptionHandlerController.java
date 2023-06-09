/**
 * market
 */
package com.virtusa.market.controller;

import java.io.IOException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.virtusa.market.exception.CartListNotFoundException;
import com.virtusa.market.exception.CustomerAlreadyExistsException;
import com.virtusa.market.exception.CustomerNotFoundException;
import com.virtusa.market.exception.IncorrectFormDetailsException;
import com.virtusa.market.exception.InsufficientStockException;
import com.virtusa.market.exception.InvalidPaymentMethodException;
import com.virtusa.market.exception.OrderNotFoundException;
import com.virtusa.market.exception.ProductAlreadyExistsException;
import com.virtusa.market.exception.ProductNotFoundException;
import com.virtusa.market.exception.ReviewNotFoundException;
import com.virtusa.market.exception.UserNotFoundException;

import jakarta.mail.MessagingException;

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
	
	/**
	 * Handles error for ProductNotFoundException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(ProductNotFoundException.class)
	public ResponseEntity<String> handleProductNotFoundException(ProductNotFoundException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
	}
	
	/**
	 * Handles error for UserNotFoundException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
	}
	
	/**
	 * Handles error for CustomerNotFoundException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(CustomerNotFoundException.class)
	public ResponseEntity<String> handleCustomerNotFoundException(CustomerNotFoundException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
	}
	
	/**
	 * Handles error for InvalidPaymentMethodException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(InvalidPaymentMethodException.class)
	public ResponseEntity<String> handleInvalidPaymentMethodException(InvalidPaymentMethodException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
	}
	
	/**
	 * Handles error for InsufficientStockException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(InsufficientStockException.class)
	public ResponseEntity<String> handleInsufficientStockException(InsufficientStockException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
	}
	
	/**
	 * Handles error for OrderNotFoundException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(OrderNotFoundException.class)
	public ResponseEntity<String> handleOrderNotFoundException(OrderNotFoundException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
	}
	
	/**
	 * Handles error for CartListNotFoundException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(CartListNotFoundException.class)
	public ResponseEntity<String> handleCartListNotFoundException(CartListNotFoundException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
	}

	/**
	 * Handles error for ReviewNotFoundException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(ReviewNotFoundException.class)
	public ResponseEntity<String> handleReviewNotFoundException(ReviewNotFoundException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
	}
	
	/**
	 * Handles error for MailException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(MailException.class)
	public ResponseEntity<String> handleMailException(MailException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	/**
	 * Handles error for MessagingException
	 * @param e
	 * @return Error Message response
	 */
	@ExceptionHandler(MessagingException.class)
	public ResponseEntity<String> handleMessagingException(MessagingException e){
		log.error(e.getMessage());
		return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
	}
}
