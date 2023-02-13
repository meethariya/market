/**
 * market
 */
package com.virtusa.market.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.virtusa.market.dto.ProductDto;
import com.virtusa.market.exception.IncorrectFormDetailsException;
import com.virtusa.market.exception.ProductAlreadyExistsException;
import com.virtusa.market.exception.ProductNotFoundException;
import com.virtusa.market.model.Product;
import com.virtusa.market.service.CustomerService;
import com.virtusa.market.service.ManagerService;

import jakarta.validation.Valid;

/**
 * Must require role as Manager to access these URL
 * 
 * @author meet
 * @since 12-Feb-2023
 */
@RestController
@RequestMapping("/manager")
public class ManagerController {

	@Autowired
	ManagerService managerService;

	@Autowired
	CustomerService customerService;

	@GetMapping("/")
	public ResponseEntity<String> managerHome() {
		return new ResponseEntity<>("Manager Home", HttpStatus.OK);
	}

	/**
	 * Saves product into database. Also saves its images to resource folder
	 * 
	 * @param productDto
	 * @param error
	 * @param files
	 * @return Id of the Product saved
	 * @throws ProductAlreadyExistsException
	 * @throws IOException
	 */
	@PostMapping("/product")
	public ResponseEntity<Long> addProduct(@Valid @ModelAttribute("product") ProductDto productDto, Errors error,
			@RequestParam("images") MultipartFile[] files) throws ProductAlreadyExistsException, IOException {

		FieldError fieldError = error.getFieldError();
		if (fieldError != null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}

		long id = managerService.addProduct(productDto, files);
		return new ResponseEntity<>(id, HttpStatus.CREATED);
	}

	/**
	 * @return List of products and its image path
	 */
	@GetMapping("/product")
	public ResponseEntity<List<Product>> getAllProduct() {
		return new ResponseEntity<>(customerService.getAllProducts(), HttpStatus.OK);
	}

	/**
	 * Updates the Product
	 * 
	 * @param id
	 * @param productDto
	 * @param error
	 * @param files
	 * @return updated Product
	 * @throws ProductAlreadyExistsException
	 * @throws IOException
	 */
	@PutMapping("/product/{id}")
	public ResponseEntity<Product> editProduct(@PathVariable(value = "id") int id,
			@Valid @ModelAttribute("product") ProductDto productDto, Errors error,
			@RequestParam("images") MultipartFile[] files) throws ProductAlreadyExistsException, IOException {

		FieldError fieldError = error.getFieldError();
		if (fieldError != null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}

		Product updated = managerService.editProduct(id, productDto, files);
		return new ResponseEntity<>(updated, HttpStatus.ACCEPTED);
	}

	/**
	 * Deletes the Product, given its Id.
	 * 
	 * @param id
	 * @return String
	 * @throws ProductNotFoundException
	 * @throws IOException
	 */
	@DeleteMapping("/product/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable("id") long id)
			throws ProductNotFoundException, IOException {
		managerService.deleteProduct(id);
		return new ResponseEntity<>("Deleted", HttpStatus.OK);
	}
}
