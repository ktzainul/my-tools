// Function to initialize the custom navigation bar
(function initGeoStudioNav() {
    // 1. Define the target URLs
    const allowedOrigins = [
        "https://eu.geostudio.last-mile.amazon.dev",
        "https://na.geostudio.last-mile.amazon.dev",
        "https://fe.geostudio.last-mile.amazon.dev"
    ];

    // 2. Check if the current page matches the target URLs
    const currentOrigin = window.location.origin;
    const isTargetPage = allowedOrigins.some(origin => currentOrigin.includes(origin));

    if (!isTargetPage) {
        return;
    }

    // 3. Check if the nav bar already exists to prevent duplicates
    if (document.getElementById('gst-custom-nav-bar')) {
        return;
    }

    // 4. Create the Navigation Container
    const navBar = document.createElement('div');
    navBar.id = 'gst-custom-nav-bar';

    // --- STYLING ---
    navBar.style.position = 'fixed';
    navBar.style.top = '60px'; 
    navBar.style.left = '50%';
    navBar.style.transform = 'translateX(-50%)';
    navBar.style.zIndex = '1000';
    
    navBar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    navBar.style.padding = '8px 15px';
    navBar.style.borderRadius = '20px';
    navBar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.15)';
    navBar.style.display = 'flex';
    navBar.style.gap = '15px';
    navBar.style.alignItems = 'center';
    navBar.style.fontFamily = 'Amazon Ember, Arial, sans-serif';
    navBar.style.fontSize = '14px';
    navBar.style.border = '1px solid #ddd';

    // 5. Add Content (Only Close Button initially)
    // The Tampermonkey script will inject the Search buttons here later.

    // -- Close/Hide Button (Small 'x') --
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.marginLeft = '10px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.color = '#666';
    closeBtn.style.fontSize = '18px';
    closeBtn.onclick = () => navBar.style.display = 'none';
    navBar.appendChild(closeBtn);

    // 6. Inject into the page
    document.body.appendChild(navBar);

})();
