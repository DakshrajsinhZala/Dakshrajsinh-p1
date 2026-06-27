const passwordInput = document.getElementById('passwordInput');
const strengthBar = document.getElementById('strengthBar');
const feedbackText = document.getElementById('feedbackText');
const toggleBtn = document.getElementById('toggleBtn');

const requirements = {
    length: document.getElementById('length'),
    upper: document.getElementById('upper'),
    number: document.getElementById('number'),
    special: document.getElementById('special'),
};

// Toggle Visibility
toggleBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    toggleBtn.textContent = type === 'password' ? 'Show' : 'Hide';
});

// Logic
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;

    // Validation checks
    const checks = {
        length: val.length >= 8,
        upper: /[A-Z]/.test(val) && /[a-z]/.test(val),
        number: /\d/.test(val),
        special: /[^A-Za-z0-9]/.test(val),
    };

    // Update UI requirements
    Object.keys(checks).forEach(key => {
        if (checks[key]) {
            requirements[key].classList.replace('invalid', 'valid');
            score++;
        } else {
            requirements[key].classList.replace('valid', 'invalid');
        }
    });

    // Update Strength Bar
    updateMeter(score, val.length);
});

function updateMeter(score, length) {
    let width = (score / 4) * 100;
    let color = '';
    let text = '';

    if (length === 0) {
        width = 0;
        text = 'Start typing...';
    } else if (score <= 1) {
        color = '#ef4444'; // Red
        text = 'Weak';
    } else if (score <= 3) {
        color = '#f59e0b'; // Orange
        text = 'Moderate';
    } else {
        color = '#10b981'; // Green
        text = 'Strong Capital!';
    }

    strengthBar.style.width = `${width}%`;
    strengthBar.style.backgroundColor = color;
    feedbackText.innerText = text;
    feedbackText.style.color = color;
}
