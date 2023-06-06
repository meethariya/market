/**
 * market
 */
package com.virtusa.market.dto;

import java.util.Arrays;

/**
 * A Sample template for setting up email message details.
 * 
 * @author meet
 * @since 06-Jun-2023
 */
public class EmailDetails {
	private String[] recipients;
	private String subject;
	private String body;
	
	/**
	 * Parameterized constructor
	 * 
	 * @param recipients
	 * @param subject
	 * @param body
	 */
	public EmailDetails(String[] recipients, String subject, String body) {
		super();
		this.recipients = recipients;
		this.subject = subject;
		this.body = body;
	}
	
	/**
	 * Default Constructor
	 */
	public EmailDetails() {
		super();
	}
	
	/**
	 * @return the recipients
	 */
	public String[] getRecipients() {
		return recipients;
	}
	
	/**
	 * @param recipients the recipients to set
	 */
	public void setRecipients(String[] recipients) {
		this.recipients = recipients;
	}
	
	/**
	 * @return the subject
	 */
	public String getSubject() {
		return subject;
	}
	
	/**
	 * @param subject the subject to set
	 */
	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	/**
	 * @return the body
	 */
	public String getBody() {
		return body;
	}
	
	/**
	 * @param body the body to set
	 */
	public void setBody(String body) {
		this.body = body;
	}
	
	/**
	 * To string value for EmailDetails
	 */
	@Override
	public String toString() {
		return "EmailDetails [recipients=" + Arrays.toString(recipients) + ", subject=" + subject + ", body=" + body
				+ "]";
	}
	
}
