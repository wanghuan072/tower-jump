// Tower Jump 游戏数据配置
export const games = [
    {
        id: 1,
        title: "Tower Jump", // 游戏标题
        keywords: "Tower Jump is a lightweight, fast vertical jumping game you can play instantly in your browser.", // SEO关键词
        addressBar: "tower-jump", // URL路径标识符
        publishDate: "2025-09-16", // 发布日期
        imageUrl: "/images/logo.png", // 游戏封面图
        imageAlt: "Tower Jump", // 图片alt文本
        iframeUrl: "/TowerJump.html", // 游戏iframe地址
        seo: {
            title: "Tower Jump - Play Instantly Online", // SEO标题
            description: "Tower Jump is a lightweight, fast vertical jumping game you can play instantly in your browser. Smooth visuals, responsive controls for desktop and mobile.", // SEO描述
            keywords: "Tower Jump, jumping game, online game, casual game, HTML5 game, browser game" // SEO关键词
        },
        detailsHtml: `
            <div class="lead">
                <p>Tower Jump is a snappy vertical jumping mini‑game designed for quick sessions. Open and
                play instantly without installs or logins. Tap or hit Space to keep ascending between
                towers, dodge obstacles, ride the rhythm, and chase higher scores.</p>
                <p>The page is lightweight and loads fast, working smoothly on both desktop and mobile.
                There is no heavy onboarding or complex systems — you can get into the flow within
                minutes. Whether you are commuting or taking a short break, it is a tiny playground you
                can launch anytime.</p>
            </div>
            <ul class="feature-list" aria-label="Game features">
                <li>Instant play: no download, no account</li>
                <li>Lightweight loading: quick to enter</li>
                <li>Input friendly: keyboard, mouse, and touch</li>
                <li>Clear feedback: clean UI and smooth motion</li>
                <li>Device ready: comfortable from phone to desktop</li>
                <li>Play peacefully: no personally identifiable data collection</li>
            </ul>
            
            <h2 id="faq" class="section-title">Frequently Asked Questions (FAQ)</h2>
            
            <div class="faq-item">
                <h3 class="faq-q">How do I play?</h3>
                <div class="faq-content">
                    <p>Desktop: press Space or click to jump. Mobile: tap the screen to jump.</p>
                </div>
            </div>

            <div class="faq-item">
                <h3 class="faq-q">What if the game stutters?</h3>
                <div class="faq-content">
                    <p>Close other resource‑heavy apps or tabs, or try a modern browser.</p>
                </div>
            </div>

            <div class="faq-item">
                <h3 class="faq-q">Can I play on mobile?</h3>
                <div class="faq-content">
                    <p>Yes. The page is responsive; portrait orientation is recommended.</p>
                </div>
            </div>

            <div class="faq-item">
                <h3 class="faq-q">No sound or volume too loud?</h3>
                <div class="faq-content">
                    <p>
                        Check system and browser volume. Some browsers mute autoplay by default. Interact
                        with the page and try again.
                    </p>
                </div>
            </div>

            <div class="faq-item">
                <h3 class="faq-q">Privacy & Data</h3>
                <div class="faq-content">
                    <p>
                        This page does not collect personally identifiable information. If third‑party
                        analytics are used, they are only for improving the experience.
                    </p>
                </div>
            </div>
        `
    },

    {
        "id": 2,
        "title": "Escape Jump", // 游戏标题
        "keywords": "Escape Jump is a fast-paced pixel art escape game where you dodge traffic and obstacles as a bank robber.", // SEO关键词
        "addressBar": "escape-jump", // URL路径标识符
        "publishDate": "2025-09-15", // 发布日期
        "imageUrl": "/images/game-02.webp", // 游戏封面图
        "imageAlt": "Escape Jump", // 图片alt文本
        "iframeUrl": "https://game.azgame.io/escape-jump/", // 游戏iframe地址
        "seo": {
            "title": "Escape Jump - Play the Pixel Escape Game Online", // SEO标题
            "description": "Escape Jump is a fast-paced pixel art game where you play as a bank robber escaping through traffic and obstacles. Instant play, smooth controls, endless fun on desktop and mobile.", // SEO描述
            "keywords": "Escape Jump, escape game, pixel art game, online game, HTML5 game, casual game, browser game" // SEO关键词
        },
        "detailsHtml": `
            <div class="lead">
                <p>Escape Jump throws you into a frantic getaway as a daring bank robber. Your mission:
                weave through traffic, leap over obstacles, and survive as long as possible. With
                addictive pixel art visuals and responsive controls, it is easy to start but hard to master.</p>
                <p>The game loads instantly in your browser — no download, no sign-up. Whether on a quick
                break or killing time on the go, Escape Jump delivers quick action with retro charm and
                challenging gameplay that keeps you coming back.</p>
            </div>
            <ul class="feature-list" aria-label="Game features">
                <li>Play instantly in your browser: no install required</li>
                <li>Retro-style pixel art and catchy atmosphere</li>
                <li>Fast-paced dodging and jumping mechanics</li>
                <li>Easy controls: tap, click, or Space to jump</li>
                <li>Works smoothly on desktop and mobile</li>
                <li>No personal data collection: play freely</li>
            </ul>
            
            <h2 id="faq" class="section-title">Frequently Asked Questions (FAQ)</h2>
            
            <div class="faq-item">
                <h3 class="faq-q">How do I play?</h3>
                <div class="faq-content">
                    <p>Desktop: press Space or click to jump and avoid cars. Mobile: tap the screen to keep escaping.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">What if the game feels too fast?</h3>
                <div class="faq-content">
                    <p>Practice timing your jumps. Try on a larger screen for better visibility.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">Is Escape Jump mobile-friendly?</h3>
                <div class="faq-content">
                    <p>Yes. The game is fully responsive. Playing in portrait orientation is recommended.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">There’s no sound, what can I do?</h3>
                <div class="faq-content">
                    <p>Check your system and browser volume. Some browsers block sound until you interact with the page.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">What about privacy?</h3>
                <div class="faq-content">
                    <p>No personally identifiable data is collected. Any analytics, if used, are solely for performance improvements.</p>
                </div>
            </div>
        `
    },

    {
        "id": 3,
        "title": "Bottle Jump", // 游戏标题
        "keywords": "Bottle Jump is an addictive skill-based arcade game where you flip a bottle and land it upright on different objects.", // SEO关键词
        "addressBar": "bottle-jump", // URL路径标识符
        "publishDate": "2025-09-16", // 发布日期
        "imageUrl": "/images/game-03.webp", // 游戏封面图
        "imageAlt": "Bottle Jump", // 图片alt文本
        "iframeUrl": "https://game.azgame.io/bottle-jump/", // 游戏iframe地址
        "seo": {
            "title": "Bottle Jump - Play Bottle Flip Game Online", // SEO标题
            "description": "Bottle Jump challenges your precision and agility in this addictive arcade bottle flip game. Flip, jump, and land upright on objects across multiple fun game modes.", // SEO描述
            "keywords": "Bottle Jump, bottle flip game, skill game, arcade game, online game, browser game, casual game" // SEO关键词
        },
        "detailsHtml": `
            <div class="lead">
                <p>Bottle Jump challenges your precision and agility in an addictive arcade experience. The goal is simple:
                flip a plastic bottle and land it upright on different objects without letting it fall. Hold and release
                the mouse button to control the jump distance and rotation. Sounds easy? Each jump tests your skill with
                new challenges and tricky distances.</p>
                <p>The game includes multiple fun modes with colorful visuals and smooth physics. Whether you play casually
                or aim for high scores, Bottle Jump is endlessly replayable and entertaining. Jump in now and see how far
                your skills can take you.</p>
            </div>
    
            <h2 class="section-title">Bottle Jump Gameplay</h2>
            <p>Bottle Jump is an arcade skill-based game where players progress by flipping a bottle from one object to another —
            from tables to chairs, chairs to shelves, and beyond — all while keeping it upright. A single fall ends your run, so precision is everything.</p>
    
            <h2 class="section-title">Game Modes</h2>
            <ul class="feature-list">
                <li><strong>Classic:</strong> Flip and jump the bottle as far as possible.</li>
                <li><strong>Bowling:</strong> Knock down all items on the table.</li>
                <li><strong>Speed Run:</strong> Flip and jump under the pressure of time.</li>
                <li><strong>Stacking:</strong> Stack bottles as high as you can.</li>
            </ul>
    
            <h2 class="section-title">How to Play Bottle Jump</h2>
            <ul>
                <li>Hold the left mouse button to build jump power.</li>
                <li>Release to flip the bottle and land it upright.</li>
                <li>Hold longer for farther jumps, shorter for closer ones.</li>
                <li>Retry instantly if the bottle falls — practice makes perfect.</li>
            </ul>
    
            <p>Distances between objects vary, requiring skillful timing. Use retries to refine your technique and learn the bottle’s physics. Collect diamonds during gameplay to unlock new skins and upgrades in the shop, available in classic, speed run, and stacking modes.</p>
    
            <h2 class="section-title">Game Features</h2>
            <ul class="feature-list">
                <li>Multiple game modes to test your precision and creativity</li>
                <li>Realistic bottle physics with satisfying flips and landings</li>
                <li>Quick restart button for endless retry fun</li>
                <li>Vibrant graphics and engaging design for all ages</li>
                <li>Unlockable skins and upgrades with collected diamonds</li>
            </ul>
    
            <p>You will never get bored with Bottle Jump. Each round offers a new challenge, pushing your timing and precision skills to the next level.
            Flip, jump, and conquer — endless fun awaits!</p>
        `
    },

    {
        "id": 4,
        "title": "Omnom Jump", // 游戏标题
        "keywords": "Omnom Jump is a fun stacking and jumping game where you help Om Nom reach new heights while avoiding sharks.", // SEO关键词
        "addressBar": "omnom-jump", // URL路径标识符
        "publishDate": "2025-09-16", // 发布日期
        "imageUrl": "/images/game-04.webp", // 游戏封面图
        "imageAlt": "Omnom Jump", // 图片alt文本
        "iframeUrl": "https://game.azgame.io/om-nom-jump/", // 游戏iframe地址
        "seo": {
            "title": "Omnom Jump - Play Om Nom Jump Online", // SEO标题
            "description": "Omnom Jump is a fun block-stacking and jumping game where you guide Om Nom to climb higher and higher while escaping hungry sharks.", // SEO描述
            "keywords": "Omnom Jump, Om Nom Jump, jumping game, stacking game, arcade game, browser game, HTML5 game" // SEO关键词
        },
        "detailsHtml": `
            <div class="lead">
                <p>Omnom Jump is a playful and exciting stacking game where you guide Om Nom to reach new heights.
                The objective is simple: jump, stack, and climb as high as possible while escaping the hungry
                sharks below. Timing and precision are the keys to survival as each jump brings new risks and rewards.</p>
                <p>The game is lightweight and instantly playable in your browser — no installs, no delays. Its colorful
                visuals, cheerful gameplay, and smooth physics make Omnom Jump enjoyable for all ages. The higher you go,
                the greater the challenge — and the bigger the thrill.</p>
            </div>
    
            <h2 class="section-title">Omnom Jump Gameplay</h2>
            <p>In Omnom Jump, your mission is to stack blocks perfectly to give Om Nom a stable path upward. Each misplaced
            block increases the risk of tumbling, and falling means becoming shark food. With every successful jump,
            Om Nom climbs higher, and the gameplay becomes more intense.</p>
    
            <h2 class="section-title">How to Play Omnom Jump</h2>
            <ul>
                <li>Click or tap to drop and stack blocks under Om Nom.</li>
                <li>Keep the stack balanced to allow Om Nom to continue climbing.</li>
                <li>Reach as high as possible while avoiding falling into the sharks below.</li>
                <li>Test your timing and accuracy — each jump matters.</li>
            </ul>
    
            <h2 class="section-title">Game Features</h2>
            <ul class="feature-list">
                <li>Simple but addictive block-stacking mechanics</li>
                <li>Fun and colorful design with Om Nom as the star</li>
                <li>Challenging progression: the higher you go, the harder it gets</li>
                <li>Instant play in browser, no download needed</li>
                <li>Suitable for both quick breaks and longer play sessions</li>
            </ul>
    
            <p>Omnom Jump offers a mix of fun, tension, and precision-based gameplay that keeps you coming back for
            “just one more round.” Guide Om Nom to the skies and prove how high you can go before the sharks
            catch up!</p>
        `
    },

    {
        "id": 5,
        "title": "Sprunki Jump", // 游戏标题
        "keywords": "Sprunki Jump is a colorful endless jumping game where you leap through worlds, avoid obstacles, and collect rewards.", // SEO关键词
        "addressBar": "sprunki-jump", // URL路径标识符
        "publishDate": "2025-09-16", // 发布日期
        "imageUrl": "/images/game-05.webp", // 游戏封面图
        "imageAlt": "Sprunki Jump", // 图片alt文本
        "iframeUrl": "https://game.azgame.io/sprunki-jump/", // 游戏iframe地址
        "seo": {
            "title": "Sprunki Jump - Play Endless Adventure Online", // SEO标题
            "description": "Sprunki Jump is a colorful arcade jumping game where you explore vibrant worlds, dodge obstacles, and collect rewards. Play instantly in your browser for endless fun.", // SEO描述
            "keywords": "Sprunki Jump, jumping game, endless game, arcade game, colorful game, online game, browser game" // SEO关键词
        },
        "detailsHtml": `
            <div class="lead">
                <p>Sprunki Jump takes you on a vibrant adventure across colorful worlds where every leap matters. 
                The challenge: avoid obstacles, collect rewards, and climb as far as you can in this endless jumping journey. 
                With responsive controls and cheerful visuals, it’s easy to pick up but hard to put down.</p>
                <p>The game runs directly in your browser — no downloads or logins needed. Whether you’re on mobile 
                or desktop, Sprunki Jump delivers quick and fun gameplay for all ages.</p>
            </div>
    
            <h2 class="section-title">Sprunki Jump Gameplay</h2>
            <p>In Sprunki Jump, you guide your character through colorful stages filled with platforms, obstacles, 
            and rewards. Timing is everything: a mistimed jump can end your run, while well-placed leaps keep you 
            climbing higher. Collect rewards along the way to boost your score and unlock extra surprises.</p>
    
            <h2 class="section-title">How to Play Sprunki Jump</h2>
            <ul>
                <li>Tap the screen (mobile) or press Space/click (desktop) to jump.</li>
                <li>Time your jumps to avoid obstacles and stay on platforms.</li>
                <li>Collect rewards scattered throughout the levels to increase your score.</li>
                <li>Keep jumping as long as you can — the adventure never ends!</li>
            </ul>
    
            <h2 class="section-title">Game Features</h2>
            <ul class="feature-list">
                <li>Colorful and cheerful world design</li>
                <li>Endless gameplay with increasing challenge</li>
                <li>Simple one-tap or one-key controls</li>
                <li>Reward collection system to boost fun</li>
                <li>Runs smoothly on both mobile and desktop</li>
                <li>No account or download required — instant play</li>
            </ul>
    
            <h2 id="faq" class="section-title">Frequently Asked Questions (FAQ)</h2>
    
            <div class="faq-item">
                <h3 class="faq-q">How do I control my character in Sprunki Jump?</h3>
                <div class="faq-content">
                    <p>On desktop, press Space or click to jump. On mobile, simply tap the screen to leap forward.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">Can I play Sprunki Jump on my phone?</h3>
                <div class="faq-content">
                    <p>Yes! The game is fully responsive and works smoothly on both desktop and mobile devices.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">What happens if I hit an obstacle?</h3>
                <div class="faq-content">
                    <p>Your run ends instantly. You’ll need to restart and try again to beat your best score.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">Are there rewards to collect?</h3>
                <div class="faq-content">
                    <p>Yes. Collecting rewards increases your score and makes each run more exciting.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">Does Sprunki Jump require an account or download?</h3>
                <div class="faq-content">
                    <p>No. You can play instantly in your browser without creating an account or downloading anything.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">Is Sprunki Jump free to play?</h3>
                <div class="faq-content">
                    <p>Yes, Sprunki Jump is completely free to play online.</p>
                </div>
            </div>
    
            <p>Sprunki Jump is perfect for quick sessions or longer play. Test your jumping skills, 
            chase high scores, and immerse yourself in an endless colorful adventure!</p>
        `
    },

    {
        "id": 6,
        "title": "Mars Jump", // 游戏标题
        "keywords": "Mars Jump is a casual yet challenging jetpack platformer where you explore Mars, hop between platforms, and master precision landings.", // SEO关键词
        "addressBar": "mars-jump", // URL路径标识符
        "publishDate": "2025-09-16", // 发布日期
        "imageUrl": "/images/game-06.webp", // 游戏封面图
        "imageAlt": "Mars Jump", // 图片alt文本
        "iframeUrl": "https://game.azgame.io/mars-jump/", // 游戏iframe地址
        "seo": {
            "title": "Mars Jump - Play Jetpack Platformer Online", // SEO标题
            "description": "Mars Jump is a casual yet challenging skill-based platformer where players use a jetpack to land on platforms across Mars. Test your timing, balance, and precision in this free online game.", // SEO描述
            "keywords": "Mars Jump, jetpack game, Mars game, platformer game, skill-based game, precision landing game, online game" // SEO关键词
        },
        "detailsHtml": `
            <div class="lead">
                <p>Mars Jump is a casual yet challenging skill-based platformer that takes you on an adventure across the red planet. 
                Using a jetpack, your mission is to hop from platform to platform, exploring the Martian landscape while mastering 
                the art of safe landings. With low gravity and tricky physics, each jump is a test of timing, control, and precision.</p>
                <p>The game is lightweight, instantly playable in your browser, and offers a satisfying jetpack experience with 
                vibrant visuals and fun progression. Are you ready to conquer Mars?</p>
            </div>
    
            <h2 class="section-title">Mars Jump Gameplay</h2>
            <p>The core challenge in Mars Jump is guiding your astronaut safely between platforms scattered across Mars. 
            While it sounds simple, controlling your jetpack in low gravity is far more challenging than it looks. 
            Short, controlled bursts and precise landings are the keys to success.</p>
    
            <h2 class="section-title">How to Play Mars Jump</h2>
            <ul>
                <li><strong>Left Thruster:</strong> Hold Left Arrow or A</li>
                <li><strong>Right Thruster:</strong> Hold Right Arrow or D</li>
                <li><strong>Slow Descent:</strong> Hold both thrusters at once</li>
                <li><strong>Launch:</strong> Use controlled thrusts to lift off and aim for the next platform</li>
                <li><strong>Fuel Management:</strong> Jetpack fuel is limited, so avoid wasting it with constant thrusts</li>
                <li><strong>Landing:</strong> Balance your descent and aim for a soft, precise landing — crashes will reset you at the last checkpoint</li>
            </ul>
    
            <h2 class="section-title">Unlockable Content</h2>
            <p>As you progress, you can unlock over 50 unique astronaut characters, each with distinct designs. 
            You’ll also encounter new environments and beautifully designed Martian landscapes that make each jump more exciting.</p>
    
            <h2 class="section-title">Game Features</h2>
            <ul class="feature-list">
                <li>Colorful 2D visuals with detailed Martian backdrops</li>
                <li>50+ unique characters to unlock and play</li>
                <li>Challenging precision-based landing mechanics</li>
                <li>Instant respawn at the latest checkpoint for smooth gameplay</li>
                <li>Free-to-play, browser-based jetpack adventure</li>
            </ul>
    
            <h2 id="faq" class="section-title">Frequently Asked Questions (FAQ)</h2>
    
            <div class="faq-item">
                <h3 class="faq-q">How do I control the jetpack in Mars Jump?</h3>
                <div class="faq-content">
                    <p>Use the Left Arrow or A for the left thruster, Right Arrow or D for the right thruster, 
                    and both together to slow descent. Balance thrusts carefully to land safely.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">What happens if I crash?</h3>
                <div class="faq-content">
                    <p>If you land too hard or at a bad angle, you’ll crash. Don’t worry — you’ll instantly respawn at your last checkpoint.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">Is fuel limited?</h3>
                <div class="faq-content">
                    <p>Yes. Each thrust consumes fuel. Short, controlled bursts are more efficient than long presses.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">Can I unlock new characters?</h3>
                <div class="faq-content">
                    <p>Yes! You can unlock over 50 unique astronaut characters with different designs as you progress through the game.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">Do I need to download Mars Jump?</h3>
                <div class="faq-content">
                    <p>No download is required. You can play instantly in your browser on both desktop and mobile devices.</p>
                </div>
            </div>
    
            <div class="faq-item">
                <h3 class="faq-q">Is Mars Jump free to play?</h3>
                <div class="faq-content">
                    <p>Yes, Mars Jump is completely free to play online.</p>
                </div>
            </div>
    
            <p>Mars Jump delivers a unique jetpack adventure filled with challenges, rewards, and endless fun. 
            Test your precision, manage your fuel, and see how far you can go on the red planet!</p>
        `
    }
    
    
    
    
    
]
