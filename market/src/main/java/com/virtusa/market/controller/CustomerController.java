/**
 * market
 */
package com.virtusa.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtusa.market.model.Product;
import com.virtusa.market.service.CustomerService;

/**
 * Must require role as Customer to access these URL
 * Redirected from GeneralController#postLogin
 * @author meet
 * @since 12-Feb-2023
 */
@RestController
@RequestMapping("/customer")
public class CustomerController {
	
	@Autowired
	CustomerService customerService;
	
	@GetMapping("/")
	public ResponseEntity<String> customerHome(){
		return new ResponseEntity<>("Customer Home",HttpStatus.OK);
	}
	
	/**
	 * @return List of products and its image path
	 */
	@GetMapping("/product")
	public ResponseEntity<List<Product>> getAllProduct(){
		return new ResponseEntity<>(customerService.getAllProducts(), HttpStatus.OK);
	}
}
