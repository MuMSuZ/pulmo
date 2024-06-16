var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
                if (panel.id === 'tanım') {
                    loadContent('tanım.txt', panel); // İçeriği yüklemek için panel id'sini kontrol edin
                }
                var arrow = this.querySelector(".arrow");
                if (arrow.style.transform === "rotate(90deg)") {
                    arrow.style.transform = "rotate(0deg)";
                } else {
                    arrow.style.transform = "rotate(90deg)";
                }
            
            });
        }

        function loadContent(url, element) {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    element.innerHTML = data;
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                    element.innerHTML = 'İçerik yüklenemedi.';
                });
        }
