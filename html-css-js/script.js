let timerInterval = null;
let currentTimerVal = 10;
let mouseTrailActive = false;

document.addEventListener("DOMContentLoaded", function () {
    initDynamicMenu();
    updateRecordCount();
});

function handleFormSubmit(event) {
    event.preventDefault();

    const rollNo = document.getElementById("rollNo").value.trim();
    const fullName = document.getElementById("fullName").value.trim();
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = parseInt(document.getElementById("age").value, 10);
    const dob = document.getElementById("dob").value;
    const regTime = document.getElementById("regTime").value;
    const gradMonth = document.getElementById("gradMonth").value;
    const themeColor = document.getElementById("themeColor").value;
    const skillRating = document.getElementById("skillRating").value;
    const department = document.getElementById("department").value;
    const courseTrack = document.getElementById("courseTrack").value.trim();
    const address = document.getElementById("address").value.trim();

    const selectedGender = document.querySelector('input[name="gender"]:checked');
    const gender = selectedGender ? selectedGender.value : "";

    const selectedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(function (cb) {
        return cb.value;
    });

    const alertBox = document.getElementById("formAlert");
    alertBox.className = "alert-box";
    alertBox.textContent = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (rollNo.length < 3) {
        showFormAlert("Roll Number must have at least 3 characters.", "error");
        return;
    }

    if (fullName.length < 2) {
        showFormAlert("Full Name must have at least 2 characters.", "error");
        return;
    }

    if (password.length < 6) {
        showFormAlert("Password must have at least 6 characters.", "error");
        return;
    }

    if (!emailRegex.test(email)) {
        showFormAlert("Please enter a valid email address.", "error");
        return;
    }

    if (!phoneRegex.test(phone)) {
        showFormAlert("Phone number must contain exactly 10 digits.", "error");
        return;
    }

    if (isNaN(age) || age < 1 || age > 100) {
        showFormAlert("Age must be between 1 and 100.", "error");
        return;
    }

    if (!department) {
        showFormAlert("Please select a department.", "error");
        return;
    }

    const tbody = document.getElementById("recordsBody");
    const tr = document.createElement("tr");

    tr.innerHTML = "<td>" + escapeHtml(rollNo) + "</td>" +
                   "<td>" + escapeHtml(fullName) + "</td>" +
                   "<td>" + escapeHtml(email) + "</td>" +
                   "<td>" + escapeHtml(department) + "</td>" +
                   "<td>" + escapeHtml(gender) + "</td>" +
                   "<td>" + escapeHtml(selectedSkills.join(", ") || "None") + "</td>" +
                   "<td>" + escapeHtml(skillRating) + "%</td>" +
                   "<td>" +
                       "<button type='button' class='btn btn-danger' onclick='deleteRecord(this)'>Delete</button> " +
                       "<button type='button' class='btn btn-sm' onclick='moveRecordUp(this)'>Up</button>" +
                   "</td>";

    tbody.appendChild(tr);
    updateRecordCount();

    showFormAlert("Student registered successfully!", "success");
    document.getElementById("registrationForm").reset();
    document.getElementById("ratingDisplay").textContent = "70";
}

function showFormAlert(message, type) {
    const alertBox = document.getElementById("formAlert");
    alertBox.textContent = message;
    alertBox.className = "alert-box " + type;
}

function deleteRecord(button) {
    const row = button.closest("tr");
    if (row) {
        row.remove();
        updateRecordCount();
    }
}

function moveRecordUp(button) {
    const row = button.closest("tr");
    if (row && row.previousElementSibling) {
        row.parentNode.insertBefore(row, row.previousElementSibling);
    }
}

function updateRecordCount() {
    const count = document.querySelectorAll("#recordsBody tr").length;
    const counterEl = document.getElementById("totalRecordCount");
    if (counterEl) {
        counterEl.textContent = count;
    }
}

function updateRangeDisplay(val) {
    const display = document.getElementById("ratingDisplay");
    if (display) {
        display.textContent = val;
    }
}

function turnBulbOn() {
    const img = document.getElementById("bulbImg");
    const status = document.getElementById("bulbStatus");
    img.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='%23f1c40f'><path d='M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-3 18h6v1c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-1z'/></svg>";
    status.textContent = "Bulb status: ON";
}

function turnBulbOff() {
    const img = document.getElementById("bulbImg");
    const status = document.getElementById("bulbStatus");
    img.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='%237f8c8d'><path d='M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-3 18h6v1c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-1z'/></svg>";
    status.textContent = "Hover over the bulb to turn it ON";
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    const display = document.getElementById("timerDisplay");
    timerInterval = setInterval(function () {
        display.textContent = currentTimerVal;
        currentTimerVal--;
        if (currentTimerVal < 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            display.textContent = "Time Up!";
        }
    }, 1000);
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    currentTimerVal = 10;
    document.getElementById("timerDisplay").textContent = "10";
}

function addListItem() {
    const list = document.getElementById("orderList");
    const count = list.children.length + 1;
    const li = document.createElement("li");
    const textNode = document.createTextNode("Dynamic Item " + count + " (Click to Swap)");
    li.appendChild(textNode);
    li.onclick = function () {
        swapWithNext(this);
    };
    list.appendChild(li);
}

function swapWithNext(elt) {
    const nextItem = elt.nextElementSibling;
    if (nextItem) {
        elt.parentNode.insertBefore(nextItem, elt);
    } else if (elt.previousElementSibling) {
        elt.parentNode.insertBefore(elt, elt.parentNode.firstElementChild);
    }
}

