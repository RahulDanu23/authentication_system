// Password strength indicator
function updatePasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    let strength = 0;
    
    // Check password length
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Check for numbers
    if (/[0-9]/.test(password)) strength += 1;
    
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Update strength bar width
    const width = (strength / 5) * 100;
    strengthBar.style.width = width + '%';
    
    // Update strength text and color
    if (strength <= 2) {
        strengthBar.style.backgroundColor = '#ff4444';
        strengthText.textContent = 'Password strength: Weak';
    } else if (strength <= 4) {
        strengthBar.style.backgroundColor = '#ffbb33';
        strengthText.textContent = 'Password strength: Medium';
    } else {
        strengthBar.style.backgroundColor = '#00C851';
        strengthText.textContent = 'Password strength: Strong';
    }
}

// Toggle password visibility
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Validate password requirements
function validatePassword(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };
    
    const requirementItems = document.querySelectorAll('.password-requirements li');
    requirementItems.forEach(item => {
        const requirement = item.dataset.requirement;
        const icon = item.querySelector('i');
        
        if (requirements[requirement]) {
            icon.className = 'fas fa-check';
            icon.style.color = '#28a745';
        } else {
            icon.className = 'fas fa-times';
            icon.style.color = '#dc3545';
        }
    });
    
    return Object.values(requirements).every(Boolean);
}

// Handle form submission
function handlePasswordChange(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate new password
    if (!validatePassword(newPassword)) {
        alert('Please ensure your password meets all requirements.');
        return;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match.');
        return;
    }
    
    // Here you would typically make an API call to update the password
    // For now, we'll just show a success message
    alert('Password updated successfully!');
    window.location.href = 'profile.html';
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    const newPasswordInput = document.getElementById('newPassword');
    const toggleButtons = document.querySelectorAll('.toggle-password');
    const changePasswordForm = document.querySelector('.change-password-form');
    
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
            validatePassword(this.value);
        });
    }
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inputId = this.previousElementSibling.id;
            togglePasswordVisibility(inputId);
        });
    });
    
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', handlePasswordChange);
    }
}); 