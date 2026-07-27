/* ============================================
   COCOTARU INDONESIA - Animation Scripts
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {

  // -------------------------------------------
  // 1. NAVBAR SCROLL SHRINK
  // -------------------------------------------
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // -------------------------------------------
  // 2. ACTIVE NAV LINK ON SCROLL (Spy)
  // -------------------------------------------
  const sections = document.querySelectorAll("section, [id]");
  const navLinks = document.querySelectorAll(".about-us-link");

  function setActiveLink() {
    let current = "";
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("nav-on");
      const href = link.getAttribute("href");
      if (href && href.substring(1) === current) {
        link.classList.add("nav-on");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink(); // init

  // -------------------------------------------
  // 3. COUNTER / NUMBER COUNT-UP (optional)
  //    Can be used if you add stat numbers later
  // -------------------------------------------
  const counterEls = document.querySelectorAll(".counter-up");
  if (counterEls.length > 0) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute("data-target"));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(function () {
              current += step;
              if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
              } else {
                el.textContent = Math.floor(current);
              }
            }, 16);

            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  // -------------------------------------------
  // 4. GALLERY IMAGE CLICK - Simple Lightbox
  // -------------------------------------------
  const galleryImages = document.querySelectorAll(".gallery-img");
  galleryImages.forEach(function (img) {
    img.addEventListener("click", function () {
      // Create overlay
      const overlay = document.createElement("div");
      overlay.className = "lightbox-overlay";
      overlay.style.cssText =
        "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:fadeIn 0.3s ease;";

      // Clone image
      const clone = img.cloneNode(true);
      clone.style.cssText =
        "max-width:90%;max-height:90%;object-fit:contain;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,0.5);animation:zoomIn 0.35s ease;";

      overlay.appendChild(clone);
      document.body.appendChild(overlay);

      // Close on click
      overlay.addEventListener("click", function () {
        overlay.style.animation = "fadeOut 0.3s ease";
        setTimeout(function () {
          overlay.remove();
        }, 280);
      });

      // Close on Escape
      function onKey(e) {
        if (e.key === "Escape") {
          overlay.remove();
          document.removeEventListener("keydown", onKey);
        }
      }
      document.addEventListener("keydown", onKey);
    });
  });

  // Add keyframes for lightbox dynamically
  const lightboxStyles = document.createElement("style");
  lightboxStyles.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to   { opacity: 0; }
    }
    @keyframes zoomIn {
      from { transform: scale(0.7); opacity: 0; }
      to   { transform: scale(1);   opacity: 1; }
    }
  `;
  document.head.appendChild(lightboxStyles);
});
