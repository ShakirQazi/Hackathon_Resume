"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jspdf_1 = require("jspdf"); // Ensure jsPDF is installed (npm install jspdf)
// Function to handle image preview
function previewImage(event) {
    var input = event.target;
    var file = input.files ? input.files[0] : null;
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var imgElement = document.getElementById('profilePicture');
            if (imgElement) {
                imgElement.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                imgElement.style.opacity = '1'; // Ensure the image is visible
            }
        };
        reader.readAsDataURL(file);
    }
}
// Function to preview resume
function previewResume() {
    var name = document.getElementById('name').value;
    var contact = document.getElementById('contact').value;
    var skills = document.getElementById('skills').value;
    var experience = document.getElementById('experience').value;
    var previewContent = "\n        Name: ".concat(name, "\n        Contact: ").concat(contact, "\n        Skills: ").concat(skills, "\n        Experience: ").concat(experience, "\n    ");
    // Show preview in an alert
    alert(previewContent);
}
// Function to generate and download PDF
function downloadPDF() {
    var doc = new jspdf_1.default();
    var name = document.getElementById('name').value;
    var contact = document.getElementById('contact').value;
    var skills = document.getElementById('skills').value;
    var experience = document.getElementById('experience').value;
    doc.text("Name: ".concat(name), 10, 10);
    doc.text("Contact: ".concat(contact), 10, 20);
    doc.text("Skills:", 10, 30);
    doc.text(skills, 10, 40);
    doc.text("Experience:", 10, 60);
    doc.text(experience, 10, 80);
    doc.save('resume.pdf');
}
// Function to handle form submission
function handleSubmit() {
    var name = document.getElementById('name').value;
    var contact = document.getElementById('contact').value;
    var skills = document.getElementById('skills').value;
    var experience = document.getElementById('experience').value;
    if (!name || !contact || !skills || !experience) {
        alert('Please fill in all fields before submitting.');
        return;
    }
    // Here you can handle form submission, e.g., sending data to a server
    alert('Form submitted successfully!');
}
// Mark fields as interacted on input
function markAsInteracted(event) {
    var input = event.target;
    input.classList.add('interacted');
}
// Apply fade-in effect to fields after the document is loaded
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d;
    var fields = document.querySelectorAll('.field');
    fields.forEach(function (field, index) {
        field.style.opacity = '1';
        field.style.transform = 'translateY(0)';
        field.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
        field.style.transitionDelay = "".concat(index * 0.2, "s");
    });
    // Event listeners for input fields
    document.querySelectorAll('input[type="text"], textarea').forEach(function (field) {
        field.addEventListener('input', markAsInteracted);
    });
    // Event listeners
    (_a = document.getElementById('imageUpload')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', previewImage);
    (_b = document.getElementById('previewButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', previewResume);
    (_c = document.getElementById('submitButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', handleSubmit);
    (_d = document.getElementById('downloadButton')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', downloadPDF);
});
