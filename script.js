// Getting the form and output elements
var form = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resumeoutput');
// Variable to store resume data
var resumeData;
// Form submission handler
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the form from reloading the page
    // Get the data from the form
    var formData = new FormData(form);
    // Populating resumeData object
    resumeData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        education: formData.get('education'),
        skills: formData.get('skills'),
        workExperience: formData.get('workexperience'),
    };
    // Generate the resume dynamically
    generateResume(resumeData);
});
// Function to generate resume
function generateResume(data) {
    var resumeHTML = "\n        <div id=\"resume\">\n            <h2 contenteditable=\"true\" id=\"res-name\">".concat(data.name, "'s Resume</h2>\n            <p><strong>Email:</strong> <span contenteditable=\"true\" id=\"res-email\">").concat(data.email, "</span></p>\n            <p><strong>Phone:</strong> <span contenteditable=\"true\" id=\"res-phone\">").concat(data.phone, "</span></p>\n            <h3>Education</h3>\n            <p contenteditable=\"true\" id=\"res-education\">").concat(data.education, "</p>\n            <h3>Skills</h3>\n            <p contenteditable=\"true\" id=\"res-skills\">").concat(data.skills, "</p>\n            <h3>Work Experience</h3>\n            <p contenteditable=\"true\" id=\"res-workexperience\">").concat(data.workExperience, "</p>\n        </div>\n        <p><strong>Resume URL:</strong> <a href=\"https://yourdomain.com/").concat(data.name.toLowerCase(), "/resume\" id=\"resume-link\" target=\"_blank\">https://yourdomain.com/").concat(data.name.toLowerCase(), "/resume</a></p>\n        <button id=\"download-btn\">Download PDF</button>\n        <button id=\"share-btn\">Copy Shareable Link</button>\n    ");
    // Insert resume HTML into the resumeOutput div
    resumeOutput.innerHTML = resumeHTML;
    // Enable editing the resume
    attachEditListeners();
    // Handle the PDF download functionality
    handleDownload();
    // Handle shareable link functionality
    handleShare();
}
// Function to allow real-time editing of resume sections
function attachEditListeners() {
    // Add event listeners for the contenteditable elements, if required
    // Any additional code can be placed here to track changes
}
// Function to handle PDF download
function handleDownload() {
    var downloadBtn = document.getElementById('download-btn');
    downloadBtn.addEventListener('click', function () {
        var element = document.getElementById('resume'); // The resume element
        var options = {
            filename: "".concat(resumeData.name, "-resume.pdf"), // PDF file name based on the user's name
            html2canvas: {},
            jsPDF: { orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save(); // Using html2pdf to download the resume as PDF
    });
}
// Function to handle sharing the resume link
function handleShare() {
    var shareBtn = document.getElementById('share-btn');
    var resumeLink = document.getElementById('resume-link');
    // Copying the resume link to clipboard
    shareBtn.addEventListener('click', function () {
        var link = resumeLink.href;
        navigator.clipboard.writeText(link).then(function () {
            alert('Resume link copied to clipboard: ' + link);
        }).catch(function (err) {
            console.error('Failed to copy the link:', err);
        });
    });
}
