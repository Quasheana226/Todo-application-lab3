
// THe main Component
//Use State is store and update values and react rerender the screen

import React, { useState } from "react";

// Import Types from type folder
import type { Task, TaskListProps, TaskStatus } from "../../types";


//Import two child components that will render inside  this one
//component composition building bigger things from small pieces
import TaskFilter from '../TaskFilter/TaskFilter.tsx';

import TaskItem from "../TaskItem/TaskItem.tsx";


// COMPONENT DEFINNITION
// TaskListProps tells typescript to this component initialTasks


const TaskList: React.FC<TaskListProps> = ({ initialTasks }) => {



    //STATE TASK
    //UseState Task creates a state vartiable that hold an array of task
    //task gives the current value the list of task
    //setTasks function call when the list update
    //initalTasks the starting value passed in from app.tsx

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    //STATE FILTERS

    const [filters, setFilters] = useState<{
        status?: TaskStatus;          // fix: was TasksStatus (wrong name)
        priority?: 'low' | 'medium' | "high";
    }>({});


    //HANDLER FILTER CHANGED
    // fix: this function was missing — TaskFilter calls it when the user picks a filter

    const handleFilterChange = (newFilters: { status?: TaskStatus; priority?: 'low' | 'medium' | 'high' }) => {
        setFilters(newFilters);
    };


    // When user picks a new status from a task dropdown Tasks item calls this function
    //TaskId which task changed
    //newStatus what the new status is

    //.map loops over each task and returns a new array

    const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
        // console.log('Task ID:', taskId, 'New Status:', newStatus);
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                //THis is what task the user changed
                //Spread operator copies all exisiting fields
                return { ...task, status: newStatus };
            } else {
                // fix: else and return task were outside the if block
                return task;
            }
        });
        setTasks(updatedTasks); // save the updated array state
    };


    //HANDLER TASK DELETED
    // When the user confirms deltetion tasksitem calls this function
    //.filter loops over every task and return conditon true

    const handDelete = (taskId: string) => {

        const remainingTasks = tasks.filter((task) => {
            if (task.id === taskId) {
                return false;
            } else {
                return true;
            }

        });

        // console.log('Task Deleted:', taskId, 'Tasks Remaining:', remainingTasks.length);
        setTasks(remainingTasks);

    };


    //FILTERING
    //.filter loops through all tasks and keeps only on that match currently active filters

    const filteredTasks = tasks.filter((task) => {
        //check filter status
        if (filters.status && task.status !== filters.status) {
            return false;
        }
        //check filter priority
        if (filters.priority && task.priority !== filters.priority) {
            return false;
        }
        return true;
    })


    // If/Else to calculate boolean flags

    // fix: noResults was never declared with let
    let noResults = false;

    if (filteredTasks.length === 0) {
        noResults = true; // no task matched the filters
    }

    // all done when every task is completed

    let allDone = false; // asume all done

    if (tasks.length > 0) {
        // only check if there is a task to check

        allDone = true;

        tasks.forEach((task) => {
            if (task.status !== 'completed') {
                allDone = false; // fix: body was empty so allDone was never set to false
            }
        });
    }




    //JSX RETURN
    // This is whats shown on screen

    return (

        <div style={styles.container}>
            <h1 style={styles.heading}> Task Manger </h1>


            {/* This taskfilter can call our function when user change filter  */}

            <TaskFilter onFilterChange={handleFilterChange} />

            {/* fix: tasks.at.length does not work — .at is a method not a property */}
            <p style={styles.summary}>Showing <strong>{filteredTasks.length}</strong> of {' '} <strong>{tasks.length}</strong> tasks</p>



            {/* Reaing if noResults is true and show this div but when noresults is false   */}

            {noResults && (
                // fix: StyleSheet.emptyState — StyleSheet is React Native. Changed to styles
                <div style={styles.emptyState}>
                    <p>No tasks matched your current filter</p>
                    <p>Try clearing and changing the filters above </p>
                </div>
            )}

            {!noResults && (
                <div>
                    {/* fix: map(tasks) => was wrong — parameter must be inside the parentheses */}
                    {filteredTasks.map((task) => (
                        <TaskItem
                            key={task.id}              // fix: was tasks.id — must use the parameter name task
                            task={task}                // fix: this required prop was missing entirely
                            onStatusChange={handleStatusChange}
                            onDelete={handDelete}
                        />
                    ))}
                </div>
            )}


            {allDone && (
                // fix: StyleSheet.allDoneBanner — changed to styles
                <div style={styles.allDoneBanner}>
                    All tasks are completed
                </div>
            )}
        </div>
    );



}

const styles: { [key: string]: React.CSSProperties } = {

    container: {
        maxWidth: "720px",                                             // cap width so cards do not stretch too wide
        margin: "0 auto",                                              // center the whole list on the page
        padding: "32px 24px",                                          // generous breathing room around everything
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",      // modern clean font stack
    },

    heading: {
        fontSize: "28px",          // large enough to feel like a real app title
        fontWeight: "700",         // bold
        color: "#111827",          // near-black
        margin: "0 0 24px 0",      // space below before the filter bar
        letterSpacing: "-0.5px",   // slightly tighter tracking for a modern headline feel
    },

    summary: {
        fontSize: "13px",      // small supporting text
        color: "#6b7280",      // muted grey
        margin: "0 0 16px 0",  // space below before the task cards
    },

    emptyState: {
        backgroundColor: "#f9fafb",               // soft off-white background
        border: "1px dashed #d1d5db",             // dashed border signals an empty placeholder
        borderRadius: "14px",                     // rounded corners
        padding: "40px 24px",                     // lots of inner space so it does not look cramped
        textAlign: "center" as const,             // center the message text
        color: "#9ca3af",                         // light grey text — subtle not alarming
        fontSize: "14px",
        lineHeight: "1.8",                        // loose line height between the two lines of text
    },

    allDoneBanner: {
        backgroundColor: "#dcfce7",               // soft green background
        color: "#166534",                         // dark green text
        borderRadius: "12px",                     // rounded corners
        padding: "16px 20px",                     // comfortable inner spacing
        textAlign: "center" as const,
        fontWeight: "600",                        // semi-bold so it stands out
        fontSize: "15px",
        marginTop: "24px",                        // space above so it does not crowd the last card
        border: "1px solid #bbf7d0",              // soft green border to frame the banner
    },

};

export default TaskList;
