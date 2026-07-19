package GemsGroup.GemsBackend.DTO;

public class AttendanceResponse {

    private String date;
    private String checkIn;
    private String checkOut;
    private String totalHours;
    private String status;

    public AttendanceResponse() {
    }

    public AttendanceResponse(String date,
                              String checkIn,
                              String checkOut,
                              String totalHours,
                              String status) {

        this.date = date;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.totalHours = totalHours;
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(String checkIn) {
        this.checkIn = checkIn;
    }

    public String getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(String checkOut) {
        this.checkOut = checkOut;
    }

    public String getTotalHours() {
        return totalHours;
    }

    public void setTotalHours(String totalHours) {
        this.totalHours = totalHours;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
