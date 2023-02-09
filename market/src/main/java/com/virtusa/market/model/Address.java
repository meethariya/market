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
 * 10-Feb-2023
 */
@Entity
public class Address {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	@Column(length = 30, nullable = false)
	private String houseNo;
	@Column(length = 50, nullable = false)
	private String addressLine1;
	@Column(length = 50)
	private String addressLine2;
	@Column(length = 30, nullable = false)
	private String city;
	@Column(length = 30, nullable = false)
	private String state;
	@Column(nullable = false)
	private int pincode;
	
	/**
	 * Default Constructor
	 */
	public Address() {
		super();
	}

	/**
	 * @param id
	 * @param houseNo
	 * @param addressLine1
	 * @param addressLine2
	 * @param city
	 * @param state
	 * @param pincode
	 */
	public Address(long id, String houseNo, String addressLine1, String addressLine2, String city, String state,
			int pincode) {
		super();
		this.id = id;
		this.houseNo = houseNo;
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
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
	 * @return the houseNo
	 */
	public String getHouseNo() {
		return houseNo;
	}

	/**
	 * @param houseNo the houseNo to set
	 */
	public void setHouseNo(String houseNo) {
		this.houseNo = houseNo;
	}

	/**
	 * @return the addressLine1
	 */
	public String getAddressLine1() {
		return addressLine1;
	}

	/**
	 * @param addressLine1 the addressLine1 to set
	 */
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	/**
	 * @return the addressLine2
	 */
	public String getAddressLine2() {
		return addressLine2;
	}

	/**
	 * @param addressLine2 the addressLine2 to set
	 */
	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @param city the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * @return the pincode
	 */
	public int getPincode() {
		return pincode;
	}

	/**
	 * @param pincode the pincode to set
	 */
	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	/**
	 * @return the Address Model string value
	 */
	@Override
	public String toString() {
		return "Address [id=" + id + ", houseNo=" + houseNo + ", addressLine1=" + addressLine1 + ", addressLine2="
				+ addressLine2 + ", city=" + city + ", state=" + state + ", pincode=" + pincode + "]";
	}
	
}
