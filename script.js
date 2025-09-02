// Study Guide Application
class StudyGuide {
    constructor() {
        this.currentSection = 'part-a';
        this.modal = document.getElementById('session-modal');
        this.init();
        this.loadSessionContent();
    }

    init() {
        this.bindEvents();
        this.loadSection(this.currentSection);
    }

    bindEvents() {
        // Main navigation between Part A and Part B
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.navigateToSection(section);
            });
        });

        // Session card clicks to open modal
        document.querySelectorAll('.session-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const session = e.currentTarget.dataset.session;
                this.openSessionModal(session);
            });
        });

        // Modal close functionality
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Session card clicks to open modal
        document.querySelectorAll('.session-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const session = e.currentTarget.dataset.session;
                this.openSessionModal(session);
            });
        });

        // Modal close functionality
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    navigateToSection(sectionId) {
        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        this.currentSection = sectionId;
    }

    loadSection(sectionId) {
        this.navigateToSection(sectionId);
    }

    openSessionModal(sessionId) {
        const content = this.getSessionContent(sessionId);
        
        document.getElementById('modal-title').textContent = content.title;
        document.getElementById('modal-content-area').innerHTML = content.html;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Re-render MathJax for modal content
        if (window.MathJax) {
            MathJax.typesetPromise([document.getElementById('modal-content-area')]);
        }
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    getSessionContent(sessionId) {
        return this.sessionContent[sessionId] || {
            title: `Session ${sessionId}`,
            html: '<p>Content not yet loaded for this session.</p>'
        };
    }

    openSessionModal(sessionId) {
        const content = this.getSessionContent(sessionId);
        
        document.getElementById('modal-title').textContent = content.title;
        document.getElementById('modal-content-area').innerHTML = content.html;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        // Re-render MathJax for modal content
        if (window.MathJax) {
            MathJax.typesetPromise([document.getElementById('modal-content-area')]);
        }
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    getSessionContent(sessionId) {
        return this.sessionContent[sessionId] || {
            title: `Session ${sessionId}`,
            html: '<p>Content not yet loaded for this session.</p>'
        };
    }

    loadSessionContent() {
        this.sessionContent = {
            '1': {
                title: 'Session 1: Introduction to Derivatives',
                html: `
                    <h3>Definition of the Derivative</h3>
                    <p>The derivative of a function $f(x)$ at a point $x_0$ is defined as:</p>
                    <div class="math-display">$$f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$$</div>
                    
                    <h3>Video Example: $f(x) = \\frac{1}{1+x^2}$</h3>
                    <p>Complete worked example from MIT recitation:</p>
                    <h4>Step 1: Set up the difference quotient</h4>
                    <div class="math-display">$$f'(x) = \\lim_{\\Delta x \\to 0} \\frac{\\frac{1}{1+(x+\\Delta x)^2} - \\frac{1}{1+x^2}}{\\Delta x}$$</div>
                    
                    <h4>Step 2: Find common denominator and simplify</h4>
                    <div class="math-display">$$= \\lim_{\\Delta x \\to 0} \\frac{(1+x^2) - (1+(x+\\Delta x)^2)}{\\Delta x \\cdot (1+(x+\\Delta x)^2)(1+x^2)}$$</div>
                    
                    <h4>Step 3: Expand and cancel terms</h4>
                    <div class="math-display">$$= \\lim_{\\Delta x \\to 0} \\frac{-2x\\Delta x - (\\Delta x)^2}{\\Delta x \\cdot (1+(x+\\Delta x)^2)(1+x^2)}$$</div>
                    
                    <h4>Step 4: Factor and take limit</h4>
                    <div class="math-display">$$= \\lim_{\\Delta x \\to 0} \\frac{-2x - \\Delta x}{(1+(x+\\Delta x)^2)(1+x^2)} = \\frac{-2x}{(1+x^2)^2}$$</div>
                    
                    <h3>Exercise 1: Secants and Tangents</h3>
                    <p><strong>Interactive Problem:</strong> Using $f(x) = 0.5x^3 - x$, investigate how secant slopes approach tangent slopes:</p>
                    <ul>
                        <li>At $x = -0.75$: Find $\\frac{\\Delta y}{\\Delta x}$ for $\\Delta x = -0.5, -0.25, 0.25, 0.5$</li>
                        <li>At $x = 0$: Compare secant and tangent slopes</li>
                        <li>At $x = 0.75$: Observe convergence behavior</li>
                        <li>Find $\\Delta x$ values where $\\frac{\\Delta y}{\\Delta x}$ is within 0.1 of tangent slope</li>
                    </ul>
                    
                    <h3>Problem Set 1, Section 1C: Slope and Derivative</h3>
                    <ul>
                        <li><strong>1C-1a:</strong> Rate of change of disk area = circumference: $\\frac{d}{dr}[\\pi r^2] = 2\\pi r$</li>
                        <li><strong>1C-1b:</strong> Rate of change of ball volume = surface area: $\\frac{d}{dr}[\\frac{4\\pi}{3}r^3] = 4\\pi r^2$</li>
                        <li><strong>1C-3:</strong> Derivatives from definition:
                            <ul>
                                <li>$f(x) = \\frac{1}{2x+1} \\Rightarrow f'(x) = \\frac{-2}{(2x+1)^2}$</li>
                                <li>$f(x) = 2x^2 + 5x + 4 \\Rightarrow f'(x) = 4x + 5$</li>
                                <li>$f(x) = \\frac{1}{x^2+1} \\Rightarrow f'(x) = \\frac{-2x}{(x^2+1)^2}$</li>
                            </ul>
                        </li>
                    </ul>
                `
            },
            '2': {
                title: 'Session 2: Examples of Derivatives',
                html: `
                    <h3>The Derivative of |x| (Exercise 2)</h3>
                    <p><strong>Problem:</strong> The slope of $f(x) = |x|$ changes abruptly at $x = 0$. Does this function have a derivative?</p>
                    <p><strong>Analysis:</strong></p>
                    <ul>
                        <li>For $x > 0$: $f(x) = x$, so $f'(x) = 1$</li>
                        <li>For $x < 0$: $f(x) = -x$, so $f'(x) = -1$</li>
                        <li>At $x = 0$: Left derivative = -1, Right derivative = +1</li>
                        <li><strong>Conclusion:</strong> No derivative at $x = 0$ because left ≠ right</li>
                    </ul>
                    
                    <h3>Lecture 1: Power Rule Development</h3>
                    <p><strong>General Power Rule:</strong> $\\frac{d}{dx}[x^n] = nx^{n-1}$</p>
                    <p><strong>Example Derivation for n = 2:</strong></p>
                    <div class="math-display">$$\\frac{d}{dx}[x^2] = \\lim_{\\Delta x \\to 0} \\frac{(x+\\Delta x)^2 - x^2}{\\Delta x} = \\lim_{\\Delta x \\to 0} \\frac{2x\\Delta x + (\\Delta x)^2}{\\Delta x} = 2x$$</div>
                    
                    <h3>Exercise 3: Rate of Change Applications</h3>
                    <p>Connections to real-world rate problems and velocity calculations.</p>
                    
                    <h3>Problem Set 1, Section 1E: Basic Derivatives</h3>
                    <ul>
                        <li><strong>1E-1:</strong> Polynomial derivatives: $x^{10} + 3x^5 + 2x^3 + 4$</li>
                        <li><strong>1E-2:</strong> Finding antiderivatives</li>
                        <li><strong>1E-3:</strong> Horizontal tangent lines for $y = x^3 + x^2 - x + 2$</li>
                    </ul>
                `
            },
            '3': {
                title: 'Session 3: Derivative as Rate of Change',
                html: `
                    <h3>Lecture 2: Physical Applications</h3>
                    <p><strong>Velocity as Derivative:</strong> If $s(t)$ is position, then $v(t) = s'(t) = \\frac{ds}{dt}$</p>
                    
                    <h3>Pumpkin Drop Example</h3>
                    <p><strong>Position function:</strong> $h(t) = 80 - 5t^2$ meters</p>
                    <ul>
                        <li><strong>Average speed (0 to 4s):</strong> $\\frac{h(4) - h(0)}{4} = \\frac{0 - 80}{4} = -20$ m/s</li>
                        <li><strong>Instantaneous speed at impact:</strong> $h'(4) = -10t|_{t=4} = -40$ m/s ≈ 90 mph</li>
                    </ul>
                    
                    <h3>Problem Set 1, Section 1B: Velocity and Rates</h3>
                    <p><strong>1B-1: Test Tube Drop (Green Building - 400 feet)</strong></p>
                    <ul>
                        <li>Height: $h(t) = 400 - 16t^2$ feet</li>
                        <li>Average speed first 2 seconds: -32 ft/sec</li>
                        <li>Average speed last 2 seconds: -128 ft/sec</li>
                        <li>Instantaneous speed at landing: -160 ft/sec</li>
                    </ul>
                    
                    <p><strong>1B-2: Tennis Ball Bounce</strong></p>
                    <ul>
                        <li>Height: $s = bt - 16t^2$</li>
                        <li>Velocity: $v = b - 32t$</li>
                        <li>Maximum height at $t = b/32$</li>
                        <li>Maximum height value: $b^2/64$</li>
                    </ul>
                    
                    <h3>Applications</h3>
                    <ul>
                        <li>Temperature gradients in weather prediction</li>
                        <li>GPS sensitivity analysis</li>
                        <li>Current as rate of charge flow</li>
                    </ul>
                `
            },
            '4': {
                title: 'Session 4: Limits and Continuity',
                html: `
                    <h3>Lecture 2: Limit Classification</h3>
                    <p><strong>Easy Limits:</strong> Direct substitution when function is continuous</p>
                    <p><strong>Hard Limits:</strong> Require algebraic manipulation (all derivatives are "hard limits")</p>
                    
                    <h3>Fundamental Limit Laws</h3>
                    <ul>
                        <li>$\\lim_{x \\to a} [f(x) + g(x)] = \\lim_{x \\to a} f(x) + \\lim_{x \\to a} g(x)$</li>
                        <li>$\\lim_{x \\to a} [f(x) \\cdot g(x)] = \\lim_{x \\to a} f(x) \\cdot \\lim_{x \\to a} g(x)$</li>
                        <li>$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{\\lim_{x \\to a} f(x)}{\\lim_{x \\to a} g(x)}$ (if denominator ≠ 0)</li>
                    </ul>
                    
                    <h3>Problem Set 1, Section 1D: Limits and Continuity</h3>
                    <p><strong>1D-1: Limit Calculations</strong></p>
                    <ul>
                        <li>$\\lim_{x \\to 0} \\frac{4x}{x-1} = -4$</li>
                        <li>$\\lim_{x \\to 2} \\frac{4x^2}{x+1} = \\frac{8}{3}$</li>
                        <li>$\\lim_{x \\to -2} \\frac{4x^2}{x+2}$ = undefined (both ±∞ possible)</li>
                        <li>$\\lim_{x \\to \\infty} \\frac{x^2 + 2x + 3}{3x^2 - 2x + 4} = \\frac{1}{3}$</li>
                    </ul>
                    
                    <p><strong>1D-2: One-sided Limits</strong></p>
                    <ul>
                        <li>$\\lim_{x \\to 0^+} \\sqrt{x} = 0$</li>
                        <li>$\\lim_{x \\to 1^+} \\frac{1}{x-1} = +\\infty$, $\\lim_{x \\to 1^-} \\frac{1}{x-1} = -\\infty$</li>
                        <li>$\\lim_{x \\to 0^+} \\frac{|x|}{x} = 1$, $\\lim_{x \\to 0^-} \\frac{|x|}{x} = -1$</li>
                    </ul>
                    
                    <p><strong>1D-5,6: Continuity and Differentiability</strong></p>
                    <p>Finding constants $a, b$ for piecewise functions to be continuous or differentiable</p>
                `
            },
            '5': {
                title: 'Session 5: Discontinuity',
                html: `
                    <h3>Types of Discontinuities</h3>
                    
                    <h4>1. Jump Discontinuities</h4>
                    <p>Left and right limits exist but are unequal</p>
                    <p><strong>Example:</strong> $f(x) = \\begin{cases} x+1 & \\text{if } x > 0 \\\\ -x+2 & \\text{if } x < 0 \\end{cases}$</p>
                    <ul>
                        <li>$\\lim_{x \\to 0^+} f(x) = 1$</li>
                        <li>$\\lim_{x \\to 0^-} f(x) = 2$</li>
                        <li>Jump discontinuity at $x = 0$</li>
                    </ul>
                    
                    <h4>2. Removable Discontinuities</h4>
                    <p>Limit exists but function undefined or has different value</p>
                    <p><strong>Example:</strong> $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ (removable at $x = 0$)</p>
                    
                    <h4>3. Infinite Discontinuities</h4>
                    <p>Function approaches ±∞</p>
                    <p><strong>Example:</strong> $f(x) = \\frac{1}{x}$ at $x = 0$</p>
                    
                    <h4>4. Oscillating Discontinuities</h4>
                    <p><strong>Example:</strong> $\\sin(\\frac{1}{x})$ as $x \\to 0$ oscillates infinitely</p>
                    
                    <h3>Problem Set 1, Section 1D: Discontinuity Problems</h3>
                    <p><strong>1D-3: Identify Discontinuity Types</strong></p>
                    <ul>
                        <li>$\\frac{x-2}{x^2-4}$: $x = 2$ removable, $x = -2$ infinite</li>
                        <li>$\\frac{\\sin x}{x^4}$: $x = 0, ±\\pi, ±2\\pi, ...$ infinite</li>
                        <li>Piecewise functions with jump discontinuities</li>
                    </ul>
                    
                    <p><strong>1D-8,9: Continuous but Not Differentiable</strong></p>
                    <p>Finding constants where functions are continuous but have corners (not differentiable)</p>
                `
            },
            '6': {
                title: 'Session 6: Calculating Derivatives',
                html: `
                    <h3>Basic Differentiation Rules</h3>
                    
                    <h4>Power Rule</h4>
                    <div class="math-display">$$\\frac{d}{dx}[x^n] = nx^{n-1}$$</div>
                    
                    <h4>Constant Multiple Rule</h4>
                    <div class="math-display">$$\\frac{d}{dx}[cf(x)] = c\\frac{d}{dx}[f(x)]$$</div>
                    
                    <h4>Sum Rule</h4>
                    <div class="math-display">$$\\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)$$</div>
                    
                    <h3>Problem Set 1, Section 1E: Differentiation Formulas</h3>
                    <p><strong>1E-1: Polynomial Derivatives</strong></p>
                    <ul>
                        <li>$\\frac{d}{dx}[x^{10} + 3x^5 + 2x^3 + 4] = 10x^9 + 15x^4 + 6x^2$</li>
                        <li>$\\frac{d}{dx}[e^2 + 1] = 0$ (constant)</li>
                        <li>$\\frac{d}{dx}[\\frac{x}{2} + \\pi^3] = \\frac{1}{2}$</li>
                    </ul>
                    
                    <p><strong>1E-2: Antiderivatives</strong></p>
                    <ul>
                        <li>$\\int (ax + b) dx = \\frac{ax^2}{2} + bx + c$</li>
                        <li>$\\int (x^6 + 5x^5 + 4x^3) dx = \\frac{x^7}{7} + \\frac{5x^6}{6} + x^4 + c$</li>
                    </ul>
                    
                    <p><strong>1E-3: Finding Horizontal Tangents</strong></p>
                    <p>For $y = x^3 + x^2 - x + 2$:</p>
                    <ul>
                        <li>$y' = 3x^2 + 2x - 1 = 0$</li>
                        <li>$(3x - 1)(x + 1) = 0$</li>
                        <li>Horizontal tangents at $x = \\frac{1}{3}$ and $x = -1$</li>
                    </ul>
                    
                    <p><strong>1E-5: Rational Function Derivatives</strong></p>
                    <ul>
                        <li>$\\frac{d}{dx}\\left[\\frac{x}{x+a}\\right] = \\frac{1}{(1+x)^2}$</li>
                        <li>$\\frac{d}{dx}\\left[\\frac{x+a}{1+x}\\right] = \\frac{1-2ax-x^2}{(x^2+1)^2}$</li>
                    </ul>
                `
            },
            '7': {
                title: 'Session 7: Derivatives of Sine and Cosine',
                html: `
                    <h3>Fundamental Trigonometric Derivatives</h3>
                    <div class="math-display">$$\\frac{d}{dx}[\\sin x] = \\cos x$$</div>
                    <div class="math-display">$$\\frac{d}{dx}[\\cos x] = -\\sin x$$</div>
                    
                    <h3>Video Example: $h(x) = \\sin x + \\sqrt{3}\\cos x$</h3>
                    <p><strong>Problem:</strong> Find where $h'(x) = 0$</p>
                    <h4>Solution:</h4>
                    <ul>
                        <li>$h'(x) = \\cos x - \\sqrt{3}\\sin x$</li>
                        <li>Set equal to zero: $\\cos x = \\sqrt{3}\\sin x$</li>
                        <li>Divide by $\\cos x$: $\\tan x = \\frac{1}{\\sqrt{3}}$</li>
                        <li>Solution: $x = \\frac{\\pi}{6} + n\\pi$ for integer $n$</li>
                    </ul>
                    
                    <h4>Alternative Method: Sum-to-Product Formula</h4>
                    <p>Rewrite as $h(x) = 2\\sin(x + \\frac{\\pi}{3})$, then $h'(x) = 0$ when $\\sin(x + \\frac{\\pi}{3}) = 0$</p>
                    
                    <h3>Problem Set 1, Section 1J: Trigonometric Functions</h3>
                    <p><strong>1J-1: Various Trigonometric Derivatives</strong></p>
                    <ul>
                        <li>$\\frac{d}{dx}[\\sin(5x^2)] = 10x\\cos(5x^2)$</li>
                        <li>$\\frac{d}{dx}[\\sin^2(3x)] = 6\\sin(3x)\\cos(3x)$</li>
                        <li>$\\frac{d}{dx}[\\ln(\\cos(2x))] = -2\\tan(2x)$</li>
                        <li>$\\frac{d}{dx}[e^{2x}\\sin(10x)] = 2e^{2x}\\sin(10x) + 10e^{2x}\\cos(10x)$</li>
                    </ul>
                    
                    <p><strong>1J-3: Differential Equations with Trig Functions</strong></p>
                    <p>Find $k > 0$ such that $y = \\sin(kx)$ and $y = \\cos(kx)$ satisfy $y'' + ay = 0$</p>
                    <p><strong>Answer:</strong> $k = \\sqrt{a}$</p>
                `
            },
            '8': {
                title: 'Session 8: Limits of Sine and Cosine',
                html: `
                    <h3>Fundamental Trigonometric Limits</h3>
                    <div class="math-display">$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$</div>
                    <div class="math-display">$$\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0$$</div>
                    
                    <h3>Geometric Proof Strategy</h3>
                    <p><strong>Unit Circle Approach:</strong></p>
                    <ul>
                        <li>Area of triangle ≤ Area of sector ≤ Area of larger triangle</li>
                        <li>$\\frac{1}{2}\\cos x \\sin x ≤ \\frac{x}{2} ≤ \\frac{1}{2}\\tan x$</li>
                        <li>Squeeze theorem gives the fundamental limit</li>
                    </ul>
                    
                    <h3>Problem Set 1, Section 1J: Applications</h3>
                    <p><strong>1J-2: Related Limit</strong></p>
                    <p>Calculate $\\lim_{x \\to \\frac{\\pi}{2}} \\frac{\\cos x}{x - \\frac{\\pi}{2}}$ by relating to derivative</p>
                    <p><strong>Solution:</strong> This equals $\\frac{d}{dx}[\\cos x]|_{x=\\pi/2} = -\\sin(\\pi/2) = -1$</p>
                    
                    <p><strong>1J-4: Geometric Applications</strong></p>
                    <ul>
                        <li>Chord length in unit circle: $2\\sin(\\theta/2)$</li>
                        <li>Perimeter of n-gon: $n \\cdot 2\\sin(\\frac{2\\pi}{n})$</li>
                        <li>As $n \\to \\infty$: perimeter approaches $2\\pi$ (circumference)</li>
                    </ul>
                    
                    <h3>Connection to Derivatives</h3>
                    <p>These limits are essential for proving:</p>
                    <ul>
                        <li>$\\frac{d}{dx}[\\sin x] = \\cos x$</li>
                        <li>$\\frac{d}{dx}[\\cos x] = -\\sin x$</li>
                    </ul>
                `
            },
            '9': {
                title: 'Session 9: Product Rule',
                html: `
                    <h3>Product Rule Formula</h3>
                    <div class="math-display">$$\\frac{d}{dx}[u(x)v(x)] = u'(x)v(x) + u(x)v'(x)$$</div>
                    <p><strong>Memory device:</strong> "First times derivative of second, plus second times derivative of first"</p>
                    
                    <h3>Lecture 4: Product Rule Proof</h3>
                    <p><strong>Key insight:</strong> Add and subtract the same term in the difference quotient:</p>
                    <div class="math-display">$$\\frac{u(x+h)v(x+h) - u(x)v(x)}{h}$$</div>
                    <p>Add and subtract $u(x+h)v(x)$:</p>
                    <div class="math-display">$$= \\frac{u(x+h)[v(x+h) - v(x)]}{h} + \\frac{v(x)[u(x+h) - u(x)]}{h}$$</div>
                    <p>Taking the limit gives the product rule.</p>
                    
                    <h3>Problem Set Examples</h3>
                    <p><strong>1E-1d:</strong> $(x^3 + x)(x^5 + x^2)$</p>
                    <ul>
                        <li>Using product rule: $(3x^2 + 1)(x^5 + x^2) + (x^3 + x)(5x^4 + 2x)$</li>
                        <li>Simplified: $8x^7 + 6x^5 + 5x^4 + 3x^2$</li>
                        <li>Alternative: Expand first, then differentiate</li>
                    </ul>
                    
                    <p><strong>1F-2:</strong> $x^{10}(x^2 + 1)^{10}$</p>
                    <p>Using product rule and chain rule: $10x^9(x^2 + 1)^{10} + x^{10} \\cdot 10(x^2 + 1)^9 \\cdot 2x$</p>
                    <p>Factored: $10x^9(x^2 + 1)^9(3x^2 + 1)$</p>
                    
                    <h3>Advanced Applications</h3>
                    <ul>
                        <li>Products involving exponential functions</li>
                        <li>Products of trigonometric functions</li>
                        <li>Leibniz formula for higher derivatives of products</li>
                    </ul>
                `
            },
            '10': {
                title: 'Session 10: Quotient Rule',
                html: `
                    <h3>Quotient Rule Formula</h3>
                    <div class="math-display">$$\\frac{d}{dx}\\left[\\frac{u(x)}{v(x)}\\right] = \\frac{u'(x)v(x) - u(x)v'(x)}{[v(x)]^2}$$</div>
                    <p><strong>Memory device:</strong> "Bottom times derivative of top, minus top times derivative of bottom, all over bottom squared"</p>
                    
                    <h3>Problem Set 1, Section 1E-5: Rational Functions</h3>
                    
                    <p><strong>Example 1:</strong> $f(x) = \\frac{x}{x+a}$ (where $a$ is constant)</p>
                    <ul>
                        <li>$u = x$, $u' = 1$</li>
                        <li>$v = x + a$, $v' = 1$</li>
                        <li>$f'(x) = \\frac{1 \\cdot (x+a) - x \\cdot 1}{(x+a)^2} = \\frac{a}{(x+a)^2}$</li>
                    </ul>
                    
                    <p><strong>Example 2:</strong> $f(x) = \\frac{x+a}{1+x}$</p>
                    <p>Solution: $f'(x) = \\frac{1-2ax-x^2}{(x^2+1)^2}$</p>
                    
                    <p><strong>Example 3:</strong> $f(x) = \\frac{x+2}{x^2-1}$</p>
                    <p>Solution: $f'(x) = \\frac{-x^2-4x-1}{(x^2-1)^2}$</p>
                    
                    <p><strong>Example 4:</strong> $f(x) = \\frac{x^4+1}{x}$</p>
                    <p>Solution: $f'(x) = 3x^2 - \\frac{1}{x^2}$</p>
                    
                    <h3>Alternative Approaches</h3>
                    <ul>
                        <li><strong>Rewrite then differentiate:</strong> $\\frac{x^4+1}{x} = x^3 + x^{-1}$</li>
                        <li><strong>Product rule method:</strong> $\\frac{u}{v} = u \\cdot v^{-1}$, then use product rule</li>
                    </ul>
                    
                    <h3>Common Mistakes to Avoid</h3>
                    <ul>
                        <li>Don't forget the negative sign in the numerator</li>
                        <li>Square the entire denominator, not just parts</li>
                        <li>Simplify the final answer when possible</li>
                    </ul>
                `
            },
            '11': {
                title: 'Session 11: Chain Rule',
                html: `
                    <h3>Chain Rule Formula</h3>
                    <div class="math-display">$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$</div>
                    <p><strong>Leibniz notation:</strong> $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$</p>
                    
                    <h3>Video Example: $\\frac{d}{d\\theta}[\\cos^2(\\theta^4)]$</h3>
                    <p><strong>Multi-step chain rule application:</strong></p>
                    <h4>Step 1: Identify the composition</h4>
                    <ul>
                        <li>Outer function: $f(u) = u^2$</li>
                        <li>Middle function: $g(v) = \\cos(v)$</li>
                        <li>Inner function: $h(\\theta) = \\theta^4$</li>
                    </ul>
                    
                    <h4>Step 2: Apply chain rule repeatedly</h4>
                    <div class="math-display">$$\\frac{d}{d\\theta}[\\cos^2(\\theta^4)] = 2\\cos(\\theta^4) \\cdot (-\\sin(\\theta^4)) \\cdot 4\\theta^3$$</div>
                    <div class="math-display">$$= -8\\theta^3\\cos(\\theta^4)\\sin(\\theta^4)$$</div>
                    
                    <h3>Problem Set 1, Section 1F: Chain Rule Applications</h3>
                    
                    <p><strong>1F-1: Two Methods Comparison</strong></p>
                    <ul>
                        <li><strong>Method 1 (Expand first):</strong> $(x^2 + 2)^2 = x^4 + 4x^2 + 4$, then differentiate</li>
                        <li><strong>Method 2 (Chain rule):</strong> $2(x^2 + 2) \\cdot 2x = 4x(x^2 + 2)$</li>
                        <li>For $(x^2 + 2)^{100}$: Chain rule is much preferred!</li>
                    </ul>
                    
                    <p><strong>1F-7: Applications with Physical Variables</strong></p>
                    <ul>
                        <li>$D = \\sqrt{(x-a)^2 + y_0^2}$: $\\frac{dD}{dx} = \\frac{x-a}{\\sqrt{(x-a)^2 + y_0^2}}$</li>
                        <li>Relativistic mass: $m = \\frac{m_0}{\\sqrt{1-v^2/c^2}}$</li>
                        <li>Gravitational force: $F = \\frac{mg}{(1+r^2)^{3/2}}$</li>
                    </ul>
                    
                    <h3>Advanced Chain Rule</h3>
                    <p><strong>Multiple compositions:</strong> When $y = f(g(h(x)))$</p>
                    <div class="math-display">$$\\frac{dy}{dx} = f'(g(h(x))) \\cdot g'(h(x)) \\cdot h'(x)$$</div>
                `
            },
            '12': {
                title: 'Session 12: Higher Derivatives',
                html: `
                    <h3>Higher Derivative Notation</h3>
                    <ul>
                        <li><strong>Second derivative:</strong> $f''(x)$, $\\frac{d^2f}{dx^2}$, $\\frac{d^2y}{dx^2}$</li>
                        <li><strong>Third derivative:</strong> $f'''(x)$, $\\frac{d^3f}{dx^3}$</li>
                        <li><strong>nth derivative:</strong> $f^{(n)}(x)$, $\\frac{d^nf}{dx^n}$</li>
                    </ul>
                    
                    <h3>Problem Set 1, Section 1G: Higher Derivatives</h3>
                    
                    <p><strong>1G-1: Calculate $y''$ for various functions</strong></p>
                    <ul>
                        <li>$y = 3x^2 + 2x + 4\\sqrt{x}$: $y'' = 6 - x^{-3/2}$</li>
                        <li>$y = \\frac{x}{x+5}$: $y'' = \\frac{-10}{(x+5)^3}$</li>
                        <li>$y = \\frac{x^2+5x}{x+5}$: $y'' = \\frac{-10}{(x+5)^3}$</li>
                    </ul>
                    
                    <p><strong>1G-2: Functions with Zero Third Derivative</strong></p>
                    <p>If $f'''(x) ≡ 0$, then:</p>
                    <ul>
                        <li>$f''(x) = c_0$ (constant)</li>
                        <li>$f'(x) = c_0x + c_1$</li>
                        <li>$f(x) = \\frac{c_0x^2}{2} + c_1x + c_2$</li>
                        <li><strong>Answer:</strong> All quadratic polynomials</li>
                    </ul>
                    
                    <p><strong>1G-3: Implicit Higher Derivatives</strong></p>
                    <p>For $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ (ellipse):</p>
                    <ul>
                        <li>First derivative: $y' = -\\frac{b^2x}{a^2y}$</li>
                        <li>Second derivative: $y'' = -\\frac{b^4}{a^2y^3}$</li>
                    </ul>
                    
                    <p><strong>1G-4: Formula for nth Derivative</strong></p>
                    <p>For $y = \\frac{1}{x+1}$:</p>
                    <div class="math-display">$$y^{(n)} = \\frac{(-1)^n \\cdot n!}{(x+1)^{n+1}}$$</div>
                    
                    <h3>Leibniz Formula for Products</h3>
                    <p>For $y = u(x)v(x)$:</p>
                    <div class="math-display">$$y^{(n)} = \\sum_{k=0}^{n} \\binom{n}{k} u^{(k)}v^{(n-k)}$$</div>
                    <p>This generalizes the product rule to higher derivatives.</p>
                `
            },
            'ps1': {
                title: 'Problem Set 1',
                html: `
                    <h3>Comprehensive Problem Set Covering Sessions 1-12</h3>
                    
                    <h3>Section 1A: Graphing</h3>
                    <ul>
                        <li><strong>1A-1,2:</strong> Completing the square, translations, scaling</li>
                        <li><strong>1A-3:</strong> Even/odd function identification</li>
                        <li><strong>1A-4:</strong> Decomposing functions into even and odd parts</li>
                        <li><strong>1A-5:</strong> Finding inverse functions and graphing</li>
                        <li><strong>1A-6:</strong> Trigonometric form: $A\\sin(x + c)$</li>
                        <li><strong>1A-7:</strong> Period, amplitude, phase angle analysis</li>
                    </ul>
                    
                    <h3>Section 1B: Velocity and Rates of Change</h3>
                    <ul>
                        <li><strong>1B-1:</strong> Test tube drop from 400 ft (Green building)</li>
                        <li><strong>1B-2:</strong> Tennis ball bounce physics with detailed analysis</li>
                    </ul>
                    
                    <h3>Section 1C: Slope and Derivative</h3>
                    <ul>
                        <li><strong>1C-1:</strong> Geometric rates (disk area → circumference, ball volume → surface area)</li>
                        <li><strong>1C-2:</strong> Special derivative: $f(x) = (x-a)g(x)$ gives $f'(a) = g(a)$</li>
                        <li><strong>1C-3:</strong> Derivatives from definition (4 different functions)</li>
                        <li><strong>1C-4:</strong> Tangent line equations</li>
                        <li><strong>1C-5:</strong> All tangent lines through origin to $y = 1 + (x-1)^2$</li>
                    </ul>
                    
                    <h3>Section 1D: Limits and Continuity</h3>
                    <ul>
                        <li><strong>1D-1:</strong> 10 different limit calculations including ∞ cases</li>
                        <li><strong>1D-2:</strong> One-sided limits</li>
                        <li><strong>1D-3:</strong> Discontinuity type identification</li>
                        <li><strong>1D-5,6:</strong> Finding constants for continuity/differentiability</li>
                    </ul>
                    
                    <h3>Section 1E: Differentiation Formulas</h3>
                    <ul>
                        <li><strong>1E-1:</strong> Polynomial derivatives</li>
                        <li><strong>1E-2:</strong> Antiderivatives</li>
                        <li><strong>1E-3:</strong> Horizontal tangent analysis</li>
                        <li><strong>1E-5:</strong> Rational function derivatives</li>
                    </ul>
                    
                    <h3>Section 1F: Chain Rule, Implicit Differentiation</h3>
                    <ul>
                        <li><strong>1F-1:</strong> $(x^2 + 2)^{100}$ - demonstrating chain rule efficiency</li>
                        <li><strong>1F-3:</strong> $y = x^{1/n}$ by implicit differentiation</li>
                        <li><strong>1F-4:</strong> $x^{1/3} + y^{1/3} = 1$ - implicit vs explicit methods</li>
                        <li><strong>1F-5:</strong> $\\sin x + \\sin y = 1/2$ - horizontal tangents</li>
                        <li><strong>1F-6:</strong> Even functions have odd derivatives (proof)</li>
                    </ul>
                    
                    <h3>Section 1G: Higher Derivatives</h3>
                    <ul>
                        <li><strong>1G-1:</strong> Second derivatives of various functions</li>
                        <li><strong>1G-3:</strong> Implicit second derivatives for ellipse</li>
                        <li><strong>1G-4:</strong> nth derivative formula for $\\frac{1}{x+1}$</li>
                        <li><strong>1G-5:</strong> Leibniz formula for product derivatives</li>
                    </ul>
                    
                    <h3>Section 1H: Exponentials and Logarithms (Algebra)</h3>
                    <ul>
                        <li><strong>1H-1:</strong> Radioactive decay and half-life: $\\lambda = \\frac{\\ln 2}{k}$</li>
                        <li><strong>1H-2:</strong> pH calculation: $pH_{diluted} = pH_{original} + \\log 2$</li>
                        <li><strong>1H-5:</strong> Hyperbolic functions: $\\cosh x = \\frac{e^x + e^{-x}}{2}$</li>
                        <li><strong>1H-8:</strong> Planetary motion and Kepler's laws</li>
                    </ul>
                    
                    <h3>Section 1I: Exponentials and Logarithms (Calculus)</h3>
                    <ul>
                        <li><strong>1I-1:</strong> Various exponential derivatives</li>
                        <li><strong>1I-3:</strong> Fundamental limit: $\\lim_{n \\to \\infty} n\\ln(1 + \\frac{1}{n}) = 1$</li>
                        <li><strong>1I-4:</strong> Compound interest applications</li>
                    </ul>
                    
                    <h3>Section 1J: Trigonometric Functions</h3>
                    <ul>
                        <li><strong>1J-1:</strong> Complex trigonometric derivatives</li>
                        <li><strong>1J-2:</strong> Limits related to derivatives</li>
                        <li><strong>1J-3:</strong> Differential equations with trigonometric solutions</li>
                        <li><strong>1J-4:</strong> Geometric applications (chord lengths, polygon perimeters)</li>
                    </ul>
                `
            },
            '13': {
                title: 'Session 13: Implicit Differentiation',
                html: `
                    <h3>Implicit Differentiation Technique</h3>
                    <p>When functions are defined implicitly, differentiate both sides with respect to $x$ and solve for $\\frac{dy}{dx}$.</p>
                    
                    <h3>Video Example: $y^3 + x^3 = 3xy$</h3>
                    <p><strong>Problem:</strong> Find slope of tangent line at $(4/3, 2/3)$</p>
                    
                    <h4>Step 1: Differentiate both sides</h4>
                    <div class="math-display">$$\\frac{d}{dx}[y^3 + x^3] = \\frac{d}{dx}[3xy]$$</div>
                    
                    <h4>Step 2: Apply chain rule and product rule</h4>
                    <div class="math-display">$$3y^2\\frac{dy}{dx} + 3x^2 = 3y + 3x\\frac{dy}{dx}$$</div>
                    
                    <h4>Step 3: Collect dy/dx terms</h4>
                    <div class="math-display">$$\\frac{dy}{dx}(3y^2 - 3x) = 3y - 3x^2$$</div>
                    
                    <h4>Step 4: Solve for dy/dx</h4>
                    <div class="math-display">$$\\frac{dy}{dx} = \\frac{y - x^2}{y^2 - x}$$</div>
                    
                    <h4>Step 5: Evaluate at (4/3, 2/3)</h4>
                    <div class="math-display">$$\\frac{dy}{dx} = \\frac{\\frac{2}{3} - (\\frac{4}{3})^2}{(\\frac{2}{3})^2 - \\frac{4}{3}} = \\frac{\\frac{6-16}{9}}{\\frac{4-12}{9}} = \\frac{-10}{-8} = \\frac{5}{4}$$</div>
                    
                    <h3>Problem Set Applications</h3>
                    <p><strong>1F-3:</strong> Find $\\frac{dy}{dx}$ for $y = x^{1/n}$ by implicit differentiation</p>
                    <ul>
                        <li>Start with $y^n = x$</li>
                        <li>Differentiate: $ny^{n-1}\\frac{dy}{dx} = 1$</li>
                        <li>Result: $\\frac{dy}{dx} = \\frac{1}{ny^{n-1}} = \\frac{1}{n}x^{\\frac{1-n}{n}}$</li>
                    </ul>
                    
                    <p><strong>1F-4:</strong> $x^{1/3} + y^{1/3} = 1$</p>
                    <p>Implicit method: $\\frac{dy}{dx} = -\\frac{x^{-2/3}}{y^{-2/3}} = -\\frac{y^{2/3}}{x^{2/3}}$</p>
                    
                    <p><strong>1F-5:</strong> $\\sin x + \\sin y = \\frac{1}{2}$ - horizontal tangents</p>
                    <ul>
                        <li>Differentiate: $\\cos x + \\cos y \\frac{dy}{dx} = 0$</li>
                        <li>Horizontal tangent: $\\frac{dy}{dx} = 0 \\Rightarrow \\cos x = 0$</li>
                        <li>Solutions: $x = \\frac{\\pi}{2} + k\\pi$, with corresponding $y$ values</li>
                    </ul>
                `
            },
            '14': {
                title: 'Session 14: Examples of Implicit Differentiation',
                html: `
                    <h3>Advanced Implicit Differentiation Examples</h3>
                    
                    <h4>Chain Rule in Implicit Differentiation</h4>
                    <p><strong>Example:</strong> Find $\\frac{dy}{dx}$ where $\\cos^2(\\theta^4) = 0$</p>
                    
                    <h4>Breaking Down the Composition</h4>
                    <p>Let $y = x^2$, $x = \\cos(w)$, $w = \\theta^4$</p>
                    <div class="math-display">$$\\frac{dy}{d\\theta} = \\frac{dy}{dx} \\cdot \\frac{dx}{dw} \\cdot \\frac{dw}{d\\theta}$$</div>
                    
                    <h4>Step-by-Step Computation</h4>
                    <ul>
                        <li>$\\frac{dy}{dx} = 2x = 2\\cos(\\theta^4)$</li>
                        <li>$\\frac{dx}{dw} = -\\sin(w) = -\\sin(\\theta^4)$</li>
                        <li>$\\frac{dw}{d\\theta} = 4\\theta^3$</li>
                    </ul>
                    
                    <h4>Final Result</h4>
                    <div class="math-display">$$\\frac{dy}{d\\theta} = -8\\theta^3 \\cos(\\theta^4) \\sin(\\theta^4)$$</div>
                    
                    <h4>Finding Critical Points</h4>
                    <p>Set derivative equal to zero:</p>
                    <ul>
                        <li>$\\theta = 0$ (obvious solution)</li>
                        <li>$\\cos(\\theta^4) = 0 \\Rightarrow \\theta^4 = \\frac{\\pi}{2} \\Rightarrow \\theta = \\sqrt[4]{\\frac{\\pi}{2}}$</li>
                    </ul>
                    
                    <h3>Multiple Variable Implicit Functions</h3>
                    <p><strong>Example:</strong> $x^2 + y^2 + z^2 = 1$ (sphere)</p>
                    <p>Find $\\frac{\\partial z}{\\partial x}$ implicitly:</p>
                    <div class="math-display">$$2x + 2z\\frac{\\partial z}{\\partial x} = 0 \\Rightarrow \\frac{\\partial z}{\\partial x} = -\\frac{x}{z}$$</div>
                    
                    <h3>Practice Problems</h3>
                    <p><strong>1.</strong> Find $\\frac{dy}{dx}$ for $x^3 + y^3 = 6xy$</p>
                    <p><strong>2.</strong> Find $\\frac{dy}{dx}$ for $\\sin(xy) = x + y$</p>
                    <p><strong>3.</strong> Find the equation of tangent line to $x^2 + xy + y^2 = 3$ at $(1,1)$</p>
                `
            },
            '15': {
                title: 'Session 15: Introduction to Related Rates',
                html: `
                    <h3>Related Rates Fundamentals</h3>
                    
                    <h4>What are Related Rates?</h4>
                    <p>When two or more quantities are related by an equation, their rates of change are also related</p>
                    <p>Key insight: If variables are related, their derivatives are related</p>
                    
                    <h4>General Strategy</h4>
                    <ol>
                        <li>Identify all variables and their relationships</li>
                        <li>Write an equation relating the variables</li>
                        <li>Differentiate both sides with respect to time (t)</li>
                        <li>Substitute known values and rates</li>
                        <li>Solve for the unknown rate</li>
                    </ol>
                    
                    <h3>Classic Example: Expanding Circle</h3>
                    <p><strong>Problem:</strong> A circular oil spill is expanding. When radius = 50m, area increases at 100 m²/min. Find rate of radius change.</p>
                    
                    <h4>Setup</h4>
                    <p>Given: $r = 50$ m, $\\frac{dA}{dt} = 100$ m²/min</p>
                    <p>Find: $\\frac{dr}{dt}$</p>
                    
                    <h4>Relationship</h4>
                    <div class="math-display">$$A = \\pi r^2$$</div>
                    
                    <h4>Differentiate with respect to time</h4>
                    <div class="math-display">$$\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}$$</div>
                    
                    <h4>Substitute and Solve</h4>
                    <div class="math-display">$$100 = 2\\pi(50)\\frac{dr}{dt} = 100\\pi\\frac{dr}{dt}$$</div>
                    <div class="math-display">$$\\frac{dr}{dt} = \\frac{1}{\\pi} \\text{ m/min}$$</div>
                    
                    <h3>Key Concepts</h3>
                    <ul>
                        <li><strong>Time derivatives:</strong> All rates are with respect to time</li>
                        <li><strong>Chain rule:</strong> Essential for relating rates</li>
                        <li><strong>Implicit differentiation:</strong> Often needed for complex relationships</li>
                        <li><strong>Units:</strong> Always check units in final answer</li>
                    </ul>
                    
                    <h3>Common Scenarios</h3>
                    <ul>
                        <li>Geometric shapes changing size</li>
                        <li>Moving objects and shadows</li>
                        <li>Fluid flow problems</li>
                        <li>Economic applications</li>
                    </ul>
                `
            },
            '16': {
                title: 'Session 16: Related Rates',
                html: `
                    <h3>Advanced Related Rates Problems</h3>
                    
                    <h4>Ladder Problem (Classic)</h4>
                    <p><strong>Setup:</strong> 25-foot ladder against wall. Bottom slides away at 3 ft/sec. How fast does top fall when bottom is 15 ft from wall?</p>
                    
                    <h4>Variables and Relationships</h4>
                    <p>Let $x$ = distance from wall to bottom, $y$ = height of top</p>
                    <div class="math-display">$$x^2 + y^2 = 25^2 = 625$$</div>
                    <p>Given: $\\frac{dx}{dt} = 3$ ft/sec, $x = 15$ ft</p>
                    <p>Find: $\\frac{dy}{dt}$ when $x = 15$</p>
                    
                    <h4>Solution</h4>
                    <p>Differentiate: $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$</p>
                    <p>When $x = 15$: $y = \\sqrt{625 - 225} = \\sqrt{400} = 20$</p>
                    <div class="math-display">$$2(15)(3) + 2(20)\\frac{dy}{dt} = 0$$</div>
                    <div class="math-display">$$90 + 40\\frac{dy}{dt} = 0 \\Rightarrow \\frac{dy}{dt} = -\\frac{9}{4} \\text{ ft/sec}$$</div>
                    
                    <h3>Water Tank Problem</h3>
                    <p><strong>Problem:</strong> Conical tank (vertex down) with radius 3m, height 5m. Water flows in at 2 m³/min. How fast does water level rise when depth is 4m?</p>
                    
                    <h4>Setup</h4>
                    <p>Volume of cone: $V = \\frac{1}{3}\\pi r^2 h$</p>
                    <p>Tank proportions: $\\frac{r}{h} = \\frac{3}{5} \\Rightarrow r = \\frac{3h}{5}$</p>
                    
                    <h4>Substitute Relationship</h4>
                    <div class="math-display">$$V = \\frac{1}{3}\\pi \\left(\\frac{3h}{5}\\right)^2 h = \\frac{3\\pi h^3}{25}$$</div>
                    
                    <h4>Differentiate and Solve</h4>
                    <div class="math-display">$$\\frac{dV}{dt} = \\frac{9\\pi h^2}{25}\\frac{dh}{dt}$$</div>
                    <p>When $h = 4$ and $\\frac{dV}{dt} = 2$:</p>
                    <div class="math-display">$$2 = \\frac{9\\pi(16)}{25}\\frac{dh}{dt} = \\frac{144\\pi}{25}\\frac{dh}{dt}$$</div>
                    <div class="math-display">$$\\frac{dh}{dt} = \\frac{50}{144\\pi} = \\frac{25}{72\\pi} \\text{ m/min}$$</div>
                    
                    <h3>Balloon Problem</h3>
                    <p><strong>Problem:</strong> Spherical balloon inflated at 100 cm³/sec. How fast does radius increase when radius is 5 cm?</p>
                    
                    <h4>Solution</h4>
                    <p>$V = \\frac{4}{3}\\pi r^3$</p>
                    <p>$\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}$</p>
                    <p>When $r = 5$ and $\\frac{dV}{dt} = 100$:</p>
                    <div class="math-display">$$100 = 4\\pi(25)\\frac{dr}{dt} = 100\\pi\\frac{dr}{dt}$$</div>
                    <div class="math-display">$$\\frac{dr}{dt} = \\frac{1}{\\pi} \\text{ cm/sec}$$</div>
                `
            },
            '17': {
                title: 'Session 17: Introduction to Inverse Functions',
                html: `
                    <h3>Inverse Function Fundamentals</h3>
                    
                    <h4>Definition</h4>
                    <p>Functions $f$ and $g$ are inverses if:</p>
                    <ul>
                        <li>$f(g(x)) = x$ for all $x$ in domain of $g$</li>
                        <li>$g(f(x)) = x$ for all $x$ in domain of $f$</li>
                    </ul>
                    
                    <h4>Notation</h4>
                    <p>If $g$ is the inverse of $f$, write $g = f^{-1}$</p>
                    <p><strong>Note:</strong> $f^{-1}(x) \\neq \\frac{1}{f(x)}$</p>
                    
                    <h4>Graphical Relationship</h4>
                    <p>Graphs of $f$ and $f^{-1}$ are reflections across line $y = x$</p>
                    
                    <h3>Finding Inverse Functions</h3>
                    <h4>Algebraic Method</h4>
                    <ol>
                        <li>Start with $y = f(x)$</li>
                        <li>Solve for $x$ in terms of $y$</li>
                        <li>Swap $x$ and $y$</li>
                        <li>Result is $y = f^{-1}(x)$</li>
                    </ol>
                    
                    <h4>Example: $f(x) = 2x + 3$</h4>
                    <ol>
                        <li>$y = 2x + 3$</li>
                        <li>$x = \\frac{y-3}{2}$</li>
                        <li>$y = \\frac{x-3}{2}$</li>
                        <li>$f^{-1}(x) = \\frac{x-3}{2}$</li>
                    </ol>
                    
                    <h3>One-to-One Functions</h3>
                    <h4>Horizontal Line Test</h4>
                    <p>A function has an inverse if and only if it passes the horizontal line test</p>
                    <p>Each horizontal line intersects the graph at most once</p>
                    
                    <h4>Restricting Domain</h4>
                    <p>For functions that fail horizontal line test:</p>
                    <ul>
                        <li>Restrict domain to make function one-to-one</li>
                        <li>Example: $\\sin x$ restricted to $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ gives $\\arcsin x$</li>
                        <li>Example: $\\cos x$ restricted to $[0, \\pi]$ gives $\\arccos x$</li>
                    </ul>
                    
                    <h3>Properties of Inverse Functions</h3>
                    <ul>
                        <li>Domain of $f^{-1}$ = Range of $f$</li>
                        <li>Range of $f^{-1}$ = Domain of $f$</li>
                        <li>$(f^{-1})^{-1} = f$</li>
                        <li>$f^{-1}$ is increasing if $f$ is increasing</li>
                    </ul>
                `
            },
            '18': {
                title: 'Session 18: Derivatives of Inverse Functions',
                html: `
                    <h3>General Formula for Derivatives of Inverse Functions</h3>
                    
                    <h4>Inverse Function Derivative Theorem</h4>
                    <p>If $f$ is differentiable and one-to-one, then:</p>
                    <div class="math-display">$$(f^{-1})'(x) = \\frac{1}{f'(f^{-1}(x))}$$</div>
                    
                    <h4>Alternative Form</h4>
                    <p>If $y = f^{-1}(x)$, then $x = f(y)$ and:</p>
                    <div class="math-display">$$\\frac{dy}{dx} = \\frac{1}{\\frac{dx}{dy}}$$</div>
                    
                    <h3>Derivation Using Implicit Differentiation</h3>
                    <p>Given: $y = f^{-1}(x)$, so $x = f(y)$</p>
                    <p>Differentiate both sides with respect to $x$:</p>
                    <div class="math-display">$$1 = f'(y)\\frac{dy}{dx}$$</div>
                    <div class="math-display">$$\\frac{dy}{dx} = \\frac{1}{f'(y)}$$</div>
                    
                    <h3>Example: Derivative of $\\arccos x$</h3>
                    <p>Let $y = \\arccos x$, then $\\cos y = x$</p>
                    <p>Differentiate: $-\\sin y \\frac{dy}{dx} = 1$</p>
                    <div class="math-display">$$\\frac{dy}{dx} = -\\frac{1}{\\sin y}$$</div>
                    
                    <h4>Express in terms of x</h4>
                    <p>From right triangle: if $\\cos y = x$, then $\\sin y = \\sqrt{1-x^2}$</p>
                    <div class="math-display">$$\\frac{d}{dx}[\\arccos x] = -\\frac{1}{\\sqrt{1-x^2}}$$</div>
                    
                    <h3>MIT Video Analysis</h3>
                    <p>Domain: $[-1, 1] \\to [0, \\pi]$</p>
                    <p>The arccosine function:</p>
                    <ul>
                        <li>Decreasing function (negative derivative)</li>
                        <li>Domain: $x \\in [-1, 1]$</li>
                        <li>Range: $y \\in [0, \\pi]$</li>
                        <li>At $x = -1$: $y = \\pi$</li>
                        <li>At $x = 1$: $y = 0$</li>
                    </ul>
                    
                    <h3>Key Derivative Formulas</h3>
                    <div class="math-display">$$\\frac{d}{dx}[\\arcsin x] = \\frac{1}{\\sqrt{1-x^2}}$$</div>
                    <div class="math-display">$$\\frac{d}{dx}[\\arccos x] = -\\frac{1}{\\sqrt{1-x^2}}$$</div>
                    <div class="math-display">$$\\frac{d}{dx}[\\arctan x] = \\frac{1}{1+x^2}$$</div>
                `
            },
            '19': {
                title: 'Session 19: Derivatives of Inverse Trig Functions',
                html: `
                    <h3>Complete Derivation of Inverse Trig Derivatives</h3>
                    
                    <h4>Arcsine Derivative</h4>
                    <p>Let $y = \\arcsin x$, then $\\sin y = x$</p>
                    <p>Differentiate: $\\cos y \\frac{dy}{dx} = 1$</p>
                    <p>Since $\\cos y = \\sqrt{1-\\sin^2 y} = \\sqrt{1-x^2}$:</p>
                    <div class="math-display">$$\\frac{d}{dx}[\\arcsin x] = \\frac{1}{\\sqrt{1-x^2}}$$</div>
                    
                    <h4>Arccosine Derivative (MIT Video)</h4>
                    <p>Let $y = \\arccos x$, then $\\cos y = x$</p>
                    <p>Differentiate: $-\\sin y \\frac{dy}{dx} = 1$</p>
                    <p>From Pythagorean identity: $\\sin y = \\sqrt{1-x^2}$</p>
                    <div class="math-display">$$\\frac{d}{dx}[\\arccos x] = -\\frac{1}{\\sqrt{1-x^2}}$$</div>
                    
                    <h4>Arctangent Derivative</h4>
                    <p>Let $y = \\arctan x$, then $\\tan y = x$</p>
                    <p>Differentiate: $\\sec^2 y \\frac{dy}{dx} = 1$</p>
                    <p>Since $\\sec^2 y = 1 + \\tan^2 y = 1 + x^2$:</p>
                    <div class="math-display">$$\\frac{d}{dx}[\\arctan x] = \\frac{1}{1+x^2}$$</div>
                    
                    <h3>MIT Arctan Analysis</h3>
                    <p>From the graphing video transcript:</p>
                    <ul>
                        <li><strong>Domain:</strong> $(-\\infty, \\infty)$</li>
                        <li><strong>Range:</strong> $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$</li>
                        <li><strong>Horizontal asymptotes:</strong> $y = \\pm\\frac{\\pi}{2}$</li>
                        <li><strong>Key property:</strong> $\\arctan x < x$ for $x > 0$</li>
                        <li><strong>Intersection:</strong> Only meets $y = x$ at origin</li>
                        <li><strong>Tangent at origin:</strong> Both have slope 1</li>
                    </ul>
                    
                    <h3>Geometric Interpretation</h3>
                    <h4>Right Triangle Method</h4>
                    <p>For $\\arccos x$ where $0 < x < 1$:</p>
                    <ul>
                        <li>Adjacent side = $x$</li>
                        <li>Hypotenuse = $1$</li>
                        <li>Opposite side = $\\sqrt{1-x^2}$</li>
                        <li>Therefore: $\\sin(\\arccos x) = \\sqrt{1-x^2}$</li>
                    </ul>
                    
                    <h3>Applications</h3>
                    <h4>Integration Applications</h4>
                    <p>These derivatives are crucial for integration:</p>
                    <ul>
                        <li>$\\int \\frac{1}{\\sqrt{1-x^2}} dx = \\arcsin x + C$</li>
                        <li>$\\int \\frac{1}{1+x^2} dx = \\arctan x + C$</li>
                    </ul>
                    
                    <h4>Chain Rule Extensions</h4>
                    <p>For composite functions:</p>
                    <div class="math-display">$$\\frac{d}{dx}[\\arcsin(u)] = \\frac{1}{\\sqrt{1-u^2}} \\cdot \\frac{du}{dx}$$</div>
                `
            },
            '20': {
                title: 'Session 20: Derivatives of Other Inverse Trig Functions',
                html: `
                    <h3>Remaining Inverse Trigonometric Functions</h3>
                    
                    <h4>Arccotangent</h4>
                    <p>Let $y = \\text{arccot } x$, then $\\cot y = x$</p>
                    <p>Differentiate: $-\\csc^2 y \\frac{dy}{dx} = 1$</p>
                    <p>Since $\\csc^2 y = 1 + \\cot^2 y = 1 + x^2$:</p>
                    <div class="math-display">$$\\frac{d}{dx}[\\text{arccot } x] = -\\frac{1}{1+x^2}$$</div>
                    
                    <h4>Arcsecant</h4>
                    <p>Let $y = \\text{arcsec } x$, then $\\sec y = x$</p>
                    <p>Differentiate: $\\sec y \\tan y \\frac{dy}{dx} = 1$</p>
                    <p>From identities: $\\tan y = \\sqrt{x^2-1}$ (for $x > 1$)</p>
                    <div class="math-display">$$\\frac{d}{dx}[\\text{arcsec } x] = \\frac{1}{|x|\\sqrt{x^2-1}}$$</div>
                    
                    <h4>Arccosecant</h4>
                    <p>Let $y = \\text{arccsc } x$, then $\\csc y = x$</p>
                    <p>Differentiate: $-\\csc y \\cot y \\frac{dy}{dx} = 1$</p>
                    <div class="math-display">$$\\frac{d}{dx}[\\text{arccsc } x] = -\\frac{1}{|x|\\sqrt{x^2-1}}$$</div>
                    
                    <h3>Complete Summary Table</h3>
                    <table style="margin: 20px 0; border-collapse: collapse; width: 100%;">
                        <tr style="background: #f5f5f5;">
                            <th style="border: 1px solid #ddd; padding: 8px;">Function</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Domain</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Range</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Derivative</th>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">$\\arcsin x$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$[-1, 1]$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$\\frac{1}{\\sqrt{1-x^2}}$</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">$\\arccos x$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$[-1, 1]$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$[0, \\pi]$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$-\\frac{1}{\\sqrt{1-x^2}}$</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">$\\arctan x$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$(-\\infty, \\infty)$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$\\frac{1}{1+x^2}$</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">$\\text{arccot } x$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$(-\\infty, \\infty)$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$(0, \\pi)$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$-\\frac{1}{1+x^2}$</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">$\\text{arcsec } x$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$(-\\infty,-1] \\cup [1,\\infty)$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$[0, \\frac{\\pi}{2}) \\cup (\\frac{\\pi}{2}, \\pi]$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$\\frac{1}{|x|\\sqrt{x^2-1}}$</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">$\\text{arccsc } x$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$(-\\infty,-1] \\cup [1,\\infty)$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$[-\\frac{\\pi}{2}, 0) \\cup (0, \\frac{\\pi}{2}]$</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$-\\frac{1}{|x|\\sqrt{x^2-1}}$</td>
                        </tr>
                    </table>
                    
                    <h3>Chain Rule Applications</h3>
                    <h4>Composite Inverse Functions</h4>
                    <p><strong>Example:</strong> $\\frac{d}{dx}[\\arcsin(2x)]$</p>
                    <div class="math-display">$$\\frac{d}{dx}[\\arcsin(2x)] = \\frac{1}{\\sqrt{1-(2x)^2}} \\cdot 2 = \\frac{2}{\\sqrt{1-4x^2}}$$</div>
                    
                    <p><strong>Example:</strong> $\\frac{d}{dx}[\\arctan(x^2)]$</p>
                    <div class="math-display">$$\\frac{d}{dx}[\\arctan(x^2)] = \\frac{1}{1+(x^2)^2} \\cdot 2x = \\frac{2x}{1+x^4}$$</div>
                    
                    <h3>Special Cases and Considerations</h3>
                    <h4>Domain Restrictions</h4>
                    <ul>
                        <li>$\\arcsin, \\arccos$: require $|x| \\leq 1$</li>
                        <li>$\\arcsec, \\arccsc$: require $|x| \\geq 1$</li>
                        <li>$\\arctan, \\text{arccot}$: defined for all real $x$</li>
                    </ul>
                    
                    <h4>Sign Considerations</h4>
                    <p>Note the signs in derivatives:</p>
                    <ul>
                        <li>Positive: $\\arcsin$, $\\arctan$</li>
                        <li>Negative: $\\arccos$, arccot</li>
                        <li>Sign depends on $x$: arcsec, arccsc</li>
                    </ul>
                `
            },
            'ps2': {
                title: 'Problem Set 2',
                html: `
                    <h3>Unit 2: Applications of Differentiation</h3>
                    
                    <h3>Section 2A: Approximation</h3>
                    <ul>
                        <li><strong>2A-1:</strong> Linearization of $\\sqrt{a + bx}$ at $x = 0$</li>
                        <li><strong>2A-2:</strong> Linearization of $\\frac{1}{a + bx}$ using basic approximations</li>
                        <li><strong>2A-3:</strong> Quadratic approximation for $\\frac{(1+x)^{3/2}}{1+2x}$ at $x = 0$</li>
                        <li><strong>2A-4:</strong> Weight variation with altitude: $w = W(1 + h/R)^{-2}$</li>
                        <li><strong>2A-5:</strong> Height-weight scaling relationships</li>
                        <li><strong>2A-6:</strong> Quadratic approximation to $\\tan \\theta$ for $\\theta \\approx 0$</li>
                        <li><strong>2A-7:</strong> Quadratic approximation to $\\frac{\\sec x}{\\sqrt{1-x^2}}$ for $x \\approx 0$</li>
                        <li><strong>2A-8:</strong> Quadratic approximation to $\\frac{1}{1-x}$ for $x \\approx \\frac{1}{2}$</li>
                        <li><strong>2A-11:</strong> Ideal gas law: $pv^k = C$ approximation for volume changes</li>
                    </ul>
                    
                    <h3>Section 2B: Related Rates</h3>
                    <ul>
                        <li><strong>2B-1:</strong> Expanding circle: area vs radius rates</li>
                        <li><strong>2B-2:</strong> Ladder sliding down wall</li>
                        <li><strong>2B-3:</strong> Conical tank water level</li>
                        <li><strong>2B-4:</strong> Balloon inflation rate</li>
                        <li><strong>2B-5:</strong> Moving shadow problems</li>
                        <li><strong>2B-6:</strong> Two cars approaching intersection</li>
                        <li><strong>2B-7:</strong> Kite flying height vs string length</li>
                    </ul>
                    
                    <h3>Section 2C: Optimization</h3>
                    <ul>
                        <li><strong>2C-1:</strong> Critical points and intervals of increase/decrease</li>
                        <li><strong>2C-2:</strong> Second derivative test applications</li>
                        <li><strong>2C-3:</strong> Absolute maximum/minimum on closed intervals</li>
                        <li><strong>2C-4:</strong> Box volume optimization</li>
                        <li><strong>2C-5:</strong> Fence and field area maximization</li>
                        <li><strong>2C-6:</strong> Distance minimization problems</li>
                        <li><strong>2C-7:</strong> Economic optimization (cost minimization)</li>
                    </ul>
                    
                    <h3>Section 2D: Newton's Method</h3>
                    <ul>
                        <li><strong>2D-1:</strong> Finding roots of $x^3 - x - 1 = 0$</li>
                        <li><strong>2D-2:</strong> Convergence analysis for different starting points</li>
                        <li><strong>2D-3:</strong> When Newton's method fails</li>
                        <li><strong>2D-4:</strong> Square root approximation using Newton's method</li>
                        <li><strong>2D-5:</strong> Finding intersection points of curves</li>
                    </ul>
                    
                    <h3>Section 2E: Mean Value Theorem</h3>
                    <ul>
                        <li><strong>2E-1:</strong> Verifying MVT conditions and finding c values</li>
                        <li><strong>2E-2:</strong> Rolle's theorem applications</li>
                        <li><strong>2E-3:</strong> Using MVT to prove inequalities</li>
                        <li><strong>2E-4:</strong> Speed and velocity applications</li>
                    </ul>
                    
                    <h3>Key Formulas and Techniques</h3>
                    <h4>Linear Approximation</h4>
                    <div class="math-display">$$f(x) \\approx f(a) + f'(a)(x-a)$$</div>
                    
                    <h4>Related Rates Strategy</h4>
                    <ol>
                        <li>Identify related variables</li>
                        <li>Find equation relating variables</li>
                        <li>Differentiate with respect to time</li>
                        <li>Substitute known values</li>
                        <li>Solve for unknown rate</li>
                    </ol>
                    
                    <h4>Newton's Method</h4>
                    <div class="math-display">$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$</div>
                `
            }
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const studyGuide = new StudyGuide();
    
    // Initialize MathJax rendering
    if (window.MathJax) {
        MathJax.startup.document.state(0);
        MathJax.texReset();
        MathJax.typesetPromise();
    }
});