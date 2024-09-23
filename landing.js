function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

 

window.onscroll = function() { updateScrollIndicator(); };

function updateScrollIndicator() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  document.getElementById("scrollIndicator").style.width = scrollPercentage + "%";
}
const userSection = document.getElementById('userSection');
const username = sessionStorage.getItem('username'); // Assuming the username is stored in local storage

if (username) {
  userSection.innerHTML = `<a href="profile.html"><span class="user-icon" id="USER">👤 ${username}</span></a>`;
} else {
  userSection.innerHTML = `<a href="sign_in.html">Sign In</a>`;
}

document.addEventListener("scroll", function() {
    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            section.classList.add("show");
        }
    });
});

