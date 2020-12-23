import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CinemaService} from "../services/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes; public cinemas; public salles; public projections;
  public currentVille; public currentCinema;
  public currentProjection;
  public selectedTickets;

  constructor(public cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getVilles()
      .subscribe(data=>{
        this.villes = data;
      },err=>{
        console.log(err);
      })
  }

  onGetCinemas(v) {
    this.currentVille=v;
    this.cinemaService.getCinemas(v)
      .subscribe(data => {
        this.cinemas = data;
      },err=>{
        console.log(err);
      })
  }
  getTicketClass(t){
  let str="btn ticket"
  if(t.reseeve==true){
 str+=" btn-danger ";
  } else if(t.selected){

  str+=" btn-warning "
  }
  else
  {
  str+= " btn-success "
  }
  return str;



  }
  onGetTicketsPLaces(p){
  this.currentProjection=p;
  this.cinemaService.getTicketsPLaces(p)
  .subscribe(data=>{
 this.currentProjection.tickets=data;
 this.selectedTickets=[];
  },
  err=>{
console.log(err);
  }

  )


  }
  onPayTickets(dataForm){
let tickets=[];
this.selectedTickets.forEach(t=>{
tickets.push(t.id);
})
dataForm.tickets=tickets;
this.cinemaService.payerTickets(dataForm).subscribe(data=>
{
alert("Ticket Réservé avec succés")
this.onGetTicketsPLaces(this.currentProjection);
},
err=>{
console.log(err);
}
)

  }
  onSelectTicket(t){
  if(!t.selected){
  t.selected=true;
  this.selectedTickets.push(t);
  }
else {
 t.selected=false;
  this.selectedTickets.slice(this.selectedTickets.indexOf(t),1);

}


  }

  onGetSalles(c) {
    this.currentCinema=c;
    this.cinemaService.getSalles(c)
      .subscribe(data => {
        this.salles = data;
        this.salles._embedded.salles.forEach(salle=>{
          this.cinemaService.getProjections(salle)
            .subscribe(data => {
              salle.projections = data;
            },err=>{
              console.log(err);
            })
        })
      },err=>{
        console.log(err);
      })
  }
}
