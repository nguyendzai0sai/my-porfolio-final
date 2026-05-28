$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if(window.scrollY>60){
            document.querySelector('#scroll-top').classList.add('active');
        }else{
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline',{delay: 400});
srtop.reveal('.experience .timeline .container',{interval: 400}); 


// Start of Tawk.to Live Chat
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
// End of Tawk.to Live Chat


// disable developer mode
document.onkeydown = function(e) {
  if(e.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}

document.addEventListener('visibilitychange',
function(){
    if(document.visibilityState === "visible"){
        document.title = "Experience | Portfolio Nguyen Duong";
        $("#favicon").attr("href","/assets/images/avtnguyen1.jpg");
    }
    else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href","/assets/images/avtnguyen1.jpg");
    }
});

// Fetch experience data and setup clicks
async function fetchExperienceData() {
    const response = await fetch("../experience.json?v=" + new Date().getTime());
    const data = await response.json();
    return data;
}

let experienceData = [];

fetchExperienceData().then(data => {
    experienceData = data;
    setupExperienceClick();
});

function setupExperienceClick() {
    const cards = document.querySelectorAll('.experience .timeline .container .content');
    const modal = document.getElementById('experience-modal');
    const modalRole = document.getElementById('modal-role');
    const modalCompany = document.getElementById('modal-company');
    const modalDuration = document.getElementById('modal-duration');
    const modalDetails = document.getElementById('modal-details');
    const modalImages = document.getElementById('modal-images');
    const closeBtn = document.querySelector('.close-modal');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const expId = card.getAttribute('data-id');
            const exp = experienceData.find(item => item.id === expId);
            if (exp) {
                modalRole.innerText = exp.role;
                modalCompany.innerText = exp.company;
                modalDuration.innerText = exp.duration;
                
                let detailsHTML = "";
                exp.details.forEach(detail => {
                    detailsHTML += `<li>${detail}</li>`;
                });
                modalDetails.innerHTML = detailsHTML;

                // Tải ảnh động từ khóa images trong json
                let imagesHTML = "";
                if (exp.images && exp.images.length > 0) {
                    exp.images.forEach(imgSrc => {
                        imagesHTML += `<img src="${imgSrc}" alt="${exp.company}" onerror="this.style.display='none'" />`;
                    });
                    modalImages.innerHTML = imagesHTML;
                    modalImages.style.display = "grid";
                } else {
                    modalImages.innerHTML = "";
                    modalImages.style.display = "none";
                }
                
                modal.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal.classList.contains('active')) {
            closeModal();
        }
    });
}