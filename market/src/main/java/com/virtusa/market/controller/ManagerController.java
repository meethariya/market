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
import org.springframework.web.bind.annotation.CrossOrigin;
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

import com.virtusa.market.dto.InventoryDto;
import com.virtusa.market.dto.ProductDto;
import com.virtusa.market.exception.IncorrectFormDetailsException;
import com.virtusa.market.exception.ProductAlreadyExistsException;
import com.virtusa.market.exception.ProductNotFoundException;
import com.virtusa.market.model.Order;
import com.virtusa.market.model.Product;
import com.virtusa.market.service.ManagerService;

import jakarta.validation.Valid;

/**
 * All methods specific for Manager.<br>
 * Security Level: <strong>Manager role</strong>.
 * 
 * @author meet
 * @since 12-Feb-2023
 */
@RestController
@RequestMapping("/manager")
@CrossOrigin(origins = {"${angular}"})
public class ManagerController {

	@Autowired
	private ManagerService managerService;

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
			@RequestParam(name = "images", required = false) MultipartFile[] files) throws ProductAlreadyExistsException, IOException {

		FieldError fieldError = error.getFieldError();
		if (fieldError != null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}

		long id = managerService.addProduct(productDto, files);
		return new ResponseEntity<>(id, HttpStatus.CREATED);
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
	 * @throws ProductNotFoundException 
	 */
	@PutMapping("/product/{id}")
	public ResponseEntity<Product> editProduct(@PathVariable(value = "id") int id,
			@Valid @ModelAttribute("product") ProductDto productDto, Errors error,
			@RequestParam(name = "images", required = false) MultipartFile[] files) throws ProductAlreadyExistsException, IOException, ProductNotFoundException {

		FieldError fieldError = error.getFieldError();
		if (fieldError != null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}

		Product updated = managerService.editProduct(id, productDto, files);
		return new ResponseEntity<>(updated, HttpStatus.ACCEPTED);
	}

	/**
	 * Deletes the Product, given its Id. Also deletes its images.
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

	/**
	 * Saves product to inventory
	 * 
	 * @param inventoryDto
	 * @param error
	 * @return Id of the inventory created
	 * @throws ProductNotFoundException
	 */
	@PostMapping("/inventory")
	public ResponseEntity<Long> addToInventory(@Valid @ModelAttribute("inventory") InventoryDto inventoryDto,
			Errors error) throws ProductNotFoundException {
		
		FieldError fieldError = error.getFieldError();
		if (fieldError != null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}
		
		return new ResponseEntity<>(managerService.addToInventory(inventoryDto), HttpStatus.CREATED);
	}
	
	/**
	 * Reduces Stock quantity.
	 * 
	 * @param inventoryDto
	 * @param error
	 * @return Id of the inventory created
	 * @throws ProductNotFoundException
	 */
	@PostMapping("/reduceInventory")
	public ResponseEntity<Long> removeFromInventory(@Valid @ModelAttribute("inventory") InventoryDto inventoryDto,
			Errors error) throws ProductNotFoundException{
		
		FieldError fieldError = error.getFieldError();
		if (fieldError != null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}
		
		return new ResponseEntity<>(managerService.removeFromInventory(inventoryDto), HttpStatus.OK);
	}
	
	/**
	 * @return list of Order
	 */
	@GetMapping("order")
	public ResponseEntity<List<Order>> getAllOrders(){
		return new ResponseEntity<>(managerService.getAllOrders(), HttpStatus.OK);
	}
		
}
