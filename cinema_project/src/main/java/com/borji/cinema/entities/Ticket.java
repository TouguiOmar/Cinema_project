package com.borji.cinema.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class Ticket {
	@Id@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(length = 75)
	private String nomClient;
	private double prix;
	@Column(unique=false)
	private Integer codePayement;
	private boolean reserve;
	@ManyToOne
	private Place place;
	@ManyToOne
	private Projection projection;
}
