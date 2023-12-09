// -------------------- Dropdown Menu -------------------
class DropdownMenu {
  constructor() {
    this.mobileMenu = document.getElementById("mobile-menu");
    this.navList = document.getElementById("nav-list");
    this.addEventListeners();
  }

  addEventListeners() {
    this.mobileMenu.addEventListener("click", () => this.toggleMenu());
  }

  toggleMenu() {
    this.navList.classList.toggle("active");
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
       currentDate.getDate() <= birthDate.getDate())) { // Current date is same or earlier then birthday date.
    age--; // if so minus one from the age.
  }

  return age;
}

// --------------- Calculate My Age ---------------
const mybirthdate = "2002-02-19"; // My birthdate in yyyy-mm-dd format

const ageElement = document.getElementById("myage"); // Get the element by id.
ageElement.textContent = calculateAge(mybirthdate); // Calculate my age by calculateAge function.

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