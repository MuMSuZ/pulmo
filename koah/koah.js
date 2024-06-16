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
                if (panel.id === 'tanim' && !panel.innerHTML) {
                    loadContent('tanim.txt', panel); // İçeriği yüklemek için panel id'sini kontrol edin
                }
                if (panel.id === 'yuk' && !panel.innerHTML) {
                    loadContent('yuk.txt', panel);
                }
                if (panel.id === 'patogenez' && !panel.innerHTML) {
                    loadContent('patogenez.txt', panel)
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
                            // Girintili ve kalın metinleri kontrol et
                            const lines = paragraph.split('\n').map(line => {
                                // Girintili satırları kontrol et
                                line = line.replace(/\*(.*?)\*/g, '<span class="indented">$1</span>');
                                // Kalın metinleri kontrol et
                                line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                                return line;
                            });
                            return `<p>${lines.join('<br>')}</p>`;
                        })
                        .join('');
                    element.innerHTML = formattedText;
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                    element.innerHTML = 'İçerik yüklenemedi.';
                });
        }
        