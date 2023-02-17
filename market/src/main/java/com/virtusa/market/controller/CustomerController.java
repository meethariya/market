/**
 * market
 */
package com.virtusa.market.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtusa.market.dto.CartDto;
import com.virtusa.market.exception.IncorrectFormDetailsException;
import com.virtusa.market.exception.ProductNotFoundException;
import com.virtusa.market.model.CartList;
import com.virtusa.market.service.CustomerService;

import jakarta.validation.Valid;

/**
 * All methods specific for Customer.<br>
 * Security Level: <strong>Customer role</strong>.
 * 
 * @author meet
 * @since 12-Feb-2023
 */
@RestController
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	CustomerService customerService;

	@GetMapping("/")
	public ResponseEntity<String> customerHome() {
		return new ResponseEntity<>("Customer Home", HttpStatus.OK);
	}

	/**
	 * Adds product to cartlist
	 * 
	 * @param cart
	 * @param error
	 * @param auth
	 * @return id of the cart item added
	 * @throws ProductNotFoundException
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 * @see {@link CustomerService#addToCart(CartDto, String)}
	 */
	@PostMapping("/cart")
	public ResponseEntity<Long> addToCart(@Valid @ModelAttribute("cart") CartDto cart, Errors error,
			Authentication auth) throws ProductNotFoundException {

		FieldError fieldError = error.getFieldError();
		if (fieldError != null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}

		return new ResponseEntity<>(customerService.addToCart(cart, auth.getName()), HttpStatus.CREATED);
	}
	
	@GetMapping("/cart")
	public ResponseEntity<Set<CartList>> getCustomerCart(Authentication auth){
		return new ResponseEntity<>(customerService.getCart(auth.getName()), HttpStatus.CREATED);
	}
}
