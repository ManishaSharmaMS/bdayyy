// DOM Elements
const rainContainer = document.querySelector('.rain-container');
const audioButton = document.getElementById('toggle-audio');
const backgroundMusic = document.getElementById('background-music');
const navLinks = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('.section');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const floatingHeartsContainer = document.getElementById('floating-hearts');
const floatingTextContainer = document.getElementById('floating-text-container');



const navToggle = document.querySelector('.nav-toggle');





// Timeline Elements
const expandButtons = document.querySelectorAll('.expand-button');

// Spotify Elements
const spotifyEmbeds = document.querySelectorAll('.spotify-embed iframe');

// Performance optimization - reduce animation counts
const MAX_RAIN_DROPS = 30; // Reduced from 100
const MAX_HEARTS = 20; // Reduced from 15
const MAX_SPARKLES = 20; // Reduced from 20
const MAX_LIGHTNING = 1; // Reduced from 3
const MEMORY_PAIRS = 6; // Number of pairs for memory game
const MAX_FLOATING_TEXTS = 16; // Maximum number of floating texts

// Sample texts for floating elements - you can customize these
const floatingTexts = [
    "Happy Birthday Sandyyyyyy",
    "jalpariii",
    "sherrrrrr",
    "bholaa panchiii",
    "samjhdaarrr munda",
    "Congratulations!",
    "khush rho hamesha",
    "hehehee",
    "haste rho muskurate rho",
    "boooo! darr gaye kyaaa..hehe",
    "oye hoye bday vday..cake to khilao",
    "enjoyyyy krooo khoob",
    "yayyyyyyyy",
    "aur kya plan hai bday ka..hehe",
    "chipkala",
    "Jai Shree Ram. bhagwan ji khush rkhe aapko"
];

// Debounce function to limit function calls
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Create floating hearts and sparkles - optimized
function createFloatingElements() {
    if (!floatingHeartsContainer) return;
    
    // Clear existing elements
    floatingHeartsContainer.innerHTML = '';
    
    // Create hearts and sparkles in a single document fragment
    const fragment = document.createDocumentFragment();
    
    // Create hearts
    for (let i = 0; i < MAX_HEARTS; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${15 + Math.random() * 10}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        fragment.appendChild(heart);
    }
    
    // Create sparkles
    for (let i = 0; i < MAX_SPARKLES; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDuration = `${5 + Math.random() * 5}s`;
        sparkle.style.animationDelay = `${Math.random() * 5}s`;
        fragment.appendChild(sparkle);
    }
    
    // Add all elements at once
    floatingHeartsContainer.appendChild(fragment);
}

// Rain Animation - optimized
function createRain() {
    if (!rainContainer) return;
    
    // Clear existing raindrops
    rainContainer.innerHTML = '';
    
    // Create raindrops
    const raindropsCount = Math.min(MAX_RAIN_DROPS, Math.floor(window.innerWidth / 30)); // Reduced density
    
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < raindropsCount; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        
        // Random positioning
        const posX = Math.floor(Math.random() * window.innerWidth);
        const delay = Math.random() * 2;
        const duration = Math.random() * 0.5 + 0.7;
        
        // Apply styles
        raindrop.style.left = `${posX}px`;
        raindrop.style.animationDelay = `${delay}s`;
        raindrop.style.animationDuration = `${duration}s`;
        
        // Add to fragment
        fragment.appendChild(raindrop);
    }
    
    // Add lightning effects
    for (let i = 0; i < MAX_LIGHTNING; i++) {
        const lightning = document.createElement('div');
        lightning.classList.add('lightning');
        lightning.style.setProperty('--delay', Math.random() * 20);
        fragment.appendChild(lightning);
    }
    
    // Add all elements at once
    rainContainer.appendChild(fragment);
}

// Audio controls
function toggleAudio() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
                playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline-block';
    } else {
        backgroundMusic.pause();
        playIcon.style.display = 'inline-block';
        pauseIcon.style.display = 'none';
    }
}

// Navigation
function switchSection(sectionId) {
    // Verify we have a valid section ID
    if (!sectionId) return;
    
    console.log(`Switching to section: ${sectionId}`);
    
    // Get the target section
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) {
        console.error(`Section with ID "${sectionId}" not found`);
        return;
    }
    
    // Hide all sections with a smooth transition
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        if (section.classList.contains('active') && section !== targetSection) {
            // Fade out current active section
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            // Remove active class after animation
            setTimeout(() => {
        section.classList.remove('active');
                section.style.display = 'none';
                section.style.opacity = '';
                section.style.transform = '';
            }, 300);
        }
    });
    
    // Update nav links
    navLinks.forEach(link => {
        const linkSectionId = link.getAttribute('data-section');
        if (linkSectionId === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Show the target section after a small delay
    setTimeout(() => {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        
        // Force reflow
        void targetSection.offsetWidth;
        
        // Fade in the target section
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateY(0)';
        
        // Scroll to top of section
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 300);
}

// Gallery controls
function updateGallery(index) {
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
            featuredImage.src = thumb.getAttribute('src') || thumb.getAttribute('data-src');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Enhanced Discord messages animation - with interactive features
function animateDiscordMessages() {
    const discordMessages = document.querySelectorAll('.discord-message');
    const discordReactions = document.querySelector('.discord-reactions');
    const discordInput = document.querySelector('.discord-input');
    const discordInputField = document.querySelector('.discord-input input');
    const discordSendBtn = document.querySelector('.discord-send-btn');
    const discordChat = document.querySelector('.discord-chat');
    
    if (!discordMessages.length) return;
    
    // Hide all messages initially
    discordMessages.forEach(msg => {
        msg.style.opacity = '0';
        msg.style.transform = 'translateY(20px)';
    });
    
    if (discordReactions) discordReactions.style.opacity = '0';
    if (discordInput) discordInput.style.opacity = '0';
    
    // Use requestAnimationFrame for better performance
    let index = 0;
    function animateNext() {
        if (index < discordMessages.length) {
            const msg = discordMessages[index];
            msg.style.transition = 'opacity 0.5s, transform 0.5s';
            msg.style.opacity = '1';
            msg.style.transform = 'translateY(0)';
            index++;
            setTimeout(animateNext, 500);
        } else {
            // Show reactions and input after last message
            setTimeout(() => {
                if (discordReactions) {
                    discordReactions.style.transition = 'opacity 0.5s';
                    discordReactions.style.opacity = '1';
                }
                
                setTimeout(() => {
                    if (discordInput) {
                        discordInput.style.transition = 'opacity 0.5s';
                        discordInput.style.opacity = '1';
                        
                        // Enable input and button for interactivity
                        if (discordInputField) {
                            discordInputField.disabled = false;
                            discordInputField.placeholder = "Type a birthday message...";
                        }
                        
                        if (discordSendBtn) {
                            discordSendBtn.disabled = false;
                            
                            // Add send button functionality
                            discordSendBtn.addEventListener('click', () => {
                                sendDiscordMessage(discordInputField, discordChat);
                            });
                            
                            // Add enter key functionality
                            discordInputField.addEventListener('keypress', (e) => {
                                if (e.key === 'Enter') {
                                    sendDiscordMessage(discordInputField, discordChat);
                                }
                            });
                        }
                    }
                }, 500);
            }, 500);
        }
    }


    
    // Start animation
    requestAnimationFrame(animateNext);
    
    // Add hover effects to messages after animation
    setTimeout(() => {
        discordMessages.forEach(msg => {
            msg.addEventListener('mouseenter', () => {
                // Add hover effect to show reaction options
                const reactionOptions = document.createElement('div');
                reactionOptions.classList.add('reaction-options');
                reactionOptions.innerHTML = `
                    <span class="reaction-option" data-emoji="❤️">❤️</span>
                    <span class="reaction-option" data-emoji="👍">👍</span>
                    <span class="reaction-option" data-emoji="🎂">🎂</span>
                    <span class="reaction-option" data-emoji="🎁">🎁</span>
                `;
                
                // Only add if doesn't already exist
                if (!msg.querySelector('.reaction-options')) {
                    msg.appendChild(reactionOptions);
                    
                    // Add event listeners to reaction options
                    const options = reactionOptions.querySelectorAll('.reaction-option');
                    options.forEach(option => {
                        option.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const emoji = this.getAttribute('data-emoji');
                            addReactionToMessage(emoji);
                            reactionOptions.remove();
                        });
                    });
                }
            });
            
            msg.addEventListener('mouseleave', () => {
                // Remove reaction options when mouse leaves
                const reactionOptions = msg.querySelector('.reaction-options');
                if (reactionOptions) {
                    setTimeout(() => {
                        if (reactionOptions.parentNode === msg) {
                            reactionOptions.remove();
                        }
                    }, 500);
                }
            });
            
            // Add click event to copy message text
            msg.querySelector('.discord-msg').addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Copy text to clipboard
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    // Show copied notification
                    const notification = document.createElement('div');
                    notification.classList.add('copy-notification');
                    notification.textContent = 'Message copied!';
                    msg.appendChild(notification);
                    
                    // Remove notification after delay
                    setTimeout(() => {
                        notification.remove();
                    }, 1500);
        });
    });
        });
    }, discordMessages.length * 500 + 1000);
}

// Function to add reaction to the Discord reactions bar
function addReactionToMessage(emoji) {
    const reactionsContainer = document.querySelector('.discord-reactions');
    if (!reactionsContainer) return;
    
    // Check if reaction already exists
    let reactionAdded = false;
    const reactions = reactionsContainer.querySelectorAll('.reaction');
    
    reactions.forEach(reaction => {
        const emojiText = reaction.textContent.trim().split(' ')[0];
        if (emojiText === emoji) {
            // Increment existing reaction
            const count = parseInt(reaction.textContent.split(' ')[1]) || 1;
            reaction.textContent = `${emoji} ${count + 1}`;
            reaction.classList.add('active');
            reactionAdded = true;
            
            // Add animation
            reaction.classList.add('pulse-animation');
            setTimeout(() => {
                reaction.classList.remove('pulse-animation');
            }, 300);
        }
    });
    
    // Add new reaction if it doesn't exist
    if (!reactionAdded) {
        const newReaction = document.createElement('div');
        newReaction.classList.add('reaction', 'active', 'pulse-animation');
        newReaction.textContent = `${emoji} 1`;
        reactionsContainer.appendChild(newReaction);
        
        // Remove animation class after delay
        setTimeout(() => {
            newReaction.classList.remove('pulse-animation');
        }, 300);
        
        // Add click event to toggle reaction
        newReaction.addEventListener('click', function() {
            // Parse current count
            const emojiText = this.textContent.trim();
            const emoji = emojiText.split(' ')[0];
            const count = parseInt(emojiText.split(' ')[1]) || 0;
            
            // Toggle reaction
            this.classList.toggle('active');
            
            // Update count
            if (this.classList.contains('active')) {
                this.textContent = `${emoji} ${count + 1}`;
            } else {
                this.textContent = `${emoji} ${Math.max(0, count - 1)}`;
            }
        });
    }
}

// Enhanced function to send user Discord messages
function sendDiscordMessage(inputField, chatContainer) {
    if (!inputField || !chatContainer || !inputField.value.trim()) return;
    
    // Play send message sound
    const messageSentSound = new Audio('audio/message-sent.mp3');
    if (messageSentSound) {
        messageSentSound.volume = 0.2;
        messageSentSound.play().catch(() => {
            // Silently handle any audio play errors
        });
    }
    
    // Create new message element
    const newMessage = document.createElement('div');
    newMessage.classList.add('discord-message', 'user-message');
    
    // Generate current time string
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Set message content
    newMessage.innerHTML = `
        <div class="discord-avatar">👤</div>
        <div class="discord-text">
            <div class="discord-name">You</div>
            <div class="discord-msg">${escapeHTML(inputField.value)}</div>
            <div class="discord-time">Just now - ${timeString}</div>
        </div>
    `;
    
    // Add message to chat with animation
    newMessage.style.opacity = '0';
    newMessage.style.transform = 'translateY(20px)';
    chatContainer.appendChild(newMessage);
    
    // Create subtle typing indicator for response
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('discord-message', 'typing-indicator');
    typingIndicator.innerHTML = `
        <div class="discord-avatar">🎂</div>
        <div class="discord-text">
            <div class="discord-name">Birthday Person</div>
            <div class="typing-dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>
    `;
    
    // Animate message appearance
    setTimeout(() => {
        newMessage.style.transition = 'opacity 0.3s, transform 0.3s';
        newMessage.style.opacity = '1';
        newMessage.style.transform = 'translateY(0)';
        
        // Clear input field
        inputField.value = '';
        
        // Show typing indicator
        setTimeout(() => {
            chatContainer.appendChild(typingIndicator);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            // Auto-respond after a delay to simulate typing
            setTimeout(() => {
                // Remove typing indicator
                typingIndicator.remove();
                
                // Generate response based on the message content
                const responses = [
                    "Thanks for the birthday wishes! 🎉",
                    "You're so sweet, thank you! 💖",
                    "That made my day! 🥰",
                    "Best birthday message ever! 🎂",
                    "You're awesome! Thanks for celebrating with me! 🎁"
                ];
                
                // Create response message
                const responseMessage = document.createElement('div');
                responseMessage.classList.add('discord-message');
                
                // Choose random response
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                
                responseMessage.innerHTML = `
                    <div class="discord-avatar">🎂</div>
                    <div class="discord-text">
                        <div class="discord-name">Birthday Person</div>
                        <div class="discord-msg">${randomResponse}</div>
                        <div class="discord-time">Just now - ${timeString}</div>
                    </div>
                `;
                
                // Initially hide the message
                responseMessage.style.opacity = '0';
                responseMessage.style.transform = 'translateY(20px)';
                
                // Add to chat
                chatContainer.appendChild(responseMessage);
                
                // Scroll to bottom
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                // Show with animation
                setTimeout(() => {
                    responseMessage.style.transition = 'opacity 0.5s, transform 0.5s';
                    responseMessage.style.opacity = '1';
                    responseMessage.style.transform = 'translateY(0)';
                    
                    // Add the message reaction functionality
                    responseMessage.addEventListener('mouseenter', () => {
                        // Add hover effect to show reaction options
                        const reactionOptions = document.createElement('div');
                        reactionOptions.classList.add('reaction-options');
                        reactionOptions.innerHTML = `
                            <span class="reaction-option" data-emoji="❤️">❤️</span>
                            <span class="reaction-option" data-emoji="👍">👍</span>
                            <span class="reaction-option" data-emoji="🎂">🎂</span>
                            <span class="reaction-option" data-emoji="🎁">🎁</span>
                        `;
                        
                        // Only add if doesn't already exist
                        if (!responseMessage.querySelector('.reaction-options')) {
                            responseMessage.appendChild(reactionOptions);
                            
                            // Add event listeners to reaction options
                            const options = reactionOptions.querySelectorAll('.reaction-option');
                            options.forEach(option => {
                                option.addEventListener('click', function(e) {
                                    e.stopPropagation();
                                    const emoji = this.getAttribute('data-emoji');
                                    addReactionToMessage(emoji);
                                    reactionOptions.remove();
                                });
                            });
                        }
                    });
                    
                    responseMessage.addEventListener('mouseleave', () => {
                        // Remove reaction options when mouse leaves
                        const reactionOptions = responseMessage.querySelector('.reaction-options');
                        if (reactionOptions) {
                            setTimeout(() => {
                                if (reactionOptions.parentNode === responseMessage) {
                                    reactionOptions.remove();
                                }
                            }, 500);
                        }
                    });
                    
                    // Play message received sound
                    const messageReceivedSound = new Audio('audio/message-received.mp3');
                    if (messageReceivedSound) {
                        messageReceivedSound.volume = 0.2;
                        messageReceivedSound.play().catch(() => {
                            // Silently handle any audio play errors
                        });
                    }
                    
                    // Add a reaction to the message automatically
                    setTimeout(() => {
                        addReactionToMessage('❤️');
                    }, 1000);
                }, 300);
            }, 1500 + Math.random() * 1000); // Randomize typing time
        }, 300);
    }, 100);
}

// Helper function to safely escape HTML
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
}

// Enhance tree animation with random movement - optimized
function animateTrees() {
    if (!trees.length) return;
    
    trees.forEach(tree => {
        // Add slight random movement to each tree
        const randomDelay = Math.random() * 2;
        const randomDuration = 7 + Math.random() * 4;
        
        tree.style.animationDelay = `${randomDelay}s`;
        tree.style.animationDuration = `${randomDuration}s`;
    });
    
    // Reduce frequency of strong gusts
    setInterval(() => {
        if (Math.random() > 0.8) {
            const randomTree = trees[Math.floor(Math.random() * trees.length)];
            const randomAngle = 3 + Math.random() * 4;
            
            gsap.to(randomTree, {
                rotation: randomAngle * (Math.random() > 0.5 ? 1 : -1),
                duration: 2,
                ease: "power2.inOut",
                yoyo: true,
                repeat: 1
            });
        }
    }, 5000);
}

// Create and animate leaves falling - optimized
function createLeaves() {
    if (!leavesContainer) return;
    
    // Clear existing leaves
    leavesContainer.innerHTML = '';
    
    const fragment = document.createDocumentFragment();
    const leafCount = Math.min(MAX_LEAVES, Math.floor(window.innerWidth / 100));
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        
        // Random leaf type (1-3)
        const leafType = Math.floor(Math.random() * 3) + 1;
        leaf.classList.add(`leaf-${leafType}`);
        
        // Random initial position
        const posX = Math.random() * 100;
        const rotation = Math.random() * 360;
        const scale = 0.5 + Math.random() * 0.5;
        
        // Apply styles
        leaf.style.left = `${posX}%`;
        leaf.style.top = '-5%';
        leaf.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        leaf.style.animationDuration = `${8 + Math.random() * 15}s`;
        leaf.style.animationDelay = `${Math.random() * 5}s`;
        
        fragment.appendChild(leaf);
    }
    
    leavesContainer.appendChild(fragment);
}

// Lightbox functionality
function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    
    lightboxImg.src = src;
            lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
}

function closeLightboxFunc() {
    if (!lightbox) return;
    
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300);
}

// Simplified Omnitrix functionality
function setupOmnitrix() {
    const omnitrixContainer = document.getElementById('omnitrix-container');
    const omnitrixCenter = document.querySelector('.omnitrix-center');
    const alienDisplay = document.querySelector('.alien-display');
    const alienSilhouette = document.querySelector('.alien-silhouette');
    const alienName = document.querySelector('.alien-name');
    const omnitrixMessage = document.getElementById('omnitrix-message');
    
    if (!omnitrixContainer || !omnitrixCenter || !omnitrixMessage) {
        console.error("Omnitrix elements not found");
        return;
    }
    
    // Alien database with reliable image URLs
    const aliens = [
        { name: "Heatblast", image: "https://i.imgur.com/bfiJPfE.png" },
        { name: "Four Arms", image: "https://i.imgur.com/qb8JzIJ.png" },
        { name: "Diamondhead", image: "https://i.imgur.com/N96Wlkd.png" },
        { name: "XLR8", image: "https://i.imgur.com/TvkJYKw.png" },
        { name: "Grey Matter", image: "https://i.imgur.com/GJp4T9y.png" }
    ];
    
    let transformed = false;
    let transformationInProgress = false;
    
    // Clear any existing event listeners
    const newOmnitrixCenter = omnitrixCenter.cloneNode(true);
    omnitrixCenter.parentNode.replaceChild(newOmnitrixCenter, omnitrixCenter);
    
    // Add click event with improved handling
    newOmnitrixCenter.addEventListener('click', function() {
        if (transformed || transformationInProgress) return;
        
        transformationInProgress = true;
        
        // Add visual feedback
        this.classList.add('transform-glow');
        
        // Pick a random alien
        const randomIndex = Math.floor(Math.random() * aliens.length);
        const selectedAlien = aliens[randomIndex];
        
        // Preload the image
        const preloadImg = new Image();
        preloadImg.src = selectedAlien.image;
        
        preloadImg.onload = function() {
            // Update display
            if (alienSilhouette) {
                alienSilhouette.style.backgroundImage = `url(${selectedAlien.image})`;
                alienSilhouette.style.backgroundSize = 'contain';
                alienSilhouette.style.backgroundPosition = 'center';
                alienSilhouette.style.backgroundRepeat = 'no-repeat';
            }
            
            if (alienName) {
                alienName.textContent = selectedAlien.name;
            }
            
            // Show alien display
            if (alienDisplay) {
                alienDisplay.classList.add('active');
            }
            
            // Create a flash effect for transformation
            const flash = document.createElement('div');
            flash.classList.add('omnitrix-flash');
            flash.style.position = 'absolute';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100%';
            flash.style.height = '100%';
            flash.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
            flash.style.zIndex = '10';
            flash.style.pointerEvents = 'none';
            omnitrixContainer.appendChild(flash);
            
            setTimeout(() => {
                // Remove flash effect
                flash.remove();
                omnitrixWatch.classList.remove('omnitrix-activated');
                
                // Show the selected alien
                alienDisplay.classList.add('active');
                
                // Add a reset button if it doesn't exist
                if (!omnitrixContainer.querySelector('.reset-omnitrix')) {
                    const resetButton = document.createElement('button');
                    resetButton.className = 'reset-omnitrix cute-button';
                    resetButton.textContent = 'Reset Omnitrix';
                    resetButton.addEventListener('click', resetOmnitrix);
                    omnitrixContainer.appendChild(resetButton);
                }
                
                // Reveal hidden message if it exists
                const omnitrixMessage = document.getElementById('omnitrix-message');
                if (omnitrixMessage) {
                    omnitrixMessage.style.display = 'block';
                    
                    // Create confetti effect in the omnitrix confetti container
                    const omnitrixConfetti = document.getElementById('omnitrix-confetti');
                    if (omnitrixConfetti) {
                        createConfetti(omnitrixConfetti);
                    }
                }
                
                isTransforming = false;
            }, 1000);
        };
        
        preloadImg.onerror = function() {
            console.error("Failed to load alien image:", selectedAlien.image);
            
            // Fallback to emoji for the alien
            if (alienSilhouette) {
                alienSilhouette.style.backgroundImage = 'none';
                alienSilhouette.textContent = '👽';
                alienSilhouette.style.display = 'flex';
                alienSilhouette.style.justifyContent = 'center';
                alienSilhouette.style.alignItems = 'center';
                alienSilhouette.style.fontSize = '40px';
            }
            
            if (alienName) {
                alienName.textContent = selectedAlien.name;
            }
            
            // Show alien display
            if (alienDisplay) {
                alienDisplay.classList.add('active');
            }
            
            // Show message
            omnitrixMessage.style.display = 'block';
            
            transformed = true;
            transformationInProgress = false;
            newOmnitrixCenter.classList.remove('transform-glow');
        };
    });
}

// Helper function to get alien names - simplified
function getAlienName(index) {
    const alienNames = [
        "Heatblast", "Four Arms", "Diamondhead", "XLR8", "Grey Matter",
        "Stinkfly", "Ripjaws", "Wildmutt", "Ghostfreak", "Upgrade"
    ];
    return alienNames[Math.abs(index % alienNames.length)];
}

// Balloon Mini-Game
function createBalloons() {
    if (!balloonContainer) return;
    
    // Clear existing balloons
    balloonContainer.innerHTML = '';
    
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink'];
    const fragment = document.createDocumentFragment();
    let poppedCount = 0;
    
    // Create balloons
    for (let i = 0; i < MAX_BALLOONS; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        
        // Random color
        const colorIndex = Math.floor(Math.random() * colors.length);
        balloon.classList.add(`balloon-${colors[colorIndex]}`);
        
        // Random position adjustment
        balloon.style.animationDelay = `${Math.random() * 2}s`;
        
        // Click event to pop balloon
        balloon.addEventListener('click', function() {
            if (this.classList.contains('popped')) return;
            
            // Play pop sound
            const popSound = new Audio('audio/pop.mp3');
            popSound.volume = 0.4;
            popSound.play();
            
            // Add popped class
            this.classList.add('popped');
            
            // Count popped balloons
            poppedCount++;
            
            // Check if all balloons are popped
            if (poppedCount === MAX_BALLOONS) {
                // Reveal message after all balloons are popped
                setTimeout(() => {
                    // Create confetti
                    createConfetti(balloonConfetti);
                    
                    // Show message
                    balloonMessage.style.opacity = '1';
                    balloonMessage.style.transform = 'translateY(0)';
                    
                    // Play celebration sound
                    const celebrationSound = new Audio('audio/celebration.mp3');
                    celebrationSound.volume = 0.4;
                    celebrationSound.play();
                }, 500);
            }
        });
        
        fragment.appendChild(balloon);
    }
    
    balloonContainer.appendChild(fragment);
}

// Memory Card Game
function createMemoryGame() {
    if (!memoryGame || !memoryMessage) return;
    
    // Clear existing cards
    memoryGame.innerHTML = '';
    
    const images = [
        'memory-cake.jpg', 'memory-gift.jpg', 'memory-balloons.jpg',
        'memory-party.jpg', 'memory-music.jpg', 'memory-friends.jpg'
    ];
    
    // Create pairs of cards
    let cards = [];
    for (let i = 0; i < MEMORY_PAIRS; i++) {
        cards.push({
            id: i,
            img: images[i]
        });
        cards.push({
            id: i,
            img: images[i]
        });
    }
    
    // Shuffle cards
    cards = shuffleArray(cards);
    
    const fragment = document.createDocumentFragment();
    let flippedCards = [];
    let matchedPairs = 0;
    
    // Create memory cards
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.id = card.id;
        
        // Card front (hidden initially)
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.style.backgroundImage = `url('images/${card.img}')`;
        
        // Card back (shown initially)
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        
        // Add elements to card
        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        
        // Click event to flip card
        cardElement.addEventListener('click', function() {
            // Skip if card is already flipped or matched
            if (
                this.classList.contains('flipped') || 
                this.classList.contains('matched') ||
                flippedCards.length >= 2
            ) return;
            
            // Flip card
            this.classList.add('flipped');
            
            // Play flip sound
            const flipSound = new Audio('audio/flip.mp3');
            flipSound.volume = 0.3;
            flipSound.play();
            
            // Add to flipped cards
            flippedCards.push(this);
            
            // Check for match if we have two flipped cards
            if (flippedCards.length === 2) {
                const firstId = flippedCards[0].dataset.id;
                const secondId = flippedCards[1].dataset.id;
                
                if (firstId === secondId) {
                    // Match found
                    setTimeout(() => {
                        flippedCards.forEach(card => {
                            card.classList.add('matched');
                        });
                        
                        // Play match sound
                        const matchSound = new Audio('audio/match.mp3');
                        matchSound.volume = 0.4;
                        matchSound.play();
                        
                        flippedCards = [];
                        matchedPairs++;
                        
                        // Check if all pairs are matched
                        if (matchedPairs === MEMORY_PAIRS) {
                            // Game completed
                            setTimeout(() => {
                                // Create confetti
                                createConfetti(memoryConfetti);
                                
                                // Show message
                                memoryMessage.style.opacity = '1';
                                memoryMessage.style.transform = 'translateY(0)';
                                
                                // Play celebration sound
                                const celebrationSound = new Audio('audio/celebration.mp3');
                                celebrationSound.volume = 0.4;
                                celebrationSound.play();
                            }, 1000);
                        }
                    }, 500);
                } else {
                    // No match
                    setTimeout(() => {
                        flippedCards.forEach(card => {
                            card.classList.remove('flipped');
                        });
                        flippedCards = [];
                    }, 1000);
                }
            }
        });
        
        fragment.appendChild(cardElement);
    });
    
    memoryGame.appendChild(fragment);
}

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create confetti for celebrations
function createConfetti(container) {
    if (!container) return;
    
    // Clear existing confetti
    container.innerHTML = '';
    
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < MAX_CONFETTI; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        
        // Random color
        const colorIndex = Math.floor(Math.random() * colors.length);
        confetti.style.backgroundColor = colors[colorIndex];
        
        // Random position and animation
        const left = Math.random() * 100;
        const width = Math.random() * 8 + 6;
        const height = Math.random() * 4 + 3;
        const delay = Math.random() * 3;
        const duration = Math.random() * 3 + 4;
        
        confetti.style.left = `${left}%`;
        confetti.style.width = `${width}px`;
        confetti.style.height = `${height}px`;
        confetti.style.animationDelay = `${delay}s`;
        confetti.style.animationDuration = `${duration}s`;
        
        fragment.appendChild(confetti);
    }
    
    container.appendChild(fragment);
}

// Handle window resize
function handleResize() {
    createRain();
    createFloatingElements();
    createLeaves();
}

// Create BGMI sniper game
function createBGMIGame() {
    const bgmiGameContainer = document.getElementById('bgmi-game-container');
    const bgmiScoreElement = document.getElementById('bgmi-score');
    const bgmiTimeElement = document.getElementById('bgmi-time');
    const bgmiMessage = document.getElementById('bgmi-message');
    
    if (!bgmiGameContainer || !bgmiScoreElement || !bgmiTimeElement) {
        console.error("BGMI game elements not found");
        return;
    }
    
    // Clear existing content
    bgmiGameContainer.innerHTML = '';
    
    // Create start button
    const startButton = document.createElement('button');
    startButton.classList.add('cute-button', 'start-button');
    startButton.textContent = 'Start Sniping';
    bgmiGameContainer.appendChild(startButton);
    
    // Create sniper scope
    const scope = document.createElement('div');
    scope.classList.add('sniper-scope');
    scope.innerHTML = `
        <div class="scope-outer"></div>
        <div class="scope-middle"></div>
        <div class="scope-inner"></div>
        <div class="scope-crosshair-h"></div>
        <div class="scope-crosshair-v"></div>
    `;
    bgmiGameContainer.appendChild(scope);
    scope.style.display = 'none';
    
    // Create zoom info
    const zoomInfo = document.createElement('div');
    zoomInfo.classList.add('zoom-info');
    zoomInfo.textContent = 'Zoom: 1x';
    bgmiGameContainer.appendChild(zoomInfo);
    zoomInfo.style.display = 'none';
    
    // Game variables
    let gameActive = false;
    let score = 0;
    let timeLeft = 30;
    let gameTimer;
    let targets = [];
    let zoomLevel = 1;
    
    // Start game
    startButton.addEventListener('click', function() {
        // Remove button and show scope
        this.style.display = 'none';
        scope.style.display = 'block';
        zoomInfo.style.display = 'block';
        
        // Start game
        gameActive = true;
        startGameTimer();
        createTarget();
        
        // Update cursor
        bgmiGameContainer.style.cursor = 'none';
        
        // Track mouse position for scope
        bgmiGameContainer.addEventListener('mousemove', moveScope);
    });
    
    // Track mouse for scope movement
    function moveScope(e) {
        if (!gameActive) return;
        
        const rect = bgmiGameContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        scope.style.left = `${x}px`;
        scope.style.top = `${y}px`;
    }
    
    // Handle zoom with mouse wheel
    bgmiGameContainer.addEventListener('wheel', function(e) {
        if (!gameActive) return;
        e.preventDefault();
        
        if (e.deltaY < 0) {
            // Zoom in
            zoomLevel = Math.min(zoomLevel + 0.5, 4);
            } else {
            // Zoom out
            zoomLevel = Math.max(zoomLevel - 0.5, 1);
        }
        
        // Update zoom display
        zoomInfo.textContent = `Zoom: ${zoomLevel}x`;
    });
    
    // Create targets
    function createTarget() {
        if (!gameActive) return;
        
        const target = document.createElement('div');
        target.classList.add('bgmi-target');
        
        // Random position
        const size = 40 + Math.random() * 30;
        const maxX = bgmiGameContainer.clientWidth - size;
        const maxY = bgmiGameContainer.clientHeight - size;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
        target.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
        
        // Add target points based on size (smaller = more points)
        const points = Math.floor(100 - (size - 40) * 2);
        target.dataset.points = points;
        
        // Add click handler
        target.addEventListener('click', function() {
            if (!gameActive) return;
            
            // Add points
            score += parseInt(this.dataset.points);
            bgmiScoreElement.textContent = score;
            
            // Remove target
            this.remove();
            targets = targets.filter(t => t !== this);
            
            // Create point popup
            const popup = document.createElement('div');
            popup.classList.add('score-popup');
            popup.textContent = `+${this.dataset.points}`;
            popup.style.left = this.style.left;
            popup.style.top = this.style.top;
            bgmiGameContainer.appendChild(popup);
            
            // Remove popup after animation
            setTimeout(() => popup.remove(), 1000);
            
            // Create new target
            createTarget();
        });
        
        // Add to container
        bgmiGameContainer.appendChild(target);
        targets.push(target);
    }
    
    // Game timer
    function startGameTimer() {
        gameTimer = setInterval(function() {
            timeLeft--;
            bgmiTimeElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    // End game
    function endGame() {
        gameActive = false;
        clearInterval(gameTimer);
        
        // Remove all targets
        targets.forEach(target => target.remove());
        targets = [];
        
        // Hide scope
        scope.style.display = 'none';
        zoomInfo.style.display = 'none';
        
        // Reset cursor
        bgmiGameContainer.style.cursor = 'default';
        
        // Remove event listener
        bgmiGameContainer.removeEventListener('mousemove', moveScope);
        
        // Show message if score is high enough
        if (score >= 300) {
            bgmiMessage.style.display = 'block';
        }
        
        // Add restart button
        const restartButton = document.createElement('button');
        restartButton.classList.add('cute-button', 'start-button');
        restartButton.textContent = 'Play Again';
        bgmiGameContainer.appendChild(restartButton);
        
        restartButton.addEventListener('click', function() {
            this.remove();
            score = 0;
            timeLeft = 30;
            bgmiScoreElement.textContent = score;
            bgmiTimeElement.textContent = timeLeft;
            bgmiMessage.style.display = 'none';
            createBGMIGame();
        });
    }
}

// Function to create the Ben 10 Alien Quiz game
function createAlienGame() {
    const gameContainer = document.querySelector('.ben10-alien-game');
    if (!gameContainer) return;
    
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60;
    let gameActive = false;
    let timerInterval;
    
    // Game elements
    const gameView = document.createElement('div');
    gameView.className = 'alien-game-container';
    
    // Game header with score and timer
    const gameHeader = `
        <div class="stats">
            <div class="stat-item">
                <div class="stat-label">Score:</div>
                <div class="stat-value score-value">0</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Time:</div>
                <div class="stat-value time-value">60</div>
            </div>
        </div>
    `;
    
    // Game content
    const gameContent = `
        <div class="alien-game-view">
            ${gameHeader}
            <div class="alien-quiz-display"></div>
            <div class="alien-question-area">
                <div class="alien-question"></div>
                <div class="alien-options-area"></div>
                <div class="alien-feedback-area"></div>
            </div>
            <button id="start-alien-quiz" class="start-button">Start Quiz</button>
        </div>
    `;
    
    gameView.innerHTML = gameContent;
    gameContainer.appendChild(gameView);
    
    // Get references to game elements
    const startButton = document.getElementById('start-alien-quiz');
    const scoreValue = gameView.querySelector('.score-value');
    const timeValue = gameView.querySelector('.time-value');
    const quizDisplay = gameView.querySelector('.alien-quiz-display');
    const questionElement = gameView.querySelector('.alien-question');
    const optionsArea = gameView.querySelector('.alien-options-area');
    const feedbackArea = gameView.querySelector('.alien-feedback-area');
    
    // Start button click event
    startButton.addEventListener('click', startGame);
    
    // Function to start the game
    function startGame() {
        startButton.style.display = 'none';
        gameActive = true;
        score = 0;
        timeLeft = 60;
        currentQuestionIndex = 0;
        scoreValue.textContent = score;
        timeValue.textContent = timeLeft;
        
        // Start the timer
        timerInterval = setInterval(() => {
            timeLeft--;
            timeValue.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
        
        // Load the first question
        loadQuestion();
    }
    
    // Function to load a question
    function loadQuestion() {
        // Clear previous content
        quizDisplay.innerHTML = '';
        questionElement.innerHTML = '';
        optionsArea.innerHTML = '';
        feedbackArea.innerHTML = '';
        
        // Randomly select question type
        const questionTypes = ['nameToAlien', 'alienToName', 'powerToAlien', 'alienToPower'];
        const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        let correctAnswer, options;
        
        switch(questionType) {
            case 'nameToAlien':
                // Given a name, identify the alien
                const alien1 = aliens[Math.floor(Math.random() * aliens.length)];
                correctAnswer = alien1.image;
                questionElement.textContent = `Which alien is ${alien1.name}?`;
                
                // Generate options (3 wrong + 1 correct)
                options = [correctAnswer];
                while (options.length < 4) {
                    const randomAlien = aliens[Math.floor(Math.random() * aliens.length)];
                    if (!options.includes(randomAlien.image) && randomAlien.name !== alien1.name) {
                        options.push(randomAlien.image);
                    }
                }
                
                // Shuffle options
                options = shuffleArray(options);
                
                // Create image buttons
                options.forEach(option => {
                    const button = document.createElement('div');
                    button.className = 'alien-option-btn';
                    button.style.width = '100px';
                    button.style.height = '100px';
                    button.style.backgroundImage = `url(${option})`;
                    button.style.backgroundSize = 'contain';
                    button.style.backgroundPosition = 'center';
                    button.style.backgroundRepeat = 'no-repeat';
                    button.dataset.answer = option;
                    
                    button.addEventListener('click', () => checkAnswer(option, correctAnswer));
                    optionsArea.appendChild(button);
                });
                break;
                
            case 'alienToName':
                // Given an alien image, identify the name
                const alien2 = aliens[Math.floor(Math.random() * aliens.length)];
                correctAnswer = alien2.name;
                
                // Create alien image
                const alienImage = document.createElement('div');
                alienImage.className = 'alien-quiz-image';
                if (alien2.effect) alienImage.classList.add(alien2.effect);
                alienImage.style.backgroundImage = `url(${alien2.image})`;
                quizDisplay.appendChild(alienImage);
                
                questionElement.textContent = "What is the name of this alien?";
                
                // Generate name options
                options = [correctAnswer];
                while (options.length < 4) {
                    const randomAlien = aliens[Math.floor(Math.random() * aliens.length)];
                    if (!options.includes(randomAlien.name)) {
                        options.push(randomAlien.name);
                    }
                }
                
                // Shuffle options
                options = shuffleArray(options);
                
                // Create button options
                options.forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'alien-option-btn';
                    button.textContent = option;
                    button.dataset.answer = option;
                    
                    button.addEventListener('click', () => checkAnswer(option, correctAnswer));
                    optionsArea.appendChild(button);
                });
                break;
                
            case 'powerToAlien':
                // Given a power, identify which alien has it
                const alien3 = aliens[Math.floor(Math.random() * aliens.length)];
                const randomPower = alien3.powers[Math.floor(Math.random() * alien3.powers.length)];
                correctAnswer = alien3.name;
                
                questionElement.textContent = `Which alien has the power: "${randomPower}"?`;
                
                // Generate name options
                options = [correctAnswer];
                while (options.length < 4) {
                    const randomAlien = aliens[Math.floor(Math.random() * aliens.length)];
                    if (!options.includes(randomAlien.name)) {
                        options.push(randomAlien.name);
                    }
                }
                
                // Shuffle options
                options = shuffleArray(options);
                
                // Create button options
                options.forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'alien-option-btn';
                    button.textContent = option;
                    button.dataset.answer = option;
                    
                    button.addEventListener('click', () => checkAnswer(option, correctAnswer));
                    optionsArea.appendChild(button);
                });
                break;
                
            case 'alienToPower':
                // Given an alien, identify its power
                const alien4 = aliens[Math.floor(Math.random() * aliens.length)];
                const correctPower = alien4.powers[Math.floor(Math.random() * alien4.powers.length)];
                correctAnswer = correctPower;
                
                // Create alien name display
                const alienName = document.createElement('div');
                alienName.className = 'alien-name-display';
                alienName.textContent = alien4.name;
                quizDisplay.appendChild(alienName);
                
                // Create alien image
                const alienImg = document.createElement('div');
                alienImg.className = 'alien-quiz-image';
                if (alien4.effect) alienImg.classList.add(alien4.effect);
                alienImg.style.backgroundImage = `url(${alien4.image})`;
                quizDisplay.appendChild(alienImg);
                
                questionElement.textContent = `Which of these is a power of ${alien4.name}?`;
                
                // Generate power options
                options = [correctAnswer];
                
                // Create a pool of all powers from all aliens
                const allPowers = aliens.flatMap(a => a.powers);
                
                // Add unique wrong powers
                while (options.length < 4) {
                    const randomPower = allPowers[Math.floor(Math.random() * allPowers.length)];
                    if (!options.includes(randomPower) && !alien4.powers.includes(randomPower)) {
                        options.push(randomPower);
                    }
                }
                
                // Shuffle options
                options = shuffleArray(options);
                
                // Create button options
                options.forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'alien-option-btn';
                    button.textContent = option;
                    button.dataset.answer = option;
                    
                    button.addEventListener('click', () => checkAnswer(option, correctAnswer));
                    optionsArea.appendChild(button);
                });
                break;
        }
    }
    
    // Function to check the answer
    function checkAnswer(selectedAnswer, correctAnswer) {
        if (!gameActive) return;
        
        // Disable all buttons
        const buttons = optionsArea.querySelectorAll('.alien-option-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.answer === correctAnswer) {
                btn.classList.add('correct-answer');
            }
            if (btn.dataset.answer === selectedAnswer && selectedAnswer !== correctAnswer) {
                btn.classList.add('wrong-answer');
            }
        });
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.className = 'alien-feedback';
        
        if (selectedAnswer === correctAnswer) {
            feedback.textContent = 'Correct!';
            feedback.classList.add('correct-feedback');
            score += 10;
            scoreValue.textContent = score;
            
            // Add time bonus for correct answers
            timeLeft += 3;
            timeValue.textContent = timeLeft;
        } else {
            feedback.textContent = 'Wrong!';
            feedback.classList.add('wrong-feedback');
        }
        
        feedbackArea.appendChild(feedback);
        
        // Move to next question after delay
        setTimeout(() => {
            currentQuestionIndex++;
            
            // End game if reached 10 questions or if time is up
            if (currentQuestionIndex >= 10 || timeLeft <= 0) {
                endGame();
            } else {
                loadQuestion();
            }
        }, 1500);
    }
    
    // Function to end the game
    function endGame() {
        gameActive = false;
        clearInterval(timerInterval);
        
        // Clear game content
        quizDisplay.innerHTML = '';
        questionElement.innerHTML = '';
        optionsArea.innerHTML = '';
        feedbackArea.innerHTML = '';
        
        // Show end game message
        const endMessage = document.createElement('div');
        endMessage.className = 'end-game-message';
        endMessage.innerHTML = `
            <h2>Quiz Complete!</h2>
            <p>Your final score: <span class="final-score">${score}</span></p>
            <button id="play-again-btn" class="start-button">Play Again</button>
        `;
        quizDisplay.appendChild(endMessage);
        
        // Play again button
        const playAgainBtn = document.getElementById('play-again-btn');
        playAgainBtn.addEventListener('click', startGame);
        
        // Show the hidden message if score is high enough
        if (score >= 50) {
            const hiddenMessage = document.querySelector('.ben10-hidden-message');
            if (hiddenMessage) {
                hiddenMessage.classList.add('revealed');
                createConfetti();
            }
        }
    }
    
    // Utility function to shuffle an array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}


