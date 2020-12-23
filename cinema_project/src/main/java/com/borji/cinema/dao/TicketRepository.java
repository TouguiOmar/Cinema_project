package com.borji.cinema.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.borji.cinema.entities.Ticket;

@RepositoryRestResource
@CrossOrigin("*")
public interface TicketRepository extends JpaRepository<Ticket, Long>{

}
