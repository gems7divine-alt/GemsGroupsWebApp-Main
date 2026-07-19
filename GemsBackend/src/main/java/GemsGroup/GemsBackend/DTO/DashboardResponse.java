package GemsGroup.GemsBackend.DTO;

import java.util.List;

public class DashboardResponse {

    private String todayStatus;
    private String checkIn;
    private String workingHours;
    private String weeklyHours;

    private List<Integer> weeklyChart;

    public DashboardResponse() {
    }

    public DashboardResponse(String todayStatus,
                             String checkIn,
                             String workingHours,
                             String weeklyHours,
                             List<Integer> weeklyChart) {

        this.todayStatus = todayStatus;
        this.checkIn = checkIn;
        this.workingHours = workingHours;
        this.weeklyHours = weeklyHours;
        this.weeklyChart = weeklyChart;
    }

    public String getTodayStatus() {
        return todayStatus;
    }

    public void setTodayStatus(String todayStatus) {
        this.todayStatus = todayStatus;
    }

    public String getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(String checkIn) {
        this.checkIn = checkIn;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours;
    }

    public String getWeeklyHours() {
        return weeklyHours;
    }

    public void setWeeklyHours(String weeklyHours) {
        this.weeklyHours = weeklyHours;
    }

    public List<Integer> getWeeklyChart() {
        return weeklyChart;
    }

    public void setWeeklyChart(List<Integer> weeklyChart) {
        this.weeklyChart = weeklyChart;
    }
}
