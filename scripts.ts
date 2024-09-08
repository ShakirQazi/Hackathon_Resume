import jsPDF from 'jspdf'; // Ensure jsPDF is installed (npm install jspdf)

// Function to handle image preview
function previewImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const imgElement = document.getElementById('profilePicture') as HTMLImageElement;
            if (imgElement) {
                imgElement.src = e.target?.result as string;
                imgElement.style.opacity = '1'; // Ensure the image is visible
            }
        };

        reader.readAsDataURL(file);
    }
}

// Function to preview resume
function previewResume(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    
    const previewContent = `
        Name: ${name}
        Contact: ${contact}
        Skills: ${skills}
        Experience: ${experience}
    `;

    // Show preview in an alert
    alert(previewContent);
}

// Function to generate and download PDF
function downloadPDF(): void {
    const doc = new jsPDF();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    
    doc.text(`Name: ${name}`, 10, 10);
    doc.text(`Contact: ${contact}`, 10, 20);
    doc.text(`Skills:`, 10, 30);
    doc.text(skills, 10, 40);
    doc.text(`Experience:`, 10, 60);
    doc.text(experience, 10, 80);

    doc.save('resume.pdf');
}

// Function to handle form submission
function handleSubmit(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;

    if (!name || !contact || !skills || !experience) {
        alert('Please fill in all fields before submitting.');
        return;
    }

    // Here you can handle form submission, e.g., sending data to a server
    alert('Form submitted successfully!');
}

// Mark fields as interacted on input
function markAsInteracted(event: Event): void {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    input.classList.add('interacted');
}

// Apply fade-in effect to fields after the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const fields = document.querySelectorAll('.field') as NodeListOf<HTMLElement>;
    fields.forEach((field, index) => {
        field.style.opacity = '1';
        field.style.transform = 'translateY(0)';
        field.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
        field.style.transitionDelay = `${index * 0.2}s`;
    });

    // Event listeners for input fields
    document.querySelectorAll('input[type="text"], textarea').forEach(field => {
        field.addEventListener('input', markAsInteracted);
    });

    // Event listeners
    document.getElementById('imageUpload')?.addEventListener('change', previewImage);
    document.getElementById('previewButton')?.addEventListener('click', previewResume);
    document.getElementById('submitButton')?.addEventListener('click', handleSubmit);
    document.getElementById('downloadButton')?.addEventListener('click', downloadPDF);
});
