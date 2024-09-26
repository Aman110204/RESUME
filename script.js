// JavaScript to switch between sections
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        // Remove the 'active' class from all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Add 'active' class to the clicked section
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active');
    });
});
