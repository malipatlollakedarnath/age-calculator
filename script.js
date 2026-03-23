function calculateAge() {
    const birthDateInput = document.getElementById('birthDate').value;
    const resultDiv = document.getElementById('result');
    
    if (!birthDateInput) {
        resultDiv.className = 'result error';
        resultDiv.innerHTML = 'Please select a birth date';
        return;
    }
    
    const birthDate = new Date(birthDateInput);
    const today = new Date();
    
    if (birthDate > today) {
        resultDiv.className = 'result error';
        resultDiv.innerHTML = 'Birth date cannot be in the future';
        return;
    }
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const months = ((today.getMonth() - birthDate.getMonth() + 12) % 12);
    const days = today.getDate() - birthDate.getDate() + (today.getDate() < birthDate.getDate() ? -1 : 0);
    
    const birthDateFormatted = birthDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    resultDiv.className = 'result show';
    resultDiv.innerHTML = `
        <div class="age-display">${age} Years Old</div>
        <div class="age-details">
            <p><strong>Full Age:</strong> ${age} years, ${months} months, and ${Math.abs(days)} days</p>
            <p><strong>Born:</strong> ${birthDateFormatted}</p>
            <p><strong>Total Days:</strong> ${Math.floor((today - birthDate) / (1000 * 60 * 60 * 24))}</p>
        </div>
    `;
}

// Set max date to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('birthDate').max = today;
    
    // Allow Enter key to calculate
    document.getElementById('birthDate').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });
});