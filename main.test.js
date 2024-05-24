const {Facility,BookingManager}=require("./main")

describe('Facility Booking System',()=>{
    describe('Facility Class',()=>{
        test('calculates rate correctly for Clubhouse',()=>{
            const clubhouse = new Facility("Clubhouse",[{start:10, end:16, rate:100},{start:16 , end:22, rate:500}])
            expect(clubhouse.getRate(16,18)).toBe(1000)

        })
    })
})

describe('BookingManager Class', () => {
    let bookingManager;

    beforeEach(() => {
      bookingManager = new BookingManager();
    });

    test('books facility correctly', () => {
      const clubhouse = new Facility("Clubhouse", [{ start: 10, end: 16, rate: 100 }, { start: 16, end: 22, rate: 500 }]);

      const result = bookingManager.bookFacility(clubhouse, "2024-10-26", 16, 18);
      expect(result).toBe("Booked, Rs. 1000");
    });

    test('fails booking for already booked slot', () => {
      const tennisCourt = new Facility("Tennis Court", [], 50);

      bookingManager.bookFacility(tennisCourt, "2024-10-26", 16, 18);
      const result = bookingManager.bookFacility(tennisCourt, "2024-10-26", 16, 18);
      expect(result).toBe("Booking Failed, Already Booked");
    });

    test('fails booking for past date', () => {
      const clubhouse = new Facility("Clubhouse", [{ start: 10, end: 16, rate: 100 }, { start: 16, end: 22, rate: 500 }]);

      const result = bookingManager.bookFacility(clubhouse, "2022-10-26", 16, 18);
      expect(result).toBe("Booking Failed, Date must be greater than the current Date");
    });

    test('fails booking for overlapping time slots', () => {
      const clubhouse = new Facility("Clubhouse", [{ start: 10, end: 16, rate: 100 }, { start: 16, end: 22, rate: 500 }]);

      bookingManager.bookFacility(clubhouse, "2024-10-26", 16, 18);
      const result = bookingManager.bookFacility(clubhouse, "2024-10-26", 17, 19);
      expect(result).toBe("Booking Failed, Already Booked");
    });
  });
