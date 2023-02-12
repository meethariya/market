/**
 * market
 */
package com.virtusa.market.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Must require role as Customer to access these URL
 * Redirected from GeneralController#postLogin
 * @author meet
 * @since 12-Feb-2023
 */
@RestController
@RequestMapping("/customer")
public class CustomerController {
	@GetMapping("/")
	public ResponseEntity<String> customerHome(){
		return new ResponseEntity<>("Customer Home",HttpStatus.OK);
	}
}
