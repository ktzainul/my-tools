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

    // 3. Prevent duplicate injection
    if (document.getElementById('gst-custom-nav-container')) {
        return;
    }

    // 4. Create the Overarching Container
    const navContainer = document.createElement('div');
    navContainer.id = 'gst-custom-nav-container';

    // --- Container Styling ---
    navContainer.style.position = 'fixed';
    navContainer.style.top = '2px'; 
    navContainer.style.left = '30px'; 
    navContainer.style.zIndex = '10000';
    navContainer.style.fontFamily = 'Amazon Ember, Arial, sans-serif';

    // 5. Create the "GST Tools" Main Button
    const mainBtn = document.createElement('button');
    mainBtn.innerText = 'GST Tools 🛠️';
    mainBtn.style.backgroundColor = '#232f3e';
    mainBtn.style.color = '#ffffff';
    mainBtn.style.border = '1px solid #111';
    mainBtn.style.padding = '8px 16px';
    mainBtn.style.borderRadius = '6px';
    mainBtn.style.cursor = 'pointer';
    mainBtn.style.fontWeight = 'bold';
    mainBtn.style.fontSize = '13px';
    mainBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    mainBtn.style.transition = 'background-color 0.2s';
    
    // Hover effect
    mainBtn.onmouseover = () => mainBtn.style.backgroundColor = '#374151';
    mainBtn.onmouseout = () => mainBtn.style.backgroundColor = '#232f3e';
    
    // 6. Create the Dropdown Panel
    const dropdown = document.createElement('div');
    dropdown.style.display = 'none'; // Hidden initially
    dropdown.style.position = 'absolute';
    dropdown.style.top = '100%';
    dropdown.style.left = '0';
    dropdown.style.marginTop = '8px';
    dropdown.style.backgroundColor = '#ffffff';
    dropdown.style.border = '1px solid #e5e7eb';
    dropdown.style.borderRadius = '8px';
    dropdown.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
    dropdown.style.width = '260px';
    dropdown.style.padding = '12px';
    dropdown.style.flexDirection = 'column';
    dropdown.style.gap = '10px';
    dropdown.style.maxHeight = '70vh'; // Don't let it go offscreen

    // 7. Search Bar Wrapper
    const searchWrapper = document.createElement('div');
    searchWrapper.style.position = 'relative';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search tools...';
    searchInput.style.width = '100%';
    searchInput.style.padding = '8px 12px 8px 30px'; // Extra padding on left for icon
    searchInput.style.boxSizing = 'border-box';
    searchInput.style.border = '1px solid #d1d5db';
    searchInput.style.borderRadius = '6px';
    searchInput.style.fontSize = '13px';
    searchInput.style.outline = 'none';
    
    // Search Icon
    const searchIcon = document.createElement('span');
    searchIcon.innerHTML = '🔍';
    searchIcon.style.position = 'absolute';
    searchIcon.style.left = '8px';
    searchIcon.style.top = '50%';
    searchIcon.style.transform = 'translateY(-50%)';
    searchIcon.style.fontSize = '12px';
    searchIcon.style.color = '#9ca3af';

    searchWrapper.appendChild(searchIcon);
    searchWrapper.appendChild(searchInput);

    // 8. The List Container (Re-using original ID so TM scripts don't break)
    const toolsList = document.createElement('div');
    toolsList.id = 'gst-custom-nav-bar'; // 👈 CRITICAL: TM Scripts will look for this!
    toolsList.style.display = 'flex';
    toolsList.style.flexDirection = 'column';
    toolsList.style.gap = '8px';
    toolsList.style.overflowY = 'auto';
    toolsList.style.paddingRight = '4px';

    // 9. Live Search Functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const tools = toolsList.children;
        for (let i = 0; i < tools.length; i++) {
            const tool = tools[i];
            const text = tool.innerText || tool.textContent;
            if (text.toLowerCase().includes(query)) {
                tool.style.display = ''; 
            } else {
                tool.style.display = 'none';
            }
        }
    });

    // 10. Toggle Dropdown Menu
    mainBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent document click from closing it instantly
        if (dropdown.style.display === 'none') {
            dropdown.style.display = 'flex';
            searchInput.focus(); // Auto focus on search bar
        } else {
            dropdown.style.display = 'none';
        }
    };

    // Close dropdown when clicking anywhere else on the screen
    document.addEventListener('click', (e) => {
        if (!navContainer.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Assemble the UI hierarchy
    dropdown.appendChild(searchWrapper);
    dropdown.appendChild(toolsList);
    navContainer.appendChild(mainBtn);
    navContainer.appendChild(dropdown);
    
    // Inject into page
    document.body.appendChild(navContainer);

    // 11. Custom Syling for Appended Tools
    // This watches the list and automatically restyles TM Buttons into dropdown menu items
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'BUTTON' || (node.classList && node.classList.contains('geo-nav-btn-local'))) {
                    // Force the button to look like a menu strip item
                    node.style.width = '100%';
                    node.style.textAlign = 'left';
                    node.style.margin = '0';
                    node.style.padding = '10px 12px';
                    node.style.borderRadius = '6px';
                    node.style.boxSizing = 'border-box';
                    node.style.transition = 'filter 0.2s, transform 0.1s';
                    
                    // Click animations for standard look & feel
                    node.onmouseover = () => { node.style.filter = 'brightness(1.15)'; };
                    node.onmouseout = () => { node.style.filter = 'none'; };
                    node.onmousedown = () => { node.style.transform = 'scale(0.98)'; };
                    node.onmouseup = () => { node.style.transform = 'scale(1)'; };
                }
            });
        });
    });
    
    // Start observing for changes
    observer.observe(toolsList, { childList: true });

})();
