// JavaScript for Robux Generator

// User data model
class UserData {
    constructor(username, robuxAmount = null) {
        this.username = username;
        this.robuxAmount = robuxAmount;
    }
}

// Global variables
let userData = null;
let currentScreen = 'username-screen';
let selectedRobuxAmount = null;

// DOM elements
const screens = {
    username: document.getElementById('username-screen'),
    robuxAmount: document.getElementById('robux-amount-screen'),
    processing: document.getElementById('processing-screen'),
    offerCompletion: document.getElementById('offer-completion-screen')
};

const elements = {
    usernameInput: document.getElementById('username'),
    usernameError: document.getElementById('username-error'),
    usernameNextBtn: document.getElementById('username-next-btn'),
    welcomeMessage: document.getElementById('welcome-message'),
    robuxOptions: document.querySelectorAll('.robux-option'),
    robuxContinueBtn: document.getElementById('robux-continue-btn'),
    progressPercentage: document.querySelector('.progress-percentage'),
    progressBar: document.querySelector('.progress-bar'),
    statusMessage: document.querySelector('.status-message'),
    completionUsername: document.getElementById('completion-username'),
    completionRobuxAmount: document.getElementById('completion-robux-amount'),
    completionRobuxAmountText: document.getElementById('completion-robux-amount-text'),
    completeOfferBtn: document.getElementById('complete-offer-btn')
};

// Messages used in the processing screen
const statusMessages = [
    'Connecting to server...',
    'Verifying username...',
    'User found: ',
    'Account verification: Successful',
    'Preparing Robux transfer...',
    'Sending Robux to your account...',
    'Almost complete...',
    'Process completed!'
];

// Add event listeners
function initApp() {
    // Username screen
    elements.usernameNextBtn.addEventListener('click', handleUsernameSubmit);
    elements.usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUsernameSubmit();
    });

    // Robux amount selection screen
    elements.robuxOptions.forEach(option => {
        option.addEventListener('click', () => selectRobuxAmount(option));
    });
    elements.robuxContinueBtn.addEventListener('click', handleRobuxAmountSubmit);

    // Offer completion screen
    elements.completeOfferBtn.addEventListener('click', handleCompleteOffer);
}

// Validate username and navigate to the next screen
function handleUsernameSubmit() {
    const username = elements.usernameInput.value.trim();
    
    if (!username) {
        elements.usernameError.textContent = 'Please enter your Roblox username';
        return;
    }
    
    // Create user data object
    userData = new UserData(username);
    
    // Update welcome message in the Robux amount screen
    elements.welcomeMessage.textContent = `Welcome ${username}, select an amount`;
    
    // Navigate to Robux amount selection screen
    navigateToScreen('robux-amount-screen');
}

// Select Robux amount
function selectRobuxAmount(option) {
    // Remove selection from all options
    elements.robuxOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Select the chosen option
    option.classList.add('selected');
    
    // Store the selected amount
    selectedRobuxAmount = parseInt(option.getAttribute('data-amount'));
}

// Validate Robux amount selection and navigate to processing screen
function handleRobuxAmountSubmit() {
    if (!selectedRobuxAmount) {
        // Show error message if no amount is selected
        alert('Please select a Robux amount');
        return;
    }
    
    // Update user data with selected amount
    userData.robuxAmount = selectedRobuxAmount;
    
    // Navigate to processing screen
    navigateToScreen('processing-screen');
    
    // Start processing simulation
    startProcessingSimulation();
}

// Simulate processing
function startProcessingSimulation() {
    let progress = 0;
    let messageIndex = 0;
    
    // Update initial message
    elements.statusMessage.textContent = statusMessages[0];
    
    // Create timer to update progress
    const processingInterval = setInterval(() => {
        progress += 2;
        
        // Update progress percentage
        elements.progressPercentage.textContent = `${progress}%`;
        elements.progressBar.style.width = `${progress}%`;
        
        // Update status message based on progress
        if (progress < 15) {
            messageIndex = 0;
        } else if (progress < 25) {
            messageIndex = 1;
        } else if (progress < 35) {
            messageIndex = 2;
            elements.statusMessage.textContent = `${statusMessages[2]}${userData.username}`;
        } else if (progress < 45) {
            messageIndex = 3;
        } else if (progress < 55) {
            messageIndex = 4;
        } else if (progress < 75) {
            messageIndex = 5;
            elements.statusMessage.textContent = `${statusMessages[5]} ${userData.robuxAmount} Robux`;
        } else if (progress < 95) {
            messageIndex = 6;
        } else {
            messageIndex = 7;
        }
        
        // Update status message if not custom
        if (messageIndex !== 2 && messageIndex !== 5) {
            elements.statusMessage.textContent = statusMessages[messageIndex];
        }
        
        // When progress is complete
        if (progress >= 100) {
            clearInterval(processingInterval);
            
            // Wait a bit before navigating to the next screen
            setTimeout(() => {
                navigateToScreen('offer-completion-screen');
                updateCompletionScreen();
            }, 800);
        }
    }, 120);
}

// Update completion screen with user data
function updateCompletionScreen() {
    elements.completionUsername.textContent = userData.username;
    elements.completionRobuxAmount.textContent = userData.robuxAmount;
    elements.completionRobuxAmountText.textContent = userData.robuxAmount;
}

// Handle complete offer button
function handleCompleteOffer() {
    // Check internet connection (simulation)
    const isConnected = true;
    
    if (!isConnected) {
        alert('Please check your internet connection and try again.');
        return;
    }
    
    // Open offer link
    const offerUrl = 'https://getsfreeall.site/cl/v/j6l5lp';
    
    try {
        window.open(offerUrl, '_blank');
    } catch (e) {
        alert('Could not open the requested page. Please check your internet connection and try again.');
    }
}

// Navigate between screens
function navigateToScreen(screenId) {
    // Hide current screen
    document.getElementById(currentScreen).classList.remove('active');
    
    // Show new screen
    document.getElementById(screenId).classList.add('active');
    
    // Update current screen
    currentScreen = screenId;
}

// Initialize app
document.addEventListener('DOMContentLoaded', initApp);