function toggleCollapse(panelId, btn) {
    const panel = document.getElementById(panelId);
    if (panel.style.display === "none") {
        panel.style.display = "block";
        btn.textContent = "Click to Collapse";
    } else {
        panel.style.display = "none";
        btn.textContent = "Click to Expand";
    }
}

function initDynamicMenu() {
    const menuItems = ["Home", "About Us", "Department", "Academics", "Contact"];
    const ul = document.getElementById("dynamicMenuList");
    if (!ul) return;
    ul.innerHTML = "";

    menuItems.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        li.addEventListener("click", function (event) {
            alert("Clicked Menu Item: " + this.textContent + "\nEvent Type: " + event.type + "\nTarget Node: " + event.target.nodeName);
        });
        ul.appendChild(li);
    });
}

function toggleMouseTrail(btn) {
    mouseTrailActive = !mouseTrailActive;
    const status = document.getElementById("trailStatus");
    if (mouseTrailActive) {
        window.addEventListener("mousemove", handleMouseTrail);
        btn.textContent = "Disable Mouse Trail";
        status.textContent = "Move your mouse around the window to see the trail effect.";
    } else {
        window.removeEventListener("mousemove", handleMouseTrail);
        btn.textContent = "Enable Mouse Trail";
        status.textContent = "Trail is currently disabled.";
    }
}

function handleMouseTrail(e) {
    const particle = document.createElement("div");
    particle.className = "mouse-trail-particle";
    particle.style.left = e.pageX + "px";
    particle.style.top = e.pageY + "px";
    document.body.appendChild(particle);

    setTimeout(function () {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 800);
}

function runStudentObjectDemo() {
    const student = {
        rollNo: "21CS101",
        name: "Alex Johnson",
        department: "Computer Science",
        year: 3,
        address: {
            street: "123 Tech Boulevard",
            city: "Metropolis",
            state: "California",
            pincode: "90210"
        },
        marks: [88, 92, 79, 95, 85],
        skills: ["HTML", "CSS", "JavaScript"],
        attendancePercentage: 92.5,

        displayDetails: function () {
            return "Roll No: " + this.rollNo +
                   "\nName: " + this.name +
                   "\nDepartment: " + this.department +
                   "\nYear: " + this.year +
                   "\nCity: " + this.address.city +
                   "\nAttendance: " + this.attendancePercentage + "%";
        },

        calculateTotalAndAverage: function () {
            let total = 0;
            for (let i = 0; i < this.marks.length; i++) {
                total += this.marks[i];
            }
            const avg = total / this.marks.length;
            return { total: total, average: avg };
        },

        determineGrade: function (avg) {
            if (avg >= 90) return "A";
            if (avg >= 80) return "B";
            if (avg >= 70) return "C";
            if (avg >= 60) return "D";
            return "F";
        },

        addSkill: function (newSkill) {
            this.skills.push(newSkill);
        },

        updateAddress: function (street, city, state, pincode) {
            this.address.street = street;
            this.address.city = city;
            this.address.state = state;
            this.address.pincode = pincode;
        }
    };

    let log = "=== INITIAL STUDENT DETAILS ===\n";
    log += student.displayDetails() + "\n\n";

    const stats = student.calculateTotalAndAverage();
    const grade = student.determineGrade(stats.average);
    log += "=== ACADEMIC PERFORMANCE ===\n";
    log += "Total Marks: " + stats.total + " / 500\n";
    log += "Average Marks: " + stats.average.toFixed(2) + "\n";
    log += "Grade: " + grade + "\n\n";

    student.addSkill("MongoDB");
    student.updateAddress("456 Innovation Parkway", "Silicon Valley", "California", "94016");
    log += "=== UPDATED SKILLS & ADDRESS ===\n";
    log += "Skills: " + student.skills.join(", ") + "\n";
    log += "New Address: " + student.address.street + ", " + student.address.city + "\n\n";

    student.email = "alex.johnson@techuniv.edu";
    log += "=== DYNAMIC PROPERTY ADDITION ===\n";
    log += "Added student.email: " + student.email + "\n\n";

    delete student.year;
    log += "=== DYNAMIC PROPERTY DELETION ===\n";
    log += "Deleted student.year: " + ("year" in student ? "Still exists" : "Successfully deleted") + "\n\n";

    log += "=== CHECK PROPERTY EXISTENCE ===\n";
    log += "'email' in student: " + ("email" in student) + "\n";
    log += "'year' in student: " + ("year" in student) + "\n";
    log += "hasOwnProperty('department'): " + student.hasOwnProperty("department") + "\n\n";

    log += "=== FOR...IN LOOP (ALL KEYS & VALUES) ===\n";
    for (let key in student) {
        if (typeof student[key] !== "function") {
            log += key + " : " + (typeof student[key] === "object" ? JSON.stringify(student[key]) : student[key]) + "\n";
        }
    }
    log += "\n";

    log += "=== OBJECT.KEYS() ===\n";
    log += JSON.stringify(Object.keys(student)) + "\n\n";

    log += "=== OBJECT.VALUES() (NON-FUNCTIONS) ===\n";
    const values = Object.values(student).filter(function (val) {
        return typeof val !== "function";
    });
    log += JSON.stringify(values) + "\n\n";

    const jsonString = JSON.stringify(student, null, 2);
    log += "=== CONVERT OBJECT TO JSON STRING (JSON.stringify) ===\n";
    log += jsonString + "\n\n";

    const parsedObj = JSON.parse(jsonString);
    log += "=== CONVERT JSON BACK TO JAVASCRIPT OBJECT (JSON.parse) ===\n";
    log += "Parsed Object Name: " + parsedObj.name + "\n";
    log += "Parsed Object Email: " + parsedObj.email + "\n";

    document.getElementById("objectOutput").textContent = log;
}

function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
