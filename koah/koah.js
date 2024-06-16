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
                            if (paragraph.startsWith('@indent')) {
                                return `<p class="indented">${paragraph.replace('@indent', '').replace(/\n/g, '<br>')}</p>`;
                            } else {
                                return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
                            }
                        })
                        .join('');
                    element.innerHTML = formattedText;
                    // İlk paragrafı girintili yap
                    const paragraphs = element.getElementsByTagName('p');
                            if (paragraphs.length > 0) {
                            paragraphs[0].classList.add('indented');
                    }
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                    element.innerHTML = 'İçerik yüklenemedi.';
                });
        }