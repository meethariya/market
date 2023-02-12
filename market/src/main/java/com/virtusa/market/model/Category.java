/**
 * market
 */
package com.virtusa.market.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * @author meet
 * @since 10-Feb-2023
 * @see Product
 */
@Entity
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(length = 30, nullable = false, unique = true)
	private String categoryName;
	
	/**
	 * Default constructor
	 */
	public Category() {
		super();
	}
	
	/**
	 * @param id
	 * @param category
	 */
	public Category(long id, String category) {
		super();
		this.id = id;
		this.categoryName = category;
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
	 * @return the category
	 */
	public String getCategoryName() {
		return categoryName;
	}

	/**
	 * @param category the category to set
	 */
	public void setCategoryName(String category) {
		this.categoryName = category;
	}

	/**
	 * @return the Category model string value
	 */
	@Override
	public String toString() {
		return "Category [id=" + id + ", category=" + categoryName + "]";
	}
	
	
}
