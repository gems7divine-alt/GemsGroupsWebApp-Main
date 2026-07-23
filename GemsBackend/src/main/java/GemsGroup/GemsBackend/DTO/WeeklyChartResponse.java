package GemsGroup.GemsBackend.DTO;

public class WeeklyChartResponse {

    private String day;
    private int hours;

    public WeeklyChartResponse() {
    }

    public WeeklyChartResponse(String day, int hours) {
        this.day = day;
        this.hours = hours;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }
}
