/**
 * market
 */
package com.virtusa.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.virtusa.market.model.Category;
import com.virtusa.market.model.Inventory;
import com.virtusa.market.model.Product;
import com.virtusa.market.model.Review;
import com.virtusa.market.model.User;
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
@CrossOrigin(origins = {"${angular}", "${remoteUrl}"})
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
	 * get user that is authenticated
	 * @param auth
	 * @return User object
	 */
	@GetMapping(path = "/postLogin")
	public ResponseEntity<User> postLogin(Authentication auth){
		return new ResponseEntity<>(service.getUser(auth.getName()), HttpStatus.OK);
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
	
	/**
	 * @return list of categories
	 */
	@GetMapping("category")
	public ResponseEntity<List<Category>> getAllCategory(){
		return new ResponseEntity<>(service.getAllCategory(), HttpStatus.OK);		
	}
	
	/**
	 * Get all reviews of a product
	 * 
	 * @param productId
	 * @return List of Review
	 * @throws ProductNotFoundException
	 */
	@GetMapping("/review/{productId}")
	public ResponseEntity<List<Review>> getProductReview(@PathVariable("productId") long productId) throws ProductNotFoundException{
		return new ResponseEntity<>(service.getProductReview(productId), HttpStatus.OK);
	}
	
	/*
	 * Checks if backend is reachable or not.
	 */
	@GetMapping("/")
	public ResponseEntity<String> backendReachable(){
		return new ResponseEntity<>("Market Backend Reached",HttpStatus.OK);
	}
}
