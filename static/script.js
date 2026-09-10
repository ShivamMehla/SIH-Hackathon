// --- Database Simulation ---
const mockCompanies = [
    {
        name: "TechCorp Industries",
        role: "Software Development Intern",
        reqSkills: ["Python", "SQL", "React"],
        stipend: "$1,200/month"
    },
    {
        name: "DataMetrics Global",
        role: "Junior Data Analyst",
        reqSkills: ["Data Analysis", "Python", "SQL"],
        stipend: "$1,500/month"
    },
    {
        name: "CloudScale Systems",
        role: "Cloud Engineering Apprentice",
        reqSkills: ["AWS", "Communication", "Python"],
        stipend: "$1,400/month"
    }
];

// User Global Data Store
let userData = {};

// --- Step 1: Login Handler ---
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    document.getElementById('userStatus').innerText = `Logged in: ${email} (${role})`;
    
    // Transition Frame
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('profile-setup-section').classList.remove('hidden');
});

// --- Step 2: Save Profile & Skill Mapping ---
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    userData.fullName = document.getElementById('full-name').value;
    userData.qualification = document.getElementById('qualification').value;
    userData.cgpa = document.getElementById('cgpa').value;
    userData.skills = document.getElementById('skills').value.split(',').map(s => s.trim());
    userData.achievements = document.getElementById('achievements').value;

    // Transition Frame
    document.getElementById('profile-setup-section').classList.add('hidden');
    document.getElementById('company-matches-section').classList.remove('hidden');

    renderMatchedCompanies();
});

// Render Companies based on Skills
function renderMatchedCompanies() {
    const container = document.getElementById('company-list');
    container.innerHTML = '';

    mockCompanies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'company-card';
        card.innerHTML = `
            <h3>${company.name}</h3>
            <div class="role-title">${company.role}</div>
            <div class="requirements"><strong>Required Skills:</strong> ${company.reqSkills.join(', ')}</div>
            <div class="requirements"><strong>Stipend/Package:</strong> ${company.stipend}</div>
        `;
        container.appendChild(card);
    });
}

// Proceed to Resume Step
document.getElementById('proceedToResumeBtn').addEventListener('click', function() {
    document.getElementById('company-matches-section').classList.add('hidden');
    document.getElementById('resume-builder-section').classList.remove('hidden');
    
    // Populate base fields in live preview
    document.getElementById('res-name').innerText = userData.fullName.toUpperCase();
    document.getElementById('res-qual').innerText = `${userData.qualification} | CGPA: ${userData.cgpa}`;
    document.getElementById('res-achievements').innerText = userData.achievements;
    
    const skillContainer = document.getElementById('res-skills');
    skillContainer.innerHTML = '';
    userData.skills.forEach(skill => {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.innerText = skill;
        skillContainer.appendChild(badge);
    });
});

// --- Step 3: Complete Resume & Generate ---
document.getElementById('resumeDetailsForm').addEventListener('submit', function(e) {
    e.preventDefault();

    document.getElementById('res-phone').innerText = document.getElementById('phone').value;
    document.getElementById('res-link').innerText = document.getElementById('linkedin').value;
    document.getElementById('res-experience').innerText = document.getElementById('experience').value;
    document.getElementById('res-projects').innerText = document.getElementById('projects').value;

    // Show Auto-Apply Action Button
    document.getElementById('autoApplyBtn').classList.remove('hidden');
    alert("Advanced Resume Built Successfully!");
});

// --- Step 4: Auto-Apply Automation System ---
document.getElementById('autoApplyBtn').addEventListener('click', function() {
    document.getElementById('resume-builder-section').classList.add('hidden');
    document.getElementById('auto-apply-section').classList.remove('hidden');

    runAutoApplyEngine();
});

function runAutoApplyEngine() {
    const progressBar = document.getElementById('progress-bar');
    const log = document.getElementById('application-status-log');
    
    let currentStep = 0;
    const totalCompanies = mockCompanies.length;

    log.innerHTML = `<p>[System]: Initiating automated application process for candidate ${userData.fullName}...</p>`;

    const interval = setInterval(() => {
        if (currentStep < totalCompanies) {
            const company = mockCompanies[currentStep];
            log.innerHTML += `<p>[Applied]: Successfully submitted resume to <strong>${company.name}</strong> for ${company.role}.</p>`;
            log.scrollTop = log.scrollHeight;

            currentStep++;
            const progressPercentage = (currentStep / totalCompanies) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        } else {
            clearInterval(interval);
            log.innerHTML += `<p>[Complete]: Dispatch engine finished process successfully.</p>`;
            document.getElementById('final-success-message').classList.remove('hidden');
        }
    }, 1500); // 1.5 seconds delay per application simulation
}