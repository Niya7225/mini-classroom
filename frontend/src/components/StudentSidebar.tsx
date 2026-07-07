import {
    FaHome,
    FaBook,
    FaClipboardList,
    FaExclamationCircle,
    FaCog,
} from "react-icons/fa";

interface Props {
    activeSection: string;
    setActiveSection:
        React.Dispatch<React.SetStateAction<string>>;
}

function StudentSidebar({
    activeSection,
    setActiveSection,
}: Props) {
    const menu = [
        {
            name: "home",
            label: "Home",
            icon: <FaHome />,
        },
        {
            name: "courses",
            label: "Enrolled Courses",
            icon: <FaBook />,
        },
        {
            name: "assignments",
            label: "Assignments",
            icon: <FaClipboardList />,
        },
        {
            name: "due",
            label: "Due Soon",
            icon: <FaExclamationCircle />,
        },
        {
            name: "settings",
            label: "Settings",
            icon: <FaCog />,
        },
    ];

    return (
        <div className="w-72 bg-gray-100 rounded-xl p-4 shadow">
            <h1 className="text-2xl font-bold mb-8">
                Classroom
            </h1>

            {menu.map((item) => (
                <button
                    key={item.name}
                    onClick={() =>
                        setActiveSection(item.name)
                    }
                    className={`w-full flex items-center gap-3 p-3 rounded-xl mb-3 text-left
                    ${
                        activeSection === item.name
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-200"
                    }`}
                >
                    {item.icon}
                    {item.label}
                </button>
            ))}
        </div>
    );
}

export default StudentSidebar;