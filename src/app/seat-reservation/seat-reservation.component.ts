import { Component } from '@angular/core';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent {
  rows: number[] = Array(12).fill(0).map((_, index) => (index < 11 ? 7 : 3)); // 11 rows of 7, 1 row of 3
  seats: string[][] = Array.from({ length: 12 }, (_, i) => Array(this.rows[i]).fill('A')); // 'A' for available
  totalSeats: number = 80;
  reservedSeats: number = 0;
  numSeatsToReserve: number = 1; // Default to 1 for user input
  lastBookedSeats: number[] = []; // Array to store the last booked seat numbers

  reserveSeats() {
    if (this.reservedSeats >= this.totalSeats || this.numSeatsToReserve < 1 || this.numSeatsToReserve > 7) {
      alert('Invalid reservation request or seats already full.');
      return;
    }

    this.lastBookedSeats = []; // Reset last booked seats before new reservation

    for (let i = 0; i < this.seats.length; i++) {
      let availableCount = 0;
      for (let j = 0; j < this.seats[i].length; j++) {
        if (this.seats[i][j] === 'A') {
          availableCount++;
        } else {
          availableCount = 0; // Reset count if we hit a reserved seat
        }
        
        // Reserve the seats if we find enough available
        if (availableCount === this.numSeatsToReserve) {
          let bookedSeats = [];
          for (let k = 0; k < this.numSeatsToReserve; k++) {
            this.seats[i][j - k] = 'B'; // Mark as reserved
            bookedSeats.push(this.getSeatNumber(i, j - k)); // Store booked seat numbers
            this.lastBookedSeats.push(this.getSeatNumber(i, j - k)); // Add to last booked seats
          }
          this.reservedSeats += this.numSeatsToReserve;
          alert(`Successfully reserved seats: ${bookedSeats.join(', ')}.`);
          return;
        }
      }
    }

    alert('Not enough contiguous seats available.');
  }

  getSeatNumber(rowIndex: number, seatIndex: number): number {
    return (rowIndex * 7 + seatIndex + 1); // Calculate seat number
  }

  getAvailableSeatsCount(): number {
    let count = 0;
    this.seats.forEach(row => {
      row.forEach(seat => {
        if (seat === 'A') count++;
      });
    });
    return count;
  }
}
