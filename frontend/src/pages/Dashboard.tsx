import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CreateCourse from "../components/CreateCourse";
import MyCourses from "../components/MyCourses";
import StudentLayout from "../components/StudentLayout";

function Dashboard() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(0);

    function handleLogout() {
        auth?.logout();
        navigate("/login");
    }

    function toggleSection(section: string) {
        setActiveSection(
            activeSection === section ? null : section
        );
    }

     return (
        <div className="p-8">
            <div className="border p-8 rounded-xl shadow">
                <h1 className="text-2xl font-bold">
                    Welcome {auth?.user?.name}
                </h1>

                <p className="mt-3">
                    Email: {auth?.user?.email}
                </p>

                <p>
                    Role: {auth?.user?.role}
                </p>

                <button
                    onClick={handleLogout}
                    className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {auth?.user?.role === "teacher" ? (
                <div className="mt-8">
                    <button
                        onClick={() =>
                            toggleSection("create")
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-3"
                    >
                        Create Course
                    </button>

                    <button
                        onClick={() =>
                            toggleSection("courses")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        My Courses
                    </button>

                    {activeSection ===
                        "create" && (
                        <CreateCourse
                            onCourseCreated={() =>
                                setRefresh(
                                    refresh + 1
                                )
                            }
                        />
                    )}

                    {activeSection ===
                        "courses" && (
                        <MyCourses
                            refresh={refresh}
                        />
                    )}
                </div>
            ) : (
                <StudentLayout />
            )}
        </div>
    );
}

export default Dashboard;