// Display one task as a card and shows title description priority  due date and status
import React from "react";
import type { TaskItemProps, TaskStatus } from "../../types/index.ts";

//React.Fc means React function component  also destructure  the props

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onStatusChange,
    onDelete,
}) => {
    //If/else picks backgound color then task.status and assigncolot to cardBackgroundColor
    let cardBackgroundColor: string; // Declareing the variable first

    if (task.status === "completed") {
        cardBackgroundColor = "#d3f8d6"; // task is done
    } else if (task.status === "in-progress") {
        cardBackgroundColor = "#bde1fa"; //task is being worked on
    } else {
        cardBackgroundColor = "#ffffff"; //task have not started
    }


    // If/else oick the priorty badge text color and back ground
    let priorityColor: string;  // The text color of badge
    let priorityBackgroundColor: string; // background color of the badge

    if (task.priority === "high") {
        priorityColor = "#ba4040" // red text
        priorityBackgroundColor = "rgb(247, 159, 159)" // Light red background

    } else if (task.priority === "medium") {
        priorityColor = "rgb(255, 138, 42)" // Orange text
        priorityBackgroundColor = "rgb(243, 168, 134)" // Light orange background
    } else {
        priorityColor = "rgb(43, 102, 21)" // Green text
        priorityBackgroundColor = "#94e689" // light green background
    }
    //EVENT HANDLER SATUS DROPDOWN
    // This function runs when user picks a new status from drop down menu
    // When  call onStatusChange which is passed in from the TaskList and tell this has a new status

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log('Task ID:', task.id, 'New Status:', e.target.value);
        onStatusChange(task.id, e.target.value as TaskStatus);
    };



    //EVENT HANDLER DELETE BUTTON
    //This function runs when user clicks the delte button then also showing confrimation popup if they want to delte

    const handleDelete = () => {
        // show popup asking to confirm
        const confirmed = window.confirm("Hold Up Are You Sure You Want To Delete This Task?")

        //if/else only delete if user picked ok
        if (confirmed) {
            // console.log('Task Deleted:', task.id);
            onDelete(task.id) // Tell tasklist to remove task
        } else {
            // console.log('Delete Cancelled for Task:', task.id);
        }
    }

    return (
        <div style={{ ...styles.card, backgroundColor: cardBackgroundColor }}>

            {/* Top row — title on the left, priority badge on the right */}
            <div style={styles.topRow}>
                <h3 style={styles.title}>{task.title}</h3>

                {/* Badge group — holds the priority badge */}
                <div style={styles.badgeGroup}>
                    <span style={{ ...styles.badge, color: priorityColor, backgroundColor: priorityBackgroundColor }}>
                        {task.priority}
                    </span>
                </div>
            </div>

            {/* Task description — extra details about what needs to be done */}
            <p style={styles.description}>{task.description}</p>

            {/* Due date — shows when the task needs to be finished */}
            <p style={styles.dueDate}>Due: {task.dueDate}</p>

            {/* Not done yet message — only shows when the task has NOT been completed */}
            {task.status !== "completed" && (
                <span style={styles.notDoneTag}>Not done yet</span>
            )}

            {/* Completed message — only shows when the task is done */}
            {task.status === "completed" && (
                <span style={styles.completedMessage}>Completed</span>
            )}

            {/* High priority warning — only appears when the task is marked high */}
            {task.priority === "high" && (
                <p style={styles.highPriorityWarning}>Warning: This is a high priority task!</p>
            )}

            {/* Bottom row — status dropdown and delete button sit side by side */}
            <div style={styles.bottomRow}>

                {/* Status dropdown — lets the user pick a new status, calls handleStatusChange */}
                <select style={styles.select} value={task.status} onChange={handleStatusChange}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

                {/* Delete button — removes the task when clicked, calls handleDelete */}
                <button style={styles.deleteButton} onClick={handleDelete}>
                    Delete
                </button>

            </div>

        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {

    card: {
        borderRadius: "16px",                                          // smooth rounded corners on the card
        padding: "24px",                                               // generous breathing room inside
        marginBottom: "16px",                                          // space between stacked cards
        boxShadow: "0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)", // soft floating shadow
        border: "1px solid rgba(0,0,0,0.05)",                         // barely visible border for definition
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",      // modern clean font stack
        transition: "box-shadow 0.2s ease, transform 0.2s ease",      // smooth animation when hovered
    },

    topRow: {
        display: "flex",                  // put title and badge side by side
        alignItems: "center",             // vertically center them
        justifyContent: "space-between",  // push title left, badge right
        marginBottom: "12px",             // space below before description
    },

    title: {
        fontSize: "17px",          // slightly larger than body text
        fontWeight: "600",         // semi-bold so it stands out
        color: "#111827",          // near-black for strong contrast
        margin: "0",               // remove default h3 margin
        letterSpacing: "-0.3px",   // tighten letters slightly for a modern feel
    },

    badgeGroup: {
        display: "flex",   // lay multiple badges side by side if needed
        gap: "8px",        // space between badges
        flexWrap: "wrap",  // wrap if there are too many to fit
    },

    badge: {
        display: "inline-block",
        padding: "4px 12px",      // pill-shaped padding — wide sides, short top/bottom
        borderRadius: "999px",    // fully round ends — classic pill shape
        fontSize: "12px",         // small text so it does not compete with the title
        fontWeight: "600",        // bold enough to read at small size
        letterSpacing: "0.3px",   // slight spacing makes small text easier to read
        textTransform: "capitalize", // auto-capitalizes "high" "medium" "low"
    },

    description: {
        fontSize: "14px",      // slightly smaller than title
        color: "#6b7280",      // muted grey — secondary info
        margin: "0 0 12px 0",  // space below before due date
        lineHeight: "1.65",    // loose line height makes paragraphs easy to read
    },

    dueDate: {
        fontSize: "13px",      // small — it is supporting info not the focus
        color: "#9ca3af",      // lighter grey than description
        margin: "0 0 12px 0",  // space below before tags
    },

    notDoneTag: {
        display: "inline-block",
        backgroundColor: "#f3f4f6",  // very light grey pill
        color: "#6b7280",            // muted text
        fontSize: "12px",
        fontWeight: "500",
        padding: "3px 12px",
        borderRadius: "999px",       // pill shape
        marginBottom: "12px",
    },

    completedMessage: {
        display: "inline-block",
        backgroundColor: "#dcfce7",  // soft green background
        color: "#166534",            // dark green text
        fontSize: "12px",
        fontWeight: "600",
        padding: "3px 12px",
        borderRadius: "999px",       // pill shape
        marginBottom: "12px",
    },

    highPriorityWarning: {
        backgroundColor: "#fff1f2",   // very light red background
        color: "#be123c",             // deep red text
        fontSize: "13px",
        fontWeight: "600",
        padding: "10px 14px",
        borderRadius: "10px",         // rounded rectangle — not a pill, more like an alert
        marginBottom: "12px",
        border: "1px solid #fecdd3",  // soft pink border to frame the alert
    },

    bottomRow: {
        display: "flex",                       // put dropdown and button side by side
        alignItems: "center",                  // vertically center them
        gap: "12px",                           // space between dropdown and button
        marginTop: "18px",                     // breathing room above the action area
        paddingTop: "16px",                    // inner top padding
        borderTop: "1px solid #f3f4f6",        // thin line to separate actions from content
    },

    select: {
        appearance: "none" as const,                          // remove default browser styling
        backgroundColor: "#f9fafb",                           // off-white background
        border: "1px solid #e5e7eb",                          // soft grey border
        borderRadius: "10px",                                 // rounded corners
        padding: "9px 36px 9px 14px",                         // extra right padding for the custom arrow
        fontSize: "13px",
        color: "#374151",                                     // dark grey text
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        cursor: "pointer",
        outline: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", // custom dropdown arrow
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",              // position arrow on the right
        transition: "border-color 0.15s ease",                // smooth border color on focus
    },

    deleteButton: {
        backgroundColor: "#ef4444",                                    // bold red
        color: "#ffffff",                                              // white text
        border: "none",
        borderRadius: "10px",                                          // rounded corners
        padding: "9px 20px",                                           // comfortable click target
        fontSize: "13px",
        fontWeight: "600",                                             // bold text
        cursor: "pointer",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        boxShadow: "0 1px 4px rgba(239, 68, 68, 0.35)",               // red-tinted shadow under button
        transition: "background-color 0.15s ease, box-shadow 0.15s ease", // smooth hover feel
        letterSpacing: "0.2px",
    },

};

export default TaskItem;
