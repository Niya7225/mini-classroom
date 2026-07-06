import { useEffect, useState } from "react";

import { getMyEnrollments } from "../api/courses";
import { getCourseAssignments } from "../api/assignment";

interface Course {
    id: number;
    title: string;
    description: string;
}

interface Assignment {
    id: number;
    title: string;
    description: string;
    due_date: string;
}

function StudentHome() {
    const [courseCount, setCourseCount] = useState(0);
    const [assignmentCount, setAssignmentCount] = useState(0);
    const [dueSoonCount, setDueSoonCount] = useState(0);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const response = await getMyEnrollments();

            const courses: Course[] = response.data;

            setCourseCount(courses.length);

            let totalAssignments = 0;
            let dueSoon = 0;

            const today = new Date();
            const nextWeek = new Date();

            nextWeek.setDate(today.getDate() + 7);

            for (const course of courses) {
                const assignmentResponse =
                    await getCourseAssignments(course.id);

                const assignments: Assignment[] =
                    assignmentResponse.data;

                totalAssignments += assignments.length;

                assignments.forEach((assignment) => {
                    const dueDate = new Date(
                        assignment.due_date
                    );

                    if (
                        dueDate >= today &&
                        dueDate <= nextWeek
                    ) {
                        dueSoon++;
                    }
                });
            }

            setAssignmentCount(totalAssignments);
            setDueSoonCount(dueSoon);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">
                Welcome 👋
            </h1>

            <p className="mt-3 text-gray-600">
                Here's a quick overview of your classroom.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">

                <div className="bg-white border rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-600">
                        Enrolled Courses
                    </h2>

                    <p className="text-4xl font-bold text-blue-600 mt-4">
                        {courseCount}
                    </p>
                </div>

                <div className="bg-white border rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-600">
                        Assignments
                    </h2>

                    <p className="text-4xl font-bold text-green-600 mt-4">
                        {assignmentCount}
                    </p>
                </div>

                <div className="bg-white border rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-600">
                        Due Within 7 Days
                    </h2>

                    <p className="text-4xl font-bold text-red-600 mt-4">
                        {dueSoonCount}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default StudentHome;