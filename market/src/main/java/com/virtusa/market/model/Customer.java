/**
 * market
 */
package com.virtusa.market.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 * @author meet
 * @since 10-Feb-2023
 * @see User
 * @see Address
 */
@Entity
public class Customer {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(unique = true, nullable = false)
	private User user;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(nullable = false)
	private Address address;
	
	private boolean gender;
	
	@Column(length = 10,unique = true,nullable = false)
	private String phone;
	
	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private Date dob;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<CartList> cart = new HashSet<>();

	/**
	 * Default Constructor
	 */
	public Customer() {
		super();
	}

	/**
	 * @param id
	 * @param user
	 * @param address
	 * @param gender
	 * @param phone
	 * @param dob
	 * @param cart
	 */
	public Customer(long id, User user, Address address, boolean gender, String phone, Date dob, Set<CartList> cart) {
		super();
		this.id = id;
		this.user = user;
		this.address = address;
		this.gender = gender;
		this.phone = phone;
		this.dob = dob;
		this.cart = cart;
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
	 * @return the address
	 */
	public Address getAddress() {
		return address;
	}

	/**
	 * @param address the address to set
	 */
	public void setAddress(Address address) {
		this.address = address;
	}

	/**
	 * @return the gender
	 */
	public boolean isGender() {
		return gender;
	}

	/**
	 * @param gender the gender to set
	 */
	public void setGender(boolean gender) {
		this.gender = gender;
	}

	/**
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * @return the dob
	 */
	public Date getDob() {
		return dob;
	}

	/**
	 * @param dob the dob to set
	 */
	public void setDob(Date dob) {
		this.dob = dob;
	}

	/**
	 * @return the cart
	 */
	public Set<CartList> getCart() {
		return cart;
	}

	/**
	 * @param cart the cart to set
	 */
	public void setCart(Set<CartList> cart) {
		this.cart = cart;
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", user=" + user + ", address=" + address + ", gender=" + gender + ", phone="
				+ phone + ", dob=" + dob + ", cart=" + cart + "]";
	}
	
	
}
