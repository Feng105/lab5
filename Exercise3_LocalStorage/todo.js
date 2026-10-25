"use strict";

const STORAGE_KEY = "todoTasks";

const taskInput = document.getElementById("newTask");
const addButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const status = document.getElementById("status");
const storageWarning = document.getElementById("storageWarning");

let tasks = [];

function storageAvailable() {
    return typeof (Storage) !== "undefined" && window.localStorage !== null;
}

function loadTasks() {
    if (!storageAvailable()) {
        return [];
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        return [];
    }

    try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch (error) {
        console.warn("Could not read the saved tasks:", error);
        return [];
    }
}

function saveTasks() {
    if (!storageAvailable()) {
        return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
    taskList.textContent = "";

    tasks.forEach(function (task, index) {
        const item = document.createElement("li");

        const text = document.createElement("span");
        text.textContent = task;
        item.appendChild(text);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("data-index", index);
        item.appendChild(removeButton);

        taskList.appendChild(item);
    });

    const count = tasks.length;
    status.textContent = count === 0
        ? "No tasks yet - add one above."
        : count + (count === 1 ? " task" : " tasks") + " saved in Local Storage.";
}

function addTask() {
    const task = taskInput.value.trim();

    if (task === "") {
        taskInput.focus();
        return;
    }

    tasks.push(task);
    saveTasks();
    render();

    taskInput.value = "";
    taskInput.focus();
}

function removeTask(index) {
    if (index < 0 || index >= tasks.length) {
        return;
    }

    tasks.splice(index, 1);
    saveTasks();
    render();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

taskList.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (button) {
        removeTask(Number(button.getAttribute("data-index")));
    }
});

if (!storageAvailable()) {
    storageWarning.textContent =
        "Sorry, your browser does not support web storage - tasks will not be kept.";
}

tasks = loadTasks();
render();
