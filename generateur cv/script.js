// Get DOM elements
const cvForm = document.getElementById('cvForm');
const cvPreview = document.getElementById('cvPreview');
const downloadPdfBtn = document.getElementById('downloadPdf');
const photoInput = document.getElementById('photo');
const photoPreview = document.getElementById('photoPreview');

// Handle photo upload
photoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoPreview.src = e.target.result;
            photoPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Add new education field
function addEducation() {
    const container = document.getElementById('educationContainer');
    const educationDiv = document.createElement('div');
    educationDiv.className = 'education-entry';
    educationDiv.innerHTML = `
        <input type="text" placeholder="Degree" class="education-diploma">
        <input type="text" placeholder="School" class="education-school">
        <input type="text" placeholder="Year" class="education-year">
        <button type="button" onclick="this.parentElement.remove()">Remove</button>
    `;
    container.appendChild(educationDiv);
}

// Add new experience field
function addExperience() {
    const container = document.getElementById('experienceContainer');
    const experienceDiv = document.createElement('div');
    experienceDiv.className = 'experience-entry';
    experienceDiv.innerHTML = `
        <input type="text" placeholder="Position" class="experience-position">
        <input type="text" placeholder="Company" class="experience-company">
        <input type="text" placeholder="Period" class="experience-period">
        <textarea placeholder="Description" class="experience-description"></textarea>
        <button type="button" onclick="this.parentElement.remove()">Remove</button>
    `;
    container.appendChild(experienceDiv);
}

// Generate CV
cvForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get all form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    // Get education entries
    let educationHTML = '';
    document.querySelectorAll('.education-entry').forEach(entry => {
        const diploma = entry.querySelector('.education-diploma').value;
        const school = entry.querySelector('.education-school').value;
        const year = entry.querySelector('.education-year').value;
        
        educationHTML += `
            <div>
                <h3>${diploma}</h3>
                <p>${school} - ${year}</p>
            </div>
        `;
    });

    // Get experience entries
    let experienceHTML = '';
    document.querySelectorAll('.experience-entry').forEach(entry => {
        const position = entry.querySelector('.experience-position').value;
        const company = entry.querySelector('.experience-company').value;
        const period = entry.querySelector('.experience-period').value;
        const description = entry.querySelector('.experience-description').value;
        
        experienceHTML += `
            <div>
                <h3>${position}</h3>
                <p>${company} - ${period}</p>
                <p>${description}</p>
            </div>
        `;
    });

    // Generate CV HTML
    const cvHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial; padding: 20px; }
                .header { text-align: center; margin-bottom: 20px; }
                .photo { width: 150px; height: 150px; border-radius: 50%; margin: 0 auto; }
                .section { margin-bottom: 20px; }
                .section h2 { color: #007bff; border-bottom: 2px solid #007bff; }
            </style>
        </head>
        <body>
            <div class="header">
                ${photoPreview.src ? `<img src="${photoPreview.src}" class="photo" alt="Profile">` : ''}
                <h1>${fullName}</h1>
                <p>${email} | ${phone}</p>
                <p>${address}</p>
            </div>

            <div class="section">
                <h2>Education</h2>
                ${educationHTML}
            </div>

            <div class="section">
                <h2>Work Experience</h2>
                ${experienceHTML}
            </div>
        </body>
        </html>
    `;

    // Display CV in preview
    cvPreview.srcdoc = cvHTML;
});

// Download PDF
downloadPdfBtn.addEventListener('click', function() {
    const element = cvPreview.contentDocument.body;
    html2pdf()
        .from(element)
        .save('cv.pdf');
});