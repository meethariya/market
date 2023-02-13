/**
 * market
 */
package com.virtusa.market.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

/**
 * @author meet
 * @since 10-Feb-2023
 * @see Category
 */
@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(length = 30, nullable = false)
	private String name;
	
	@Column(length = 30)
	private String brand;
	
	@ManyToOne(cascade = CascadeType.DETACH)
	private Category category;
	
	@Column(nullable = false, precision = 2)
	private double price;
	
	@Column(nullable = false)
	private byte rating;
	
	@ElementCollection(fetch = FetchType.EAGER)
	private List<String> imagePath;
	
	/**
	 * Default constructor
	 */
	public Product() {
		super();
	}

	
	/**
	 * @param id
	 * @param name
	 * @param brand
	 * @param category
	 * @param price
	 * @param rating
	 * @param imagePath
	 */
	public Product(long id, String name, String brand, Category category, double price, byte rating,
			List<String> imagePath) {
		super();
		this.id = id;
		this.name = name;
		this.brand = brand;
		this.category = category;
		this.price = price;
		this.rating = rating;
		this.imagePath = imagePath;
	}


	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}

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
	 * @return the category
	 */
	public Category getCategory() {
		return category;
	}

	/**
	 * @param category the category to set
	 */
	public void setCategory(Category category) {
		this.category = category;
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

	/**
	 * @return Product model string value
	 */
	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", brand=" + brand + ", category=" + category + ", price="
				+ price + ", rating=" + rating + ", imagePath=" + imagePath + "]";
	}
	
	
}
