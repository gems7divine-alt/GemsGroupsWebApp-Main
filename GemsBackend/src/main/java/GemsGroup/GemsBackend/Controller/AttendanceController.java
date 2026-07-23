package GemsGroup.GemsBackend.Controller;

import GemsGroup.GemsBackend.DTO.AdminAttendanceResponse;
import GemsGroup.GemsBackend.DTO.AttendanceResponse;
import GemsGroup.GemsBackend.DTO.DashboardResponse;
import GemsGroup.GemsBackend.Service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Dashboard

    @GetMapping("/dashboard/{email}")
    public DashboardResponse dashboard(
            @PathVariable String email){

        return attendanceService.getDashboard(email);

    }

    // Attendance History

    @GetMapping("/{email}")
    public List<AttendanceResponse> attendance(
            @PathVariable String email){

        return attendanceService.getAttendance(email);

    }

    // Check In

    @PostMapping("/checkin/{email}")
    public String checkIn(
            @PathVariable String email){

        return attendanceService.checkIn(email);

    }

    // Check Out

    @PostMapping("/checkout/{email}")
    public String checkOut(
            @PathVariable String email){

        return attendanceService.checkOut(email);

    }

    @GetMapping("/admin")
    public List<AdminAttendanceResponse> getAdminAttendance(){

        return attendanceService.getAdminAttendance();

    }
}
