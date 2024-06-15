document.addEventListener('DOMContentLoaded', function() {
    var acc = document.getElementsByClassName('accordion');

    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', function() {
            this.classList.toggle('active');
            var panel = this.nextElementSibling;
            var arrow = this.querySelector('.arrow');
            
            if (panel.style.display === 'block') {
                panel.style.display = 'none';
                arrow.classList.remove('down');
            } else {
                panel.style.display = 'block';
                arrow.classList.add('down');
            }
        });
    }
});
