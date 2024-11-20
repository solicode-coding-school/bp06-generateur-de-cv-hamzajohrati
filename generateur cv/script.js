document.getElementById('cvForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    // Generate CV HTML
    const cvHTML = `
        <div class="cv-section">
            <h2>Personal Information</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
        </div>

        <div class="cv-section">
            <h2>Education</h2>
            <p>${education.replace(/\n/g, '<br>')}</p>
        </div>

        <div class="cv-section">
            <h2>Work Experience</h2>
            <p>${experience.replace(/\n/g, '<br>')}</p>
        </div>

        <div class="cv-section">
            <h2>Skills</h2>
            <p>${skills.replace(/\n/g, '<br>')}</p>
        </div>
    `;

    // Display the CV
    document.getElementById('cvPreview').innerHTML = cvHTML;
});
