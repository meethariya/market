/**
 * market
 */
package com.virtusa.market.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.virtusa.market.dto.ProductDto;
import com.virtusa.market.exception.IncorrectFormDetailsException;
import com.virtusa.market.exception.ProductAlreadyExistsException;
import com.virtusa.market.service.ManagerService;

import jakarta.validation.Valid;

/**
 * Must require role as Manager to access these URL
 * @author meet
 * @since 12-Feb-2023
 */
@RestController
@RequestMapping("/manager")
public class ManagerController {

	@Autowired
	ManagerService managerService;
	
	@GetMapping("/")
	public ResponseEntity<String> managerHome(){
		return new ResponseEntity<>("Manager Home",HttpStatus.OK);
	}
	
	@PostMapping("/addProduct")
	public ResponseEntity<Long> addProduct(@Valid @ModelAttribute("product")ProductDto productDto, Errors error,
			@RequestParam("images")MultipartFile[] files) throws ProductAlreadyExistsException, IOException{
		
		FieldError fieldError = error.getFieldError();
		if (fieldError!=null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}
		
		long id = managerService.addProduct(productDto, files);
		return new ResponseEntity<>(id, HttpStatus.CREATED);
	}
}
