// Declare html2pdf globally
declare var html2pdf: any;

// Getting the form and output elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resumeoutput') as HTMLDivElement;

// Interface for Resume Data
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: string;
    skills: string;
    workExperience: string;
}

// Variable to store resume data
let resumeData: ResumeData;

// Form submission handler
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevents the form from reloading the page
    
    // Get the data from the form
    const formData = new FormData(form);

    // Populating resumeData object
    resumeData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        education: formData.get('education') as string,
        skills: formData.get('skills') as string,
        workExperience: formData.get('workexperience') as string,
    };

    // Generate the resume dynamically
    generateResume(resumeData);
});

// Function to generate resume
function generateResume(data: ResumeData) {
    const resumeHTML = `
        <div id="resume">
            <h2 contenteditable="true" id="res-name">${data.name}'s Resume</h2>
            <p><strong>Email:</strong> <span contenteditable="true" id="res-email">${data.email}</span></p>
            <p><strong>Phone:</strong> <span contenteditable="true" id="res-phone">${data.phone}</span></p>
            <h3>Education</h3>
            <p contenteditable="true" id="res-education">${data.education}</p>
            <h3>Skills</h3>
            <p contenteditable="true" id="res-skills">${data.skills}</p>
            <h3>Work Experience</h3>
            <p contenteditable="true" id="res-workexperience">${data.workExperience}</p>
        </div>
        <p><strong>Resume URL:</strong> <a href="https://yourdomain.com/${data.name.toLowerCase()}/resume" id="resume-link" target="_blank">https://yourdomain.com/${data.name.toLowerCase()}/resume</a></p>
        <button id="download-btn">Download PDF</button>
        <button id="share-btn">Copy Shareable Link</button>
    `;

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
    const downloadBtn = document.getElementById('download-btn') as HTMLButtonElement;
    downloadBtn.addEventListener('click', () => {
        const element = document.getElementById('resume'); // The resume element
        const options = {
            filename: `${resumeData.name}-resume.pdf`, // PDF file name based on the user's name
            html2canvas: {},
            jsPDF: { orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save(); // Using html2pdf to download the resume as PDF
    });
}

// Function to handle sharing the resume link
function handleShare() {
    const shareBtn = document.getElementById('share-btn') as HTMLButtonElement;
    const resumeLink = document.getElementById('resume-link') as HTMLAnchorElement;

    // Copying the resume link to clipboard
    shareBtn.addEventListener('click', () => {
        const link = resumeLink.href;
        navigator.clipboard.writeText(link).then(() => {
            alert('Resume link copied to clipboard: ' + link);
        }).catch(err => {
            console.error('Failed to copy the link:', err);
        });
    });
}
