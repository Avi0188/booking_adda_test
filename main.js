class Facility{
    constructor(name, slots=[], rate=null){
        this.name=name;
        this.slots=slots;
        this.rate=rate;
    }

    getRate(startTime, endTime){
        if(this.slots.length>0){
            for(let i=0;i<this.slots.length;i++){
        const slot= this.slots[i];
        if(startTime>=slot.start &&endTime<=slot.end){
            return (endTime-startTime)*slot.rate
        }
            }
        }
        else{
            return (endTime-startTime)*this.rate;
        }
        throw new Error("Invalid Time Slot")
    }
}

class BookingManager {
    constructor() {
      this.bookedSlots = {};
    }
  
    isValidDate(date) {
      const currentDate = new Date();
      const bookingDate = new Date(date);
      return bookingDate > currentDate;
    }
  
    isOverlapping(existingBookings, startTime, endTime) {
      for (const booking of existingBookings) {
        if ((startTime >= booking.startTime && startTime < booking.endTime) ||
            (endTime > booking.startTime && endTime <= booking.endTime)) {
          return true;
        }
      }
      return false;
    }
  
    bookFacility(facility, date, startTime, endTime) {
      if (!this.isValidDate(date)) {
        return "Booking Failed, Date must be greater than the current Date";
      }
  
      if (!this.bookedSlots[date]) {
        this.bookedSlots[date] = [];
      }
  
      if (this.isOverlapping(this.bookedSlots[date], startTime, endTime)) {
        return "Booking Failed, Already Booked";
      }
  
      try {
        const cost = facility.getRate(startTime, endTime);
        this.bookedSlots[date].push({ facility: facility.name, startTime, endTime, cost });
        return `Booked, Rs. ${cost}`;
      } catch (error) {
        return `Booking Failed, ${error.message}`;
      }
    }
  }
  

  const facilities = [
    new Facility("Clubhouse", [{ start: 10, end: 16, rate: 100 }, { start: 16, end: 22, rate: 500 }]),
    new Facility("Tennis Court", [], 50)
  ];
  
  const bookingManager = new BookingManager();
  
  console.log(bookingManager.bookFacility(facilities[0], "2024-10-26", 16, 22)); 
  console.log(bookingManager.bookFacility(facilities[1], "2024-10-26", 16, 20)); 
  console.log(bookingManager.bookFacility(facilities[0], "2024-10-26", 16, 22)); 
  console.log(bookingManager.bookFacility(facilities[1], "2024-10-26", 17, 21)); 

module.exports = {Facility, BookingManager}