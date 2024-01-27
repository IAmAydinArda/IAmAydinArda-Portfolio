// -------------------- Dropdown Menu -------------------

class DropdownMenu {
  constructor() {
    this.mobileMenu = document.getElementById("mobile-menu");
    this.navList = document.getElementById("nav-list");
    this.addEventListeners();
  }

  addEventListeners() {
    // Open/close menu when mobileMenu is clicked
    this.mobileMenu.addEventListener("click", () => this.toggleMenu());

    // Close menu when clicking outside of it
    document.addEventListener("click", (event) => this.closeMenuOutside(event));
  }

  toggleMenu() {
    this.navList.classList.toggle("active");
  }

  closeMenuOutside(event) {
    // Check if the clicked element is not part of the dropdown menu
    if (!this.mobileMenu.contains(event.target) && !this.navList.contains(event.target)) {
      this.navList.classList.remove("active");
    }
  }
}

// ------------------ Navbar auto scroll ------------------------

const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
          });
      }
  });
});

// ---------------------- Navbar Active Links -------------------

// Function to update the active state
function updateActiveState() {
  var scrollPosition = window.scrollY;
  var windowHeight = window.innerHeight;
  var documentHeight = document.documentElement.scrollHeight;

// Loop through each section and check if it's in the viewport
navLinks.forEach(function (link) {
  var sectionId = link.getAttribute("href").substring(1);
  var section = document.getElementById(sectionId);

  if (
    (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) ||
    (windowHeight + scrollPosition >= documentHeight - 2) // Activates last page near the bottom
    ) {
      // Remove the "active" class from all links
      navLinks.forEach(function (link) {
        link.classList.remove("active");
      });

      // Add the "active" class to the current link
      link.classList.add("active");
      }
      });
  }

// Safe measures
// Update the active state on page load
updateActiveState();

// Update the active state on scroll
window.addEventListener("scroll", updateActiveState);

// Update the active state on page load
updateActiveState();

// Update the active state on scroll
window.addEventListener("scroll", updateActiveState);

// ----------------------- TypeOut Animation --------------------

class TypeOutAnimation {
  constructor(el) {
    this.el = el;
    this.toRotate = JSON.parse(el.getAttribute('data-type'));
    this.period = parseInt(el.getAttribute('data-period'), 10) || 2000;
    this.loopNum = 0;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
  }

  tick() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;
    let that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      that.tick();
    }, delta);
  }
}

// ------------- Calculate Age --------------------

function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear(); // subtract birthday year from current year to define age.

  if (currentDate.getMonth() < birthDate.getMonth() || // Make sure current month is earlier then birthday date or...
      (currentDate.getMonth() === birthDate.getMonth() && // Current month is same as birthday month and...
       currentDate.getDate() <= birthDate.getDate())) { // Current date is same or earlier than birthday date.
    age--; // if so minus one from the age.
  }

  return age;
}

// --------------- Calculate My Age ---------------
const mybirthdate = "2002-02-19"; // My birthdate in yyyy-mm-dd format

const ageElement = document.getElementById("myage"); // Get the element by id.
// ageElement.textContent = calculateAge(mybirthdate); // DISABLES CALCULATION Calculate my age by calculateAge function.

// ------------- Update Website Title -------------

function updatePageTitle(pageName) {
  document.title = `${pageName} | Aydin Arda`; // After page names adds whatever you want.
}

// ------------------- Load -----------------------

document.addEventListener("DOMContentLoaded", () => {
  let dropdownMenu = new DropdownMenu();
  let elements = document.getElementsByClassName('typewrite');
  for (let i = 0; i < elements.length; i++) {
    new TypeOutAnimation(elements[i]);
  }
});

console.log("All good here!");