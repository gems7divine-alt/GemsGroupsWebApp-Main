package GemsGroup.GemsBackend.Service;

import GemsGroup.GemsBackend.Entity.User;
import GemsGroup.GemsBackend.Entity.Attendance;
import GemsGroup.GemsBackend.DTO.DashboardResponse;
import GemsGroup.GemsBackend.DTO.AttendanceResponse;
import GemsGroup.GemsBackend.DTO.AdminAttendanceResponse;
import GemsGroup.GemsBackend.Repository.AttendanceRepository;
import GemsGroup.GemsBackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    private final ZoneId IST = ZoneId.of("Asia/Kolkata");

    private final DateTimeFormatter TIME_FORMAT =
            DateTimeFormatter.ofPattern("hh:mm a");

    private final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("dd-MM-yyyy");


    // ===========================================================
    // CHECK IN
    // ===========================================================

    public String checkIn(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        LocalDate today = LocalDate.now(IST);

        Attendance attendance = attendanceRepository
                .findByUserAndDate(user, today)
                .orElse(null);

        if (attendance != null) {

            return "Already Checked In Today";

        }

        attendance = new Attendance();

        attendance.setUser(user);
        attendance.setDate(today);

        attendance.setCheckIn(LocalTime.now(IST));

        attendance.setStatus("Present");

        attendance.setWorkingHours("00:00");

        attendanceRepository.save(attendance);

        return "Checked In Successfully";
    }

    // ===========================================================
    // CHECK OUT
    // ===========================================================

    public String checkOut(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        LocalDate today = LocalDate.now(IST);

        Attendance attendance = attendanceRepository
                .findByUserAndDate(user, today)
                .orElseThrow(() ->
                        new RuntimeException("Please Check In First"));

        if (attendance.getCheckOut() != null) {

            return "Already Checked Out";

        }

        LocalTime checkout = LocalTime.now(IST);

        attendance.setCheckOut(checkout);

        String workingHours = calculateWorkingHours(
                attendance.getCheckIn(),
                checkout
        );

        attendance.setWorkingHours(workingHours);

        attendanceRepository.save(attendance);

        return "Checked Out Successfully";
    }

    // ===========================================================
    // CALCULATE WORKING HOURS
    // ===========================================================

    private String calculateWorkingHours(
            LocalTime checkIn,
            LocalTime checkOut
    ) {

        Duration duration =
                Duration.between(checkIn, checkOut);

        long hours = duration.toHours();

        long minutes =
                duration.toMinutes() % 60;

        return String.format("%02d:%02d",
                hours,
                minutes);
    }
    // ===========================================================
    // DASHBOARD
    // ===========================================================

    public DashboardResponse getDashboard(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        LocalDate today = LocalDate.now(IST);

        Attendance todayAttendance = attendanceRepository
                .findByUserAndDate(user, today)
                .orElse(null);

        DashboardResponse response = new DashboardResponse();

        if (todayAttendance == null) {

            response.setTodayStatus("Absent");
            response.setCheckIn("--");
            response.setWorkingHours("00:00");

        } else {

            response.setTodayStatus(todayAttendance.getStatus());

            if (todayAttendance.getCheckIn() != null) {
                response.setCheckIn(
                        todayAttendance.getCheckIn().format(TIME_FORMAT)
                );
            } else {
                response.setCheckIn("--");
            }

            response.setWorkingHours(
                    todayAttendance.getWorkingHours()
            );
        }

        response.setWeeklyHours(calculateWeeklyHours(user));
        response.setWeeklyChart(getWeeklyChart(user));

        return response;
    }

    // ===========================================================
    // ATTENDANCE HISTORY
    // ===========================================================

    public List<AttendanceResponse> getAttendance(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        List<Attendance> attendanceList =
                attendanceRepository.findByUserOrderByDateDesc(user);

        List<AttendanceResponse> response = new ArrayList<>();

        for (Attendance attendance : attendanceList) {

            AttendanceResponse dto = new AttendanceResponse();

            dto.setDate(
                    attendance.getDate().format(DATE_FORMAT)
            );

            dto.setStatus(attendance.getStatus());

            dto.setTotalHours(attendance.getWorkingHours());

            dto.setCheckIn(
                    attendance.getCheckIn() == null
                            ? "--"
                            : attendance.getCheckIn().format(TIME_FORMAT)
            );

            dto.setCheckOut(
                    attendance.getCheckOut() == null
                            ? "--"
                            : attendance.getCheckOut().format(TIME_FORMAT)
            );

            response.add(dto);
        }

        return response;
    }

    // ===========================================================
    // WEEKLY HOURS
    // ===========================================================

    private String calculateWeeklyHours(User user) {

        LocalDate today = LocalDate.now(IST);

        LocalDate start =
                today.with(DayOfWeek.MONDAY);

        LocalDate end =
                start.plusDays(6);

        List<Attendance> week =
                attendanceRepository.findByUserAndDateBetween(
                        user,
                        start,
                        end
                );

        long totalMinutes = 0;

        for (Attendance attendance : week) {

            if (attendance.getCheckIn() != null &&
                    attendance.getCheckOut() != null) {

                Duration duration =
                        Duration.between(
                                attendance.getCheckIn(),
                                attendance.getCheckOut()
                        );

                totalMinutes += duration.toMinutes();
            }

        }

        long hours = totalMinutes / 60;

        long minutes = totalMinutes % 60;

        return String.format("%02d:%02d",
                hours,
                minutes);
    }

    // ===========================================================
    // WEEKLY CHART
    // ===========================================================

    private List<Integer> getWeeklyChart(User user) {

        LocalDate today = LocalDate.now(IST);

        LocalDate monday =
                today.with(DayOfWeek.MONDAY);

        List<Integer> chart = new ArrayList<>();

        for (int i = 0; i < 7; i++) {

            LocalDate current = monday.plusDays(i);

            Attendance attendance =
                    attendanceRepository
                            .findByUserAndDate(user, current)
                            .orElse(null);

            if (attendance == null ||
                    attendance.getCheckIn() == null ||
                    attendance.getCheckOut() == null) {

                chart.add(0);

            } else {

                Duration duration =
                        Duration.between(
                                attendance.getCheckIn(),
                                attendance.getCheckOut()
                        );

                chart.add((int) duration.toHours());
            }

        }

        return chart;
    }

    public List<AdminAttendanceResponse> getAdminAttendance() {

        List<Attendance> attendanceList =
                attendanceRepository.findAllByOrderByDateDesc();

        List<AdminAttendanceResponse> response = new ArrayList<>();

        for (Attendance attendance : attendanceList) {

            AdminAttendanceResponse dto =
                    new AdminAttendanceResponse();

            dto.setId(
                    Math.toIntExact(attendance.getUser().getId())
            );

            dto.setName(
                    attendance.getUser().getFullName()
            );

            dto.setDate(
                    attendance.getDate().format(DATE_FORMAT)
            );

            dto.setCheckIn(

                    attendance.getCheckIn()==null ?

                            "-" :

                            attendance.getCheckIn().format(TIME_FORMAT)

            );

            dto.setCheckOut(

                    attendance.getCheckOut()==null ?

                            "-" :

                            attendance.getCheckOut().format(TIME_FORMAT)

            );

            dto.setTotalHours(
                    attendance.getWorkingHours()
            );

            if(attendance.getCheckIn()!=null &&
                    attendance.getCheckOut()==null){

                dto.setStatus("Active");

            }
            else if(attendance.getCheckIn()!=null &&
                    attendance.getCheckOut()!=null){

                dto.setStatus("Completed");

            }
            else{

                dto.setStatus("Absent");

            }

            response.add(dto);

        }

        return response;

    }

}
