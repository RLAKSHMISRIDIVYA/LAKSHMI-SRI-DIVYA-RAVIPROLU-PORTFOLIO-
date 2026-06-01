/* ==========================================
   PORTFOLIO DYNAMIC INTERACTIVE ENGINE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. TYPING CAROUSEL EFFECT (HERO) ---
  const words = [
    "Full-Stack Software Engineer",
    "AI Outbreak Systems Developer",
    "Smart IoT Architect",
    "Computer Science Engineer"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingTextSpan = document.getElementById('typingText');
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let dynamicDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      dynamicDelay = pauseTime;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      dynamicDelay = 500;
    }

    setTimeout(typeEffect, dynamicDelay);
  }

  if (typingTextSpan) {
    typeEffect();
  }

  // --- 2. MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  // --- 3. SCROLL-SENSITIVE HEADER ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 4. PROJECTS FILTER SYSTEM ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      // Filter cards
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --- 5. ACTIVE NAV TRACKING DURING SCROLL ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentActive = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        currentActive = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActive}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 6. VISITOR CLOCK (RECRUITER WIDGET) ---
  const localTimeSpan = document.getElementById('localTime');

  function updateClock() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    if (localTimeSpan) {
      localTimeSpan.textContent = formatter.format(new Date()) + " IST";
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  // --- 7. MUSIC TRACK TRACKER ---
  const tracksList = [
    "Chill Lofi Beats for Coding",
    "Synthwave Focus Matrix",
    "C++ Compiling Chill Sessions",
    "Deep Focus: Ambient Drone",
    "Techno Coding Marathon Mix"
  ];
  const trackNameSpan = document.getElementById('trackName');

  function rotateTracks() {
    if (trackNameSpan) {
      const randomIdx = Math.floor(Math.random() * tracksList.length);
      trackNameSpan.style.opacity = '0';
      setTimeout(() => {
        trackNameSpan.textContent = tracksList[randomIdx];
        trackNameSpan.style.opacity = '1';
      }, 500);
    }
  }

  setInterval(rotateTracks, 15000); // rotate every 15s

  // --- 8. CONTACT FORM HANDLER (FormSubmit.co API Integration) ---
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...';
      btn.disabled = true;

      const nameVal = document.getElementById('formName').value;
      const emailVal = document.getElementById('formEmail').value;
      const messageVal = document.getElementById('formMessage').value;

      // Submit via FormSubmit.co AJAX Endpoint
      fetch("https://formsubmit.co/ajax/raviprolu.lakshmisridivya@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          message: messageVal,
          _subject: "New Portfolio Transmission from " + nameVal,
          _captcha: "false"
        })
      })
      .then(response => response.json())
      .then(data => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        formFeedback.classList.remove('hidden', 'success', 'error');
        if (data.success === "true" || data.success === true) {
          formFeedback.classList.add('success');
          formFeedback.textContent = "Transmission successful! The message has been sent to Divya's Inbox.";
          contactForm.reset();
        } else {
          formFeedback.classList.add('error');
          formFeedback.textContent = "Transmission failed. Error: " + (data.message || "Unknown error occurred.");
        }
      })
      .catch(err => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        formFeedback.classList.remove('hidden', 'success', 'error');
        formFeedback.classList.add('error');
        formFeedback.textContent = "Transmission failed. Please check your network connection.";
        console.error("FormSubmit Error:", err);
      });
    });
  }

});

// --- 9. MODAL CONTROLS (PROJECT DETAILS) ---
const modalOverlay = document.getElementById('modalOverlay');

function openProjectModal(projectId) {
  if (modalOverlay) {
    modalOverlay.classList.add('active');
    
    // Hide all modal cards
    document.querySelectorAll('.modal-card').forEach(card => {
      card.classList.add('hidden');
    });
    
    // Show specific modal card
    const targetCard = document.getElementById(`modal-${projectId}`);
    if (targetCard) {
      targetCard.classList.remove('hidden');
    }
  }
}

function closeProjectModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.querySelectorAll('.modal-card').forEach(card => {
      card.classList.add('hidden');
    });
  }
}

// Close modal when clicking overlay
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeProjectModal();
    }
  });
}
