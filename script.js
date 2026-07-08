 <script>
        const canvas = document.getElementById('canvas3d');
        const ctx = canvas.getContext('2d');

        let particles = [];
        let hashBlocks = []; // Array for the 16-digit hash blocks
        let terminalLines = [];
        const maxLines = 15;
        
        let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

        const logs = [
            "SYSTEM: [CRITICAL] PACKET INJECTION DETECTED FROM PORT 8080",
            "NMAP: Scanning target gateway node... 192.168.1.1",
            "STATUS: SECURE SHED ROUTING HYPER-LEDGER INITIALIZED",
            "OPENSSL: TLS v1.3 handshake verification... SUCCESS",
            "AES-256: Re-encrypting active block payloads...",
            "DECRYPTOR: Mining RSA private key sequence components...",
            "FIREWALL: Blocking brute-force authentication vector",
            "SHA-256: Hash match verified [E92A11B402F93C...]",
            "SYSTEM: Exploit payload mitigation complete.",
            "WIFI: WPA3 handshake monitored -- compiling handshake capture...",
            "0x7FFF8A3C: Stack memory allocation buffer protected",
            "ROOT: Access granted to cryptographic keystore module"
        ];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        window.addEventListener('mousemove', (e) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.targetX = -1000;
            mouse.targetY = -1000;
        });

        // Helper function to generate a 16-digit random hexadecimal hash string
        function generate16DigitHash() {
            const hexChars = "0123456789ABCDEF";
            let hash = "";
            for (let i = 0; i < 16; i++) {
                hash += hexChars[Math.floor(Math.random() * 16)];
            }
            return hash;
        }

        // 1. Existing 3D Binary Nodes
        class BinaryNode {
            constructor() {
                this.reset();
                this.z = Math.random() * 800;
            }

            reset() {
                this.x = (Math.random() - 0.5) * window.innerWidth * 1.5;
                this.y = (Math.random() - 0.5) * window.innerHeight * 1.5;
                this.z = 800;
                this.value = Math.random() > 0.5 ? "1" : "0";
                this.speed = Math.random() * 4 + 3;
            }

            update() {
                this.z -= this.speed;
                if (this.z <= 0) this.reset();
                if (Math.random() < 0.02) this.value = Math.random() > 0.5 ? "1" : "0";
            }

            draw(cx, cy, fov) {
                let scale = fov / (fov + this.z);
                let tx = cx + this.x * scale;
                let ty = cy + this.y * scale;
                let opacity = (800 - this.z) / 800;

                if (tx < 0 || tx > canvas.width || ty < 0 || ty > canvas.height) return;

                let mDist = Math.hypot(tx - mouse.x, ty - mouse.y);
                if (mDist < 100) {
                    ctx.fillStyle = `rgba(239, 68, 68, ${opacity * 0.8})`; 
                    ctx.font = `${Math.max(12, 20 * scale)}px 'Fira Code', monospace`;
                } else {
                    ctx.fillStyle = `rgba(34, 197, 94, ${opacity * 0.22})`; 
                    ctx.font = `${Math.max(10, 16 * scale)}px 'Fira Code', monospace`;
                }

                ctx.fillText(this.value, tx, ty);
            }
        }

        // 2. NEW: 3D Floating 16-Digit Cryptographic Hash Blocks
        class HashBlock {
            constructor() {
                this.reset();
                this.z = Math.random() * 800;
            }

            reset() {
                this.x = (Math.random() - 0.5) * window.innerWidth * 1.5;
                this.y = (Math.random() - 0.5) * window.innerHeight * 1.5;
                this.z = 800;
                this.hashText = generate16DigitHash();
                this.speed = Math.random() * 2 + 1.5; // Drifts slightly slower for readability
            }

            update() {
                this.z -= this.speed;
                if (this.z <= 0) this.reset();
                // Constantly scramble characters to simulate active encryption/hashing computations
                if (Math.random() < 0.15) {
                    this.hashText = generate16DigitHash();
                }
            }

            draw(cx, cy, fov) {
                let scale = fov / (fov + this.z);
                let tx = cx + this.x * scale;
                let ty = cy + this.y * scale;
                let opacity = (800 - this.z) / 800;

                if (tx < -100 || tx > canvas.width + 100 || ty < 0 || ty > canvas.height) return;

                let mDist = Math.hypot(tx - mouse.x, ty - mouse.y);
                if (mDist < 120) {
                    ctx.fillStyle = `rgba(239, 68, 68, ${opacity * 0.6})`; // Red highlight override near cursor
                } else {
                    ctx.fillStyle = `rgba(16, 185, 129, ${opacity * 0.35})`; // Distinct Emerald Green for hashes
                }

                ctx.font = `${Math.max(9, 14 * scale)}px 'Fira Code', monospace`;
                ctx.fillText(this.hashText, tx, ty);
            }
        }

        class ConsoleLog {
            constructor() {
                this.text = logs[Math.floor(Math.random() * logs.length)];
                this.x = 20;
                this.alpha = 1.0;
                this.life = 300;
            }

            update() {
                this.life--;
                if(this.life < 50) this.alpha -= 0.02;
            }
        }

        // Initialize particles & hash blocks arrays
        for(let i=0; i<120; i++) particles.push(new BinaryNode());
        for(let i=0; i<25; i++) hashBlocks.push(new HashBlock()); // Adds 25 floating blocks of 16-digit hashes

        setInterval(() => {
            terminalLines.push(new ConsoleLog());
            if (terminalLines.length > maxLines) terminalLines.shift();
        }, 1200);

        function animate() {
            ctx.fillStyle = '#02040a'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const fov = 400;

            mouse.x += (mouse.targetX - mouse.x) * 0.15;
            mouse.y += (mouse.targetY - mouse.y) * 0.15;

            // Update and Draw Binary Stream Nodes
            particles.forEach(p => {
                p.update();
                p.draw(cx, cy, fov);
            });

            // Update and Draw the new 16-Digit Random Cryptographic Hash Blocks
            hashBlocks.forEach(hb => {
                hb.update();
                hb.draw(cx, cy, fov);
            });

            // Draw Interactive Target Crosshair
            if (mouse.targetX !== -1000) {
                ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
                ctx.lineWidth = 1;
                
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 35, 0, Math.PI * 2);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(mouse.x - 45, mouse.y); ctx.lineTo(mouse.x - 10, mouse.y);
                ctx.moveTo(mouse.x + 10, mouse.y); ctx.lineTo(mouse.x + 45, mouse.y);
                ctx.moveTo(mouse.x, mouse.y - 45); ctx.lineTo(mouse.x, mouse.y - 10);
                ctx.moveTo(mouse.x, mouse.y + 10); ctx.lineTo(mouse.x, mouse.y + 45);
                ctx.stroke();

                ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
                ctx.font = "9px 'Fira Code', monospace";
                ctx.fillText(`SYS_LOC: [${Math.round(mouse.x)}, ${Math.round(mouse.y)}]`, mouse.x + 42, mouse.y - 15);
                ctx.fillText("STATUS: SCANNING VECTORS", mouse.x + 42, mouse.y - 4);
            }

            // Draw Terminal Shell Log Layers
            ctx.font = "12px 'Fira Code', monospace";
            for(let i=0; i < terminalLines.length; i++) {
                let line = terminalLines[i];
                line.update();
                
                if(line.text.includes("CRITICAL") || line.text.includes("FIREWALL")) {
                    ctx.fillStyle = `rgba(239, 68, 68, ${line.alpha * 0.45})`; 
                } else {
                    ctx.fillStyle = `rgba(34, 197, 94, ${line.alpha * 0.35})`; 
                }
                
                let targetY = (canvas.height - 50) - ((terminalLines.length - 1 - i) * 22);
                ctx.fillText(`[root@dev-security]~# ${line.text}`, line.x, targetY);
            }

            // Matrix Radar Sweep
            let scanlineY = (performance.now() / 8) % (canvas.height * 2);
            if(scanlineY < canvas.height) {
                let gradient = ctx.createLinearGradient(0, scanlineY - 120, 0, scanlineY);
                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(1, 'rgba(34, 197, 94, 0.025)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, canvas.width, scanlineY - 120, canvas.width, 120);
            }

            requestAnimationFrame(animate);
        }

        animate();
    </script>
