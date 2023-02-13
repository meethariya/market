/**
 * market
 */
package com.virtusa.market.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.virtusa.market.model.Category;
import com.virtusa.market.model.Product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

/**
 * All fields of {@link Product}, {@link Category}, {@link ProductImage}<br>
 * Generates proper models from raw input.<br>
 * Contains all backend validation annotations.
 * @author meet
 * @since 12-Feb-2023
 */
public class ProductDto {
	
	@NotEmpty(message = "{NotEmpty.product.name}")
	@Length(max = 30, message = "{Length.product.name}")
	private String name;
	
	@NotEmpty(message = "{NotEmpty.product.brand}")
	@Length(max = 30, message = "{Length.product.brand}")
	private String brand;
	
	@NotEmpty(message = "{NotEmpty.product.categoryName}")
	@Length(max = 30, message = "{Length.product.categoryName}")
	private String categoryName;
	
	@NotNull(message = "{NotNull.product.price}")
	@Min(value = 0, message= "{Min.product.price}")
	private double price;
	
	private byte rating = 0;
	
	private List<String> imagePath;
	
	private Product product;
	
	private Category category;
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the brand
	 */
	public String getBrand() {
		return brand;
	}
	/**
	 * @param brand the brand to set
	 */
	public void setBrand(String brand) {
		this.brand = brand;
	}
	/**
	 * @return the categoryName
	 */
	public String getCategoryName() {
		return categoryName;
	}
	/**
	 * @param categoryName the categoryName to set
	 */
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	/**
	 * @return the price
	 */
	public double getPrice() {
		return price;
	}
	/**
	 * @param price the price to set
	 */
	public void setPrice(double price) {
		this.price = price;
	}
	/**
	 * @return the rating
	 */
	public byte getRating() {
		return rating;
	}
	/**
	 * @param rating the rating to set
	 */
	public void setRating(byte rating) {
		this.rating = rating;
	}
	/**
	 * @return the product
	 */
	public Product getProduct() {
		return product;
	}
	/**
	 * @param product the product to set
	 */
	public void setProduct() {
		Product temp = new Product();
		temp.setName(getName());
		temp.setBrand(getBrand());
		temp.setCategory(getCategory());
		temp.setPrice(getPrice());
		temp.setRating(getRating());
		temp.setImagePath(getImagePath());
		this.product = temp;
	}
	/**
	 * @return the category
	 */
	public Category getCategory() {
		return category;
	}
	
	/**
	 * set category based on category name
	 */
	public void setCategory() {
		Category temp = new Category();
		temp.setCategoryName(getCategoryName());
		this.category = temp;
	}

	/**
	 * sets category given one 
	 * @param category
	 */
	public void setCategory(Category category) {
		this.category = category;
	}
	
	/**
	 * @return the imagePath
	 */
	public List<String> getImagePath() {
		return imagePath;
	}
	
	/**
	 * @param imagePath the imagePath to set
	 */
	public void setImagePath(List<String> imagePath) {
		this.imagePath = imagePath;
	}
	
	
}