// Setup Discord chat input
function setupDiscordChat() {
    const discordInputField = document.getElementById('discord-message-input');
    const discordSendButton = document.getElementById('discord-send-button');
    const discordChatContainer = document.querySelector('.discord-chat');
    const typingIndicator = document.getElementById('typing-indicator');
    
    if (!discordInputField || !discordSendButton || !discordChatContainer) return;
    
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function sendMessage() {
        const messageText = discordInputField.value.trim();
        if (messageText === '') return;
        
        // Create and add user message (user is now "Birthday Person")
        const messageHTML = `
            <div class="discord-message" style="opacity: 0;">
                <div class="discord-avatar">👤</div>
                <div class="discord-text">
                    <div class="discord-name">Birthday Person</div>
                    <div class="discord-msg">${escapeHTML(messageText)}</div>
                    <div class="discord-time">Just now</div>
                </div>
            </div>
        `;
        
        discordChatContainer.insertAdjacentHTML('beforeend', messageHTML);
        
        // Add animation to the new message
        const newMessage = discordChatContainer.lastElementChild;
        setTimeout(() => {
            newMessage.style.opacity = '1';
        }, 10);
        
        // Clear input field
        discordInputField.value = '';
        
        // Auto-scroll chat to bottom
        discordChatContainer.scrollTop = discordChatContainer.scrollHeight;
        
        // Sometimes make the "You" respond
        if (Math.random() > 0.3) {
            // Show typing indicator
            if (typingIndicator) {
                typingIndicator.style.display = 'flex';
                discordChatContainer.scrollTop = discordChatContainer.scrollHeight;
            }
            
            // Random delay before response
            const responseDelay = 1000 + Math.random() * 2000;
            
            setTimeout(() => {
                // Hide typing indicator
                if (typingIndicator) {
                    typingIndicator.style.display = 'none';
                }
                
                // Generate response
                const response = getAutoResponse(messageText);
                
                // Add response message
                const responseHTML = `
                    <div class="discord-message" style="opacity: 0;">
                        <div class="discord-avatar">🎂</div>
                        <div class="discord-text">
                            <div class="discord-name">You</div>
                            <div class="discord-msg">${response}</div>
                            <div class="discord-time">Just now</div>
                        </div>
                    </div>
                `;
                
                discordChatContainer.insertAdjacentHTML('beforeend', responseHTML);
                
                // Add animation to the new message
                const newResponse = discordChatContainer.lastElementChild;
                setTimeout(() => {
                    newResponse.style.opacity = '1';
                }, 10);
                
                // Auto-scroll chat to bottom
                discordChatContainer.scrollTop = discordChatContainer.scrollHeight;
            }, responseDelay);
        }
    }
    
    // Set up send button
    discordSendButton.addEventListener('click', sendMessage);
    
    // Set up enter key press
    discordInputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}


// Function to add hover effects and reaction options to messages
function addMessageHoverEffects(messageEl) {
    // Skip if already has hover effects
    if (messageEl.dataset.hasHoverEffects) return;
    messageEl.dataset.hasHoverEffects = "true";
    
    // Add click handler for message
    const msgTextEl = messageEl.querySelector('.discord-msg');
    if (msgTextEl) {
        // Double click to copy message text
        msgTextEl.addEventListener('dblclick', () => {
            // Copy text to clipboard
            navigator.clipboard.writeText(msgTextEl.textContent)
                .then(() => {
                    // Show copied notification
                    const notification = document.createElement('div');
                    notification.className = 'copy-notification';
                    notification.textContent = 'Message copied!';
                    messageEl.appendChild(notification);
                    
                    // Remove notification after 2 seconds
                    setTimeout(() => {
                        notification.remove();
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy message: ', err);
                });
        });
        
        // Add hover reaction options
        msgTextEl.addEventListener('mouseenter', () => {
            // Check if reaction options already exist
            if (messageEl.querySelector('.reaction-options')) return;
            
            // Create reaction options
            const reactionOptions = document.createElement('div');
            reactionOptions.className = 'reaction-options';
            
            // Add reaction options
            const reactions = ['👍', '❤️', '😂', '😮', '🎂', '🎁'];
            reactions.forEach(emoji => {
                const option = document.createElement('div');
                option.className = 'reaction-option';
                option.textContent = emoji;
                option.addEventListener('click', () => {
                    addReactionToMessage(emoji, messageEl);
                });
                reactionOptions.appendChild(option);
            });
            
            // Add to message
            messageEl.appendChild(reactionOptions);
        });
        
        // Remove reaction options on mouse leave
        messageEl.addEventListener('mouseleave', () => {
            const reactionOptions = messageEl.querySelector('.reaction-options');
            if (reactionOptions) {
                setTimeout(() => {
                    reactionOptions.remove();
                }, 500);
            }
        });
    }
}

// Function to add a reaction to a message
function addReactionToMessage(emoji, messageEl) {
    // Check for existing reactions container or create new one
    let reactionsContainer = messageEl.querySelector('.discord-reactions');
    
    if (!reactionsContainer) {
        reactionsContainer = document.createElement('div');
        reactionsContainer.className = 'discord-reactions';
        messageEl.appendChild(reactionsContainer);
    }
    
    // Check if this reaction already exists
    let reactionEl = Array.from(reactionsContainer.querySelectorAll('.reaction'))
        .find(r => r.textContent.startsWith(emoji));
    
    if (reactionEl) {
        // Increment count
        const countText = reactionEl.textContent.split(' ')[1];
        let count = parseInt(countText) || 1;
        count++;
        reactionEl.textContent = `${emoji} ${count}`;
        reactionEl.classList.add('pulse-animation');
        setTimeout(() => {
            reactionEl.classList.remove('pulse-animation');
        }, 500);
    } else {
        // Create new reaction
        reactionEl = document.createElement('div');
        reactionEl.className = 'reaction pulse-animation';
        reactionEl.textContent = `${emoji} 1`;
        reactionsContainer.appendChild(reactionEl);
        
        setTimeout(() => {
            reactionEl.classList.remove('pulse-animation');
        }, 500);
    }
}

// Function to animate Discord messages on section load
function animateDiscordMessages() {
    const messages = document.querySelectorAll('.discord-message');
    
    messages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            message.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Function to escape HTML to prevent injection
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
}

// Initialize theme toggler if it exists
function initThemeToggler() {
    const themeToggler = document.getElementById('theme-toggle');
    if (!themeToggler) return;
    
    themeToggler.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
    
    // Check saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Semi-circle navigation toggle - Circular design
function setupSemiCircleNav() {
    if (!navToggle || !semiCircleNav) return;
    
    const body = document.body;
    const mobileOverlay = document.querySelector('.mobile-overlay');
    let navOpen = false;
    
    // Initial check for screen size to set appropriate behavior
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            semiCircleNav.classList.remove('active');
            body.classList.remove('nav-active');
            navOpen = false;
        }
    }
    
    // Run on load
    checkScreenSize();
    
    // Toggle navigation with animation
    navToggle.addEventListener('click', (e) => {
            e.preventDefault();
        e.stopPropagation();
        navOpen = !navOpen;
        
        if (navOpen) {
            // Opening animation
            semiCircleNav.classList.add('active');
            body.classList.add('nav-active');
            
            // Create mobile overlay if it doesn't exist
            if (!mobileOverlay) {
                const overlay = document.createElement('div');
                overlay.className = 'mobile-overlay';
                document.body.appendChild(overlay);
                
                // Add click handler to close nav when overlay is clicked
                overlay.addEventListener('click', () => {
                    semiCircleNav.classList.remove('active');
                    body.classList.remove('nav-active');
                    navOpen = false;
                });
            }
            
            // Animate items in
            const navItems = document.querySelectorAll('.nav-links li');
            navItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100 + (index * 30));
            });
        } else {
            // Closing animation
            semiCircleNav.classList.remove('active');
            body.classList.remove('nav-active');
        }
    });
    
    // Add click handler to mobile overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            if (navOpen) {
                semiCircleNav.classList.remove('active');
                body.classList.remove('nav-active');
                navOpen = false;
            }
        });
    }
    
    // Desktop hover behavior for circular nav
    if (window.innerWidth > 768) {
        let isHovering = false;
        
        semiCircleNav.addEventListener('mouseenter', () => {
            isHovering = true;
            semiCircleNav.classList.add('active');
            body.classList.add('nav-active');
        });
        
        semiCircleNav.addEventListener('mouseleave', () => {
            isHovering = false;
            
            // Only close if not explicitly toggled open
            if (!navOpen) {
            setTimeout(() => {
                    if (!isHovering) {
                        semiCircleNav.classList.remove('active');
                        body.classList.remove('nav-active');
                    }
            }, 300);
            }
        });
    }
    
    // Set up section navigation - Using event delegation for better performance
    document.querySelectorAll('.nav-links').forEach(navGroup => {
        navGroup.addEventListener('click', (e) => {
            // Find the closest li element that was clicked
            const navItem = e.target.closest('li');
            if (!navItem) return; // Exit if click wasn't on a nav item
            
            e.preventDefault();
            e.stopPropagation();
            
            const sectionId = navItem.getAttribute('data-section');
            if (sectionId) {
                // Update active state in navigation
                document.querySelectorAll('.nav-links li').forEach(item => {
                    item.classList.remove('active');
                });
                navItem.classList.add('active');
                
                // Switch to the requested section
                switchSection(sectionId);
                
                // If on mobile, close the navigation
                if (window.innerWidth <= 768) {
                    semiCircleNav.classList.remove('active');
                    body.classList.remove('nav-active');
                    navOpen = false;
                }
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        checkScreenSize();
    }, 250));
}

// Create floating text elements
function createFloatingTexts() {
    if (!floatingTextContainer) {
        // Create the container if it doesn't exist
        const container = document.createElement('div');
        container.id = 'floating-text-container';
        container.className = 'floating-text-container';
        document.body.appendChild(container);
        
        // Update our reference
        floatingTextContainer = container;
    } else {
        // Clear existing floating texts
        floatingTextContainer.innerHTML = '';
    }
    
    // Create text elements
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < MAX_FLOATING_TEXTS; i++) {
        setTimeout(() => {
            createSingleFloatingText();
        }, i * 1000); // Stagger the creation
    }
    
    // Set up periodic creation of new texts
    setInterval(createSingleFloatingText, 5000); // Increased from 3000 for more time to read each message
}

function createSingleFloatingText() {
    if (!floatingTextContainer) return;
    
    // Create text element
    const textElement = document.createElement('div');
    textElement.classList.add('floating-text');
    
    // Add random variant class
    const variantClass = `variant-${Math.floor(Math.random() * 4) + 1}`;
    textElement.classList.add(variantClass);
    
    // Set random starting position
    const startX = Math.random() * window.innerWidth;
    textElement.style.left = `${startX}px`;
    textElement.style.bottom = '100px'; // Position higher in the visible area (was -50px)
    
    // Set custom properties for animation
    textElement.style.setProperty('--x-move', Math.random() * 2 - 1); // Random between -1 and 1
    textElement.style.setProperty('--rotation', Math.random() * 3 - 1.5); // Random rotation factor
    
    // Pick random text
    const randomText = floatingTexts[Math.floor(Math.random() * floatingTexts.length)];
    textElement.textContent = randomText;
    
    // Add to DOM
    floatingTextContainer.appendChild(textElement);
    
    // Remove element after animation ends
    setTimeout(() => {
        if (textElement.parentNode === floatingTextContainer) {
            floatingTextContainer.removeChild(textElement);
        }
    }, 4000); // Match CSS animation duration (was 8000)
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Rain and hearts/sparkles
    createRain();
    createFloatingElements();
    createFloatingHearts();
    createFloatingSparkles();

    
    // Create floating text elements
    createFloatingTexts();
    
    // Add trees animation
    animateTrees();
    
    // Create leaves
    createLeaves();
    
    // Audio button
    if (audioButton) {
        audioButton.addEventListener('click', toggleAudio);
    }

    // Initialize semi-circle navigation 
    setupSemiCircleNav();
    
    // Navigation Events
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                switchSection(sectionId);
                
                // Close navigation menu on mobile
                if (window.innerWidth <= 768) {
                    document.body.classList.remove('nav-active');
                    semiCircleNav.classList.remove('active');
                }
            }
        });
    });
    
    
    
    // Setup lightbox for zoomable images
    zoomableImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src);
        });
    });
    
    if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxFunc);
    }
    
    // Timeline expand buttons
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expandedContent = this.parentElement.nextElementSibling;
            
            if (expandedContent.style.maxHeight) {
                expandedContent.style.maxHeight = null;
                this.textContent = 'Read More';
            } else {
                expandedContent.style.maxHeight = expandedContent.scrollHeight + 'px';
                this.textContent = 'Show Less';
            }
        });
    });
    
    // Setup theme toggler
    initThemeToggler();
    
  
 
  
   
    // Discord chat demo
    const discordChat = document.querySelector('.discord-chat');
    if (discordChat) {
        setupDiscordChat();
        
        // Animate discord messages with a delay
        setTimeout(() => {
            animateDiscordMessages();
        }, 1000);
    }
    
  
    // Handle resize events - debounced for performance
    window.addEventListener('resize', debounce(() => {
        handleResize();
    }, 250));
    
    // Trigger initial resize handler
    handleResize();
});

// Handle resize
function handleResize() {
    // Check if we need to recreate rain for responsive layout
    createRain();
    createFloatingElements();

} 
function showFloatingText() {
    const text = floatingTexts[Math.floor(Math.random() * floatingTexts.length)];
    const span = document.createElement("span");
    span.className = "floating-text";
    span.innerText = text;

    document.body.appendChild(span);

    setTimeout(() => {
        span.remove();
    }, 3000); 
}

setInterval(showFloatingText, 2000);
