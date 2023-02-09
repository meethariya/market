/**
 * market
 */
package com.virtusa.market.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

/**
 * @author meet
 * 10-Feb-2023
 */
@Entity
public class Manager {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	@OneToOne(cascade = CascadeType.REMOVE)
	private User user;
	
	/**
	 * 
	 */
	public Manager() {
		super();
	}
	
	/**
	 * @param id
	 * @param user
	 */
	public Manager(long id, User user) {
		super();
		this.id = id;
		this.user = user;
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
	 * @return the user
	 */
	public User getUser() {
		return user;
	}
	
	/**
	 * @param user the user to set
	 */
	public void setUser(User user) {
		this.user = user;
	}
	
	/**
	 * @return the Manager model string value
	 */
	@Override
	public String toString() {
		return "Manager [id=" + id + ", user=" + user + "]";
	}
	
}
