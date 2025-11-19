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
        // If not on the correct page, exit the function
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
    // Positioning it 'fixed' so it stays visible while scrolling/panning
    navBar.style.position = 'fixed';
    // Place it below the main header (approx 60px down)
    navBar.style.top = '60px'; 
    // Center it horizontally
    navBar.style.left = '50%';
    navBar.style.transform = 'translateX(-50%)';
    // High Z-Index to sit on top of the map but below modals
    navBar.style.zIndex = '1000';
    
    // Visual styles
    navBar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'; // Semi-transparent white
    navBar.style.padding = '8px 15px';
    navBar.style.borderRadius = '20px'; // Rounded edges like a pill
    navBar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.15)';
    navBar.style.display = 'flex';
    navBar.style.gap = '15px';
    navBar.style.alignItems = 'center';
    navBar.style.fontFamily = 'Amazon Ember, Arial, sans-serif';
    navBar.style.fontSize = '14px';
    navBar.style.border = '1px solid #ddd';

    // 5. Add Content/Buttons to the Nav Bar
    // You can add your buttons here. This is an example:
    
    // -- Example Button 1 --
    const btn1 = document.createElement('button');
    btn1.innerText = 'My Script 1';
    styleButton(btn1);
    btn1.onclick = () => alert('Script 1 clicked');
    navBar.appendChild(btn1);

    // -- Example Button 2 --
    const btn2 = document.createElement('button');
    btn2.innerText = 'Reset View';
    styleButton(btn2);
    btn2.onclick = () => console.log('Reset View clicked');
    navBar.appendChild(btn2);

    // -- Close/Hide Button (Small 'x') --
    const closeBtn = document.createElement('span');
    closeBtn.innerText = '×';
    closeBtn.style.marginLeft = '10px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.color = '#666';
    closeBtn.onclick = () => navBar.style.display = 'none';
    navBar.appendChild(closeBtn);

    // 6. Inject into the page
    document.body.appendChild(navBar);

    // Helper function to make buttons look nice (GeoStudio style)
    function styleButton(btn) {
        btn.style.backgroundColor = '#007185'; // Amazon Blue
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.padding = '5px 12px';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = '500';
        
        // Hover effect
        btn.onmouseover = () => btn.style.backgroundColor = '#005a6a';
        btn.onmouseout = () => btn.style.backgroundColor = '#007185';
    }

})();
