/**
 * market
 */
package com.virtusa.market.dto;

import java.util.Date;

import com.virtusa.market.model.Inventory;
import com.virtusa.market.model.Product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * ALl fields of {@link Inventory}
 * Generates proper models from raw input.<br>
 * Contains all backend validation annotations.
 * @author meet
 * @since 15-Feb-2023
 */
public class InventoryDto {
	@NotNull(message = "{NotNull.inventory.id}")
	@Min(value = 1, message = "{Min.inventory.id}")
	private long id;
	
	@NotNull(message = "{NotNull.inventory.quantity}")
	@Min(value = 1, message = "{Min.inventory.quantity}")
	private long quantity;
	
	private Product product;
	
	private Inventory inventory;
	
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
	 * @return the quantity
	 */
	public long getQuantity() {
		return quantity;
	}
	
	/**
	 * @param quantity the quantity to set
	 */
	public void setQuantity(long quantity) {
		this.quantity = quantity;
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
	public void setProduct(Product product) {
		this.product = product;
	}
	
	/**
	 * @return the inventory
	 */
	public Inventory getInventory() {
		return inventory;
	}
	
	/**
	 * the inventory to set using other field attributes
	 */
	public void setInventory() {
		Inventory temp = new Inventory();
		temp.setQuantity(getQuantity());
		temp.setProduct(getProduct());
		temp.setLastImportDate(new Date());
		this.inventory = temp;
	}
	
}
