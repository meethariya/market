/**
 * market
 */
package com.virtusa.market.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtusa.market.dto.CustomerDto;
import com.virtusa.market.exception.CustomerAlreadyExistsException;
import com.virtusa.market.exception.IncorrectFormDetailsException;
import com.virtusa.market.exception.ProductNotFoundException;
import com.virtusa.market.model.Inventory;
import com.virtusa.market.model.Product;
import com.virtusa.market.service.GeneralService;

import jakarta.validation.Valid;

/**
 * General Controller used for actions common to user and manager.<br>
 * Security Level: <strong>Authenticated/Anonymous</strong>.
 * @author meet
 * @since 11-Feb-2023
 */
@RestController
@RequestMapping("/")
public class GeneralController {

	@Autowired
	GeneralService service;

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
	
	/**
	 * Checks for the role of the logged in user and redirects accordingly
	 * @param auth
	 * @return Redirects to {@link CustomerController#customerHome()} or {@link ManagerController#managerHome()}
	 */
	@GetMapping("/postLogin")
	public ResponseEntity<HttpHeaders> postLogin(Authentication auth){
		HttpHeaders httpHeader = new HttpHeaders();
		if(auth.getAuthorities().stream().allMatch(a -> a.getAuthority().equalsIgnoreCase("customer"))) {
			httpHeader.setLocation(URI.create("customer/"));
		}else {
			httpHeader.setLocation(URI.create("manager/"));
		}
		return new ResponseEntity<>(httpHeader,HttpStatus.PERMANENT_REDIRECT);
	}
	
	/**
	 * @return List of products and its image path
	 */
	@GetMapping("/product")
	public ResponseEntity<List<Product>> getAllProduct() {
		return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK);
	}
	
	/**
	 * Get Product by its id
	 * @param id
	 * @return Product
	 * @throws ProductNotFoundException
	 */
	@GetMapping("/product/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable("id") long id) throws ProductNotFoundException {
		return new ResponseEntity<>(service.getProduct(id), HttpStatus.OK);
	}
	
	/**
	 * @return List of all products in inventory
	 */
	@GetMapping("/inventory")
	public ResponseEntity<List<Inventory>> allInventory(){
		return new ResponseEntity<>(service.allInventory(), HttpStatus.OK);
	}
}
