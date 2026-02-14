
        const KEY = "121925";
        const START_DATE = new Date("December 19, 2025 00:00:00");

        /* ========================================================
           MESSAGE CONTENT
        ======================================================== */
        const MESSAGE = "Happy Valentine's Day! ❤️ i hope you know that i REALLY and TRULYY appreciate you and love you so much YOU'RE MY VALENTINE! always remember that you deserve all love and happiness this world could give. Happy Valentine's Bebe Mahal na mahal kita!";
        /* ======================================================== */
        
        let player;
        let openScale = 1;
        let loveLevel = 100;
        let heartSize = 50;

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('youtube-audio', {
                events: { 'onReady': () => { player.setVolume(50); } }
            });
        }

        window.addEventListener('load', () => {
            const bar = document.getElementById('bar');
            const loader = document.getElementById('loader');
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) { clearInterval(interval); setTimeout(() => { loader.style.opacity = '0'; setTimeout(() => loader.style.display = 'none', 1000); }, 500); } 
                else { width += Math.random() * 15; bar.style.width = Math.min(width, 100) + '%'; }
            }, 200);
        });

        const cursor = document.getElementById('custom-cursor');
        const outline = document.getElementById('cursor-outline');
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
            cursor.style.transform = 'translate(-50%, -50%)';
            outline.style.left = e.clientX + 'px'; outline.style.top = e.clientY + 'px';
            outline.style.transform = 'translate(-50%, -50%)';
        });

        function forgotPw() {
            const hint = document.getElementById('hint');
            hint.style.opacity = "1";
            hint.innerText = "bakit hindi mo alam? hindi moko mahal no?? 🤨";
        }

        function increaseLove() {
            loveLevel *= 10;
            heartSize += 40;
            const heart = document.getElementById('giant-heart');
            const label = document.getElementById('love-percent');
            heart.style.fontSize = heartSize + 'px';
            label.innerText = loveLevel.toLocaleString() + "% Love";
            if (heartSize > 350) {
                celebrate();
                heart.innerHTML = "💥❤️💥";
                document.getElementById('love-btn').style.display = 'none';
                label.innerText = "MY LOVE IS UNMEASURABLE!";
            }
        }

        function initScratchCard() {
            const canvas = document.getElementById('scratch-canvas');
            const container = document.getElementById('scratch-container');
            const ctx = canvas.getContext('2d');
            
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;

            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#C0C0C0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#A8A8A8';
            for(let i=0; i<400; i++) ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 1, 1);

            let isDrawing = false;
            
            function scratch(e) {
                if (!isDrawing) return;
                const rect = canvas.getBoundingClientRect();
                const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
                const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
                
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(x, y, 30, 0, Math.PI * 2); 
                ctx.fill();
                checkScratch();
            }

            canvas.onmousedown = () => isDrawing = true;
            window.onmouseup = () => isDrawing = false;
            canvas.onmousemove = scratch;
            
            canvas.ontouchstart = (e) => { isDrawing = true; e.preventDefault(); };
            canvas.ontouchend = () => isDrawing = false;
            canvas.ontouchmove = scratch;

            function checkScratch() {
                const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                let transparent = 0;
                for (let i = 0; i < pixels.length; i += 4) { if (pixels[i + 3] < 128) transparent++; }
                if (transparent / (canvas.width * canvas.height) > 0.6) {
                    canvas.style.transition = '1.5s ease-out';
                    canvas.style.opacity = '0';
                    setTimeout(() => {
                        canvas.style.display = 'none';
                        celebrate();
                    }, 1500);
                }
            }
        }

        document.getElementById('pass-field').addEventListener('input', function() {
            const hint = document.getElementById('hint');
            if (this.value.length === 6) {
                if (this.value === KEY) {
                    if(player) player.playVideo();
                    document.getElementById('lock-screen').style.transform = "translateY(-100%)";
                    document.getElementById('main-wrapper').style.display = "block";
                    setInterval(createPetal, 1500);
                } else {
                    hint.style.opacity = "1";
                    hint.innerText = "WRONG PASSWORD BEBE";
                    setTimeout(() => { this.value = ""; }, 500);
                }
            }
        });

        function createPetal() {
            const petal = document.createElement('div');
            petal.innerHTML = '🌷'; petal.className = 'petal';
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(petal);
            setTimeout(() => petal.remove(), 5000);
        }

        function revealTimer() { 
            document.getElementById('question-container').style.display = 'none'; 
            document.getElementById('timer-section').style.display = 'block'; 
        }

        function moveIgnore() {
            const btn = document.getElementById('ignore-btn');
            const open = document.getElementById('open-btn');
            btn.style.position = 'fixed';
            btn.style.left = Math.random() * (window.innerWidth - 100) + 'px';
            btn.style.top = Math.random() * (window.innerHeight - 100) + 'px';
            openScale += 0.3;
            open.style.transform = `scale(${openScale})`;
        }

        function showFinalReveal() {
            document.getElementById('main-wrapper').style.display = 'none';
            document.getElementById('final-message-screen').style.display = 'block';
            
            document.getElementById('message-text').innerText = MESSAGE;
            
            setTimeout(() => { 
                document.getElementById('final-message-screen').style.opacity = "1"; 
                document.getElementById('global-back-btn').style.display = "block"; 
                
                const wrapper = document.getElementById('scratch-wrapper');
                wrapper.style.display = 'block';
                setTimeout(() => { 
                    wrapper.style.opacity = '1'; 
                    initScratchCard(); 
                }, 100);
            }, 50);
        }

        function goBackToMain() {
            document.getElementById('final-message-screen').style.display = 'none';
            document.getElementById('final-message-screen').style.opacity = '0';
            document.getElementById('global-back-btn').style.display = 'none';
            document.getElementById('main-wrapper').style.display = 'block';
            
            openScale = 1;
            document.getElementById('open-btn').style.transform = 'scale(1)';
            document.getElementById('ignore-btn').style.position = 'static';
            
            const canvas = document.getElementById('scratch-canvas');
            canvas.style.display = 'block';
            canvas.style.opacity = '1';
            document.getElementById('scratch-wrapper').style.display = 'none';
            document.getElementById('scratch-wrapper').style.opacity = '0';
        }

        function updateTimer() {
            const diff = new Date() - START_DATE;
            document.getElementById('days').innerText = Math.floor(diff / 86400000);
            document.getElementById('hours').innerText = Math.floor((diff / 3600000) % 24).toString().padStart(2, '0');
            document.getElementById('mins').innerText = Math.floor((diff / 60000) % 60).toString().padStart(2, '0');
            document.getElementById('secs').innerText = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
        }
        setInterval(updateTimer, 1000);
        updateTimer();

        function celebrate() { for(let i=0; i<50; i++) setTimeout(createPetal, i * 30); }
        function toggleTheme() {
            const body = document.body;
            const isDark = body.getAttribute('data-theme') === 'dark';
            body.setAttribute('data-theme', isDark ? 'light' : 'dark');
            document.getElementById('theme-btn').innerText = isDark ? "🌙" : "☀️";
        }
    