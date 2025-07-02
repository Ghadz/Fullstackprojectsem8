// About page JavaScript - Contact and Feedback
document.addEventListener('DOMContentLoaded', function() {

    // Feedback form handling
    const feedbackForm = document.getElementById('feedback-form');
    const latestFeedbackContainer = document.getElementById('latest-feedback');

    // Load existing feedback from localStorage
    function loadFeedback() {
        const feedback = JSON.parse(localStorage.getItem('eventHorizonFeedback') || '[]');
        displayFeedback(feedback.slice(-3)); // Show only latest 3
    }

    // Display feedback in the container
    function displayFeedback(feedbackArray) {
        if (feedbackArray.length === 0) {
            latestFeedbackContainer.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center;">No feedback yet. Be the first to share your thoughts!</p>';
            return;
        }

        latestFeedbackContainer.innerHTML = feedbackArray.map(feedback => `
            <div class="feedback-item">
                <div class="feedback-header">
                    <span class="feedback-name">${feedback.name}</span>
                    <span class="feedback-date">${new Date(feedback.date).toLocaleDateString()}</span>
                </div>
                <div class="feedback-message">${feedback.message}</div>
            </div>
        `).join('');
    }

    // Form validation - prevent submission until all fields are filled
    const nameInput = document.getElementById('feedback-name');
    const emailInput = document.getElementById('feedback-email');
    const messageInput = document.getElementById('feedback-message');
    const submitButton = feedbackForm.querySelector('button[type="submit"]');
    
    // Function to check if all fields are filled
    function checkFormValidity() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        const isValid = name && email && message;
        submitButton.disabled = !isValid;
        
        if (isValid) {
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
        } else {
            submitButton.style.opacity = '0.6';
            submitButton.style.cursor = 'not-allowed';
        }
    }
    
    // Add event listeners for real-time validation
    nameInput.addEventListener('input', checkFormValidity);
    emailInput.addEventListener('input', checkFormValidity);
    messageInput.addEventListener('input', checkFormValidity);
    
    // Initial check
    checkFormValidity();

    // Handle feedback form submission
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Create feedback object
        const feedback = {
            name: name,
            email: email,
            message: message,
            date: new Date().toISOString()
        };

        // Save to localStorage
        const existingFeedback = JSON.parse(localStorage.getItem('eventHorizonFeedback') || '[]');
        existingFeedback.push(feedback);
        localStorage.setItem('eventHorizonFeedback', JSON.stringify(existingFeedback));

        // Send feedback to email (demo - in real app this would use a backend)
        const emailBody = `
            New Feedback from Event Horizon Website
            
            Name: ${name}
            Email: ${email}
            Message: ${message}
            Date: ${new Date().toLocaleString()}
        `;

        // Create mailto link (demo)
        const mailtoLink = `mailto:eventhorizonweb777@gmail.com?subject=New Feedback from ${encodeURIComponent(name)}&body=${encodeURIComponent(emailBody)}`;
        
        // Show success message
        alert('Thank you for your feedback! In a real application, this would be sent to our email automatically.');
        
        // Reset form
        feedbackForm.reset();
        
        // Reload feedback display
        loadFeedback();
    });

    // Load feedback on page load
    loadFeedback();

    // Add some sample feedback for demo purposes
    function addSampleFeedback() {
        const existingFeedback = JSON.parse(localStorage.getItem('eventHorizonFeedback') || '[]');
        
        if (existingFeedback.length === 0) {
            const sampleFeedback = [
                {
                    name: "Sarah Johnson",
                    email: "sarah.j@email.com",
                    message: "Amazing space exploration content! The 3D Earth model is incredible. Keep up the great work!",
                    date: new Date(Date.now() - 86400000).toISOString() // 1 day ago
                },
                {
                    name: "Mike Chen",
                    email: "mike.chen@email.com",
                    message: "The black hole section is fascinating. I learned so much about Sagittarius A*. Great educational resource!",
                    date: new Date(Date.now() - 172800000).toISOString() // 2 days ago
                },
                {
                    name: "Emily Rodriguez",
                    email: "emily.r@email.com",
                    message: "Love the astronaut information and the interactive elements. Perfect for students interested in space!",
                    date: new Date(Date.now() - 259200000).toISOString() // 3 days ago
                }
            ];
            
            localStorage.setItem('eventHorizonFeedback', JSON.stringify(sampleFeedback));
            loadFeedback();
        }
    }

    // Add sample feedback if none exists
    addSampleFeedback();

    // Add smooth animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.contact-item, .feedback-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add typing effect for title
    const contactTitle = document.querySelector('.contact-title');
    if (contactTitle) {
        const text = contactTitle.textContent;
        contactTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                contactTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
}); 