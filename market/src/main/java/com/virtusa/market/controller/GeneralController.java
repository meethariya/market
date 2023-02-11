/**
 * market
 */
package com.virtusa.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtusa.market.dto.CustomerDto;
import com.virtusa.market.exception.CustomerAlreadyExistsException;
import com.virtusa.market.exception.IncorrectFormDetailsException;
import com.virtusa.market.service.GeneralService;

import jakarta.validation.Valid;

/**
 * General Controller used for registering, login, logout, etc..
 * @author meet
 * @since 11-Feb-2023
 */
@RestController
@RequestMapping("/")
public class GeneralController {

	@Autowired
	GeneralService service;

	@GetMapping("/")
	public ResponseEntity<String> home() {
		return new ResponseEntity<>("Welcome", HttpStatus.OK);
	}

	/**
	 * Saves customer to database
	 * @param customer
	 * @param error
	 * @see GeneralService#registerCustomer(CustomerDto)
	 * @return Id for Customer just created
	 * @throws CustomerAlreadyExistsException
	 * @throws IncorrectFormDetailsException
	 */
	@PostMapping("/register")
	public ResponseEntity<Long> register(@Valid @ModelAttribute("customer") CustomerDto customer, Errors error)
			throws CustomerAlreadyExistsException {
		
		FieldError fieldError = error.getFieldError();
		if (fieldError!=null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}
		Long id = service.registerCustomer(customer);
		return new ResponseEntity<>(id, HttpStatus.CREATED);
	}
}
