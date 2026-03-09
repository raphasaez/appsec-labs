let currentUserId = null;
let startTime = null;
let timerInterval = null;
let socket = null;

function initSocket() {
    socket = io("/", { withCredentials: true });

    socket.on("connect", () => {
        console.log("Connected to WebSocket server");
    });

    socket.on("user_deleted", (data) => {
        console.log("User deleted event received:", data);
        if (data.user_id === 2 || data.user_id === 3) {
            stopLabTimer();
            alert(`Congratulations! User ${data.user_id} was deleted. Time: ${Math.floor((Date.now() - startTime)/1000)}s`);
        }
        loadUsers();
    });
}

function startLabTimer() {
    startTime = Date.now();
    document.getElementById("timer").classList.remove("hidden");
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById("timer").textContent = `Time: ${elapsed}s`;
    }, 1000);
}

function stopLabTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}


async function login() {
    const username = document.getElementById("username").value;
    const loginMsg = document.getElementById("login-msg");
    loginMsg.textContent = "";

    try {
        const res = await fetch("/api/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username}),
            credentials: "include"
        });
        const data = await res.json();

        if(res.ok) {
            currentUserId = data.user_id;
            document.getElementById("current-user").textContent = username;
            document.getElementById("login-section").classList.add("hidden");
            document.getElementById("user-section").classList.remove("hidden");
            startLabTimer();
            initSocket();
            loadUsers();
        } else {
            loginMsg.textContent = data.message;
        }
    } catch(err) {
        loginMsg.textContent = "Error connecting to API";
    }
}


async function loadUsers() {
    try {
        const res = await fetch("/api/users", {  
            method: "GET",
            credentials: "include"  
        });
        const users = await res.json(); 

        const usersList = document.getElementById("users-list");
        usersList.innerHTML = "";

        users.forEach(u => {
            const li = document.createElement("li");
            li.textContent = `${u.id}: ${u.name}`;
            usersList.appendChild(li);
        });

    } catch(err) {
        console.error(err);
    }
}

async function editUser() {
    const newName = document.getElementById("new-name").value;
    const editMsg = document.getElementById("edit-msg");
    editMsg.textContent = "";

    if(!currentUserId) return;

    try {
        const res = await fetch(`/api/user/${currentUserId}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: newName}),
            credentials: "include"
        });
        const data = await res.json();

        if(res.ok) {
            editMsg.textContent = "Name updated successfully!";
            loadUsers();
        } else {
            editMsg.textContent = data.message;
        }
    } catch(err) {
        editMsg.textContent = "Error connecting to API";
    }
}


function logout() {
    stopLabTimer();
    currentUserId = null;
    document.getElementById("user-section").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("username").value = "";
}


document.getElementById("login-btn").addEventListener("click", login);
document.getElementById("edit-btn").addEventListener("click", editUser);
document.getElementById("logout-btn").addEventListener("click", logout);
