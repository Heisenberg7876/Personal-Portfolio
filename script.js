// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active Navigation Link Highlighting
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Scroll Progress Indicator
const scrollProgress = document.querySelector(".scroll-progress")

window.addEventListener("scroll", () => {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = (window.scrollY / totalHeight) * 100
  scrollProgress.style.width = `${progress}%`
})

// Back to Top Button
const backToTop = document.querySelector(".back-to-top")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible")
  } else {
    backToTop.classList.remove("visible")
  }
})

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Project Link Click Tracking
document.querySelectorAll(".project-link").forEach((link) => {
  link.addEventListener("click", () => {
    const projectTitle = link.closest(".project-card").querySelector(".project-title").textContent
    const timestamp = new Date().toISOString()
    const analyticsEvent = {
      event: "project_view",
      project: projectTitle,
      url: link.href,
      timestamp: timestamp,
    }
    console.log("Analytics Event:", analyticsEvent)
  })
})

// Resume Download Tracking
document.querySelector(".resume-download").addEventListener("click", () => {
  const timestamp = new Date().toISOString()
  const analyticsEvent = {
    event: "resume_download",
    url: "resume.pdf",
    timestamp: timestamp,
  }
  console.log("Analytics Event:", analyticsEvent)
})

// Real-Time Form Validation and Submission
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const messageInput = document.getElementById("message")

// Load saved form data from localStorage
window.addEventListener("load", () => {
  nameInput.value = localStorage.getItem("form_name") || ""
  emailInput.value = localStorage.getItem("form_email") || ""
  messageInput.value = localStorage.getItem("form_message") || ""
})

// Save form data to localStorage on input
;[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener("input", () => {
    localStorage.setItem(`form_${input.id}`, input.value.trim())
    if (formMessage.classList.contains("error")) {
      formMessage.textContent = ""
      formMessage.classList.remove("error", "show")
    }
  })
})

contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  const name = nameInput.value.trim()
  const email = emailInput.value.trim()
  const message = messageInput.value.trim()
  const submitButton = this.querySelector("button")

  if (!name) {
    formMessage.textContent = "Please enter your name"
    formMessage.classList.add("error", "show")
    nameInput.focus()
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    formMessage.textContent = "Please enter a valid email address"
    formMessage.classList.add("error", "show")
    emailInput.focus()
    return
  }

  if (!message) {
    formMessage.textContent = "Please enter a message"
    formMessage.classList.add("error", "show")
    messageInput.focus()
    return
  }

  submitButton.disabled = true
  submitButton.textContent = "Sending..."
  formMessage.textContent = ""
  formMessage.classList.remove("error", "success", "show")

  setTimeout(() => {
    formMessage.textContent = "Message sent successfully! I'll reply soon."
    formMessage.classList.add("success", "show")
    submitButton.disabled = false
    submitButton.textContent = "Send Message"
    contactForm.reset()
    localStorage.removeItem("form_name")
    localStorage.removeItem("form_email")
    localStorage.removeItem("form_message")
    setTimeout(() => formMessage.classList.remove("show"), 5000)
  }, 1500)
})

// Keyboard Navigation Enhancements
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement.focus()
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement.focus()
    }
  }
})

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document
  .querySelectorAll(
    ".project-card, .timeline-item, .about-content, .contact-grid > div, .certificate-card, .skill-card",
  )
  .forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

// Typewriter Effect
function typeWriter(element, text, speed = 50) {
  let i = 0
  element.textContent = ""
  element.style.borderRight = "2px solid var(--primary)"
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(type, speed)
    } else {
      element.style.borderRight = "none"
    }
  }
  type()
}

document.querySelectorAll(".hero-subtitle[data-typewriter]").forEach((el) => {
  const text = el.getAttribute("data-typewriter")
  typeWriter(el, text, 50)
})
