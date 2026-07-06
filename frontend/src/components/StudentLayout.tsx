import { useState } from "react";
import StudentSidebar from "./StudentSidebar";
import StudentHome from "./StudentHome";
import StudentCourses from "./StudentCourses";
import StudentAssignments from "./StudentAssignments";
import StudentSettings from "./StudentSettings";
import DueAssignments from "./DueAssignments";

function StudentLayout() {
    const [activeSection, setActiveSection] =
        useState("home");

    return (
        <div className="flex mt-8">
            <StudentSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <div className="flex-1 p-8">
                {activeSection === "home" && (
                    <StudentHome />
                )}

                {activeSection === "courses" && (
                    <StudentCourses />
                )}

                {activeSection === "assignments" && (
                    <StudentAssignments />
                )}

                {activeSection === "due" && (
                    <DueAssignments />
                )}

                {activeSection === "settings" && (
                    <StudentSettings />
                )}
            </div>
        </div>
    );
}

export default StudentLayout;