function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');
    const menuIcon = document.querySelector('.menu-icon i');
    menuLinks.classList.toggle("open");
    menuIcon.classList.toggle("open");

}