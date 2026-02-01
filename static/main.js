// Enhanced scroll-driven reveal for workflow steps with vanish/regenerate behavior
const steps = document.querySelectorAll(".step");
const workflowSection = document.querySelector(".workflow").parentElement;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add show class with staggered delay for smooth appearance
        const stepIndex = Array.from(steps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add("show");
        }, stepIndex * 150);
      } else {
        // Remove show class when not intersecting (vanish effect)
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  },
);

// Observe each step individually for better control
steps.forEach((step) => observer.observe(step));

// Additional observer for the entire workflow section to handle bulk animations
const workflowObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When workflow section comes into view, trigger staggered animation
        steps.forEach((step, index) => {
          setTimeout(() => {
            step.classList.add("show");
          }, index * 120);
        });
      } else {
        // When workflow section leaves view, remove all animations
        steps.forEach((step) => {
          step.classList.remove("show");
        });
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -200px 0px",
  },
);

workflowObserver.observe(workflowSection);

// Team cards animation with vanish/regenerate behavior
const teamCards = document.querySelectorAll(".team-card");
const teamSection = document.querySelector(".team-grid").parentElement;

const teamObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered appearance animation
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      } else {
        // Vanish animation
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(30px)";
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  },
);

// Initialize team cards with hidden state
teamCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
  teamObserver.observe(card);
});

// Bulk team section observer for coordinated animations
const teamSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When team section comes into view, trigger all cards
        teamCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 80);
        });
      } else {
        // When team section leaves view, hide all cards
        teamCards.forEach((card) => {
          card.style.opacity = "0";
          card.style.transform = "translateY(30px)";
        });
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -150px 0px",
  },
);

teamSectionObserver.observe(teamSection);
