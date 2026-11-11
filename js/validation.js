function validateForm() {
    let isValid = true;

    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        const inputElement = document.getElementById(elementId.replace('Error', '')); // Get the input element
        errorElement.textContent = message;
        errorElement.classList.add('visible');
        inputElement.classList.add('error');
        isValid = false;
    }

    
    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        const inputElement = document.getElementById(elementId.replace('Error', ''));
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
        inputElement.classList.remove('error');
    }

    
    const nameInput = document.getElementById('name');
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        showError('nameError', 'Full Name is required.');
    } else if (nameValue.split(' ').filter(word => word !== '').length < 2) {
        showError('nameError', 'Full Name must contain at least two words.');
    } else {
        clearError('nameError');
    }

    
    const genderSelect = document.getElementById('gender');
    const genderValue = genderSelect.value;
    if (genderValue === '') {
        showError('genderError', 'Please select your gender.');
    } else {
        clearError('genderError');
    }

    
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        showError('emailError', 'Email Address is required.');
    } else if (!emailValue.includes('@')) {
        showError('emailError', 'Email Address must contain an "@" symbol.');
    } else if (!emailValue.includes('.')) {
        showError('emailError', 'Email Address must contain a "." symbol.');
    } else if (emailValue.indexOf('@') === 0 || emailValue.indexOf('.') === emailValue.length - 1) { // Basic position check
        showError('emailError', 'Invalid email format.');
    } else if (emailValue.indexOf('@') > emailValue.lastIndexOf('.')) { 
        showError('emailError', 'Invalid email format. Dot must be after @.');
    }
     else {
        clearError('emailError');
    }

    
    const passwordInput = document.getElementById('password');
    const passwordValue = passwordInput.value;
    if (passwordValue === '') {
        showError('passwordError', 'Password is required.');
    } else if (passwordValue.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters long.');
    } else {
        clearError('passwordError');
    }

    
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordValue = confirmPasswordInput.value;
    if (confirmPasswordValue === '') {
        showError('confirmPasswordError', 'Please confirm your password.');
    } else if (confirmPasswordValue !== passwordValue) {
        showError('confirmPasswordError', 'Passwords do not match.');
    } else {
        clearError('confirmPasswordError');
    }

    
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        showError('termsError', 'You must agree to the Terms and Conditions.');
    } else {
        clearError('termsError');
    }


    
    if (isValid) {
        alert('Registration successful! (This is a prototype alert)');
       
    }

    return isValid; 
}


document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    if (nameInput) nameInput.addEventListener('blur', () => validateForm()); 

    const genderSelect = document.getElementById('gender');
    if (genderSelect) genderSelect.addEventListener('blur', () => validateForm());

    const emailInput = document.getElementById('email');
    if (emailInput) emailInput.addEventListener('blur', () => validateForm());

    const passwordInput = document.getElementById('password');
    if (passwordInput) passwordInput.addEventListener('blur', () => validateForm());
    if (passwordInput) passwordInput.addEventListener('input', () => { 
        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (confirmPasswordInput.value !== passwordInput.value && confirmPasswordInput.value !== '') {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
            document.getElementById('confirmPasswordError').classList.add('visible');
            confirmPasswordInput.classList.add('error');
        } else {
            document.getElementById('confirmPasswordError').textContent = '';
            document.getElementById('confirmPasswordError').classList.remove('visible');
            confirmPasswordInput.classList.remove('error');
        }
    });


    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) confirmPasswordInput.addEventListener('blur', () => validateForm());
    if (confirmPasswordInput) confirmPasswordInput.addEventListener('input', () => { // Check password match on input
        const passwordInput = document.getElementById('password');
        if (confirmPasswordInput.value !== passwordInput.value && confirmPasswordInput.value !== '') {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
            document.getElementById('confirmPasswordError').classList.add('visible');
            confirmPasswordInput.classList.add('error');
        } else {
            document.getElementById('confirmPasswordError').textContent = '';
            document.getElementById('confirmPasswordError').classList.remove('visible');
            confirmPasswordInput.classList.remove('error');
        }
    });

    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) termsCheckbox.addEventListener('change', () => validateForm());
});