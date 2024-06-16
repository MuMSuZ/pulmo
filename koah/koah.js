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
                if (panel.id === 'tanım' && !panel.innerHTML) {
                    loadContent('tanım.txt', panel); // İçeriği yüklemek için panel id'sini kontrol edin
                }
                if (panel.id === 'yuk' && !panel.innerHTML) {
                    loadContent('yuk.txt', panel);
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
                    // Metni HTML olarak biçimlendirin
                    const formattedText = data
                        .split(/\n\s*\n/) // Paragrafları ayırmak için boş satırlara göre böl
                        .map(paragraph => {
                            // Girintili paragraf olup olmadığını kontrol et
                            if (paragraph.startsWith('*')) {
                                return `<p class="indented">${paragraph.slice(1).trim().replace(/\n/g, '<br>')}</p>`;
                            } else {
                                return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
                            }
                        })
                        .join('');
                    element.innerHTML = formattedText;
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                    element.innerHTML = 'İçerik yüklenemedi.';
                });
        }