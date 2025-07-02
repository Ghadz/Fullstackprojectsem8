// Main JavaScript for Event Horizon Index Page
document.addEventListener('DOMContentLoaded', function() {
    // API Keys (using demo keys for now)
    const NASA_API_KEY = 'DEMO_KEY';
    const SPACEX_API_BASE = 'https://api.spacexdata.com/v4';

    // Initialize the page
    initializeSpaceFeatures();

    // Function to initialize space features with API data
    async function initializeSpaceFeatures() {
        try {
            // Load SpaceX data
            await loadSpaceXData();
            
            // Load Jupiter data from NASA
            await loadJupiterData();
            
            // Load Moon landing data from NASA
            await loadMoonLandingData();
            
        } catch (error) {
            console.error('Error loading space features:', error);
            // Fallback to static content if APIs fail
            loadFallbackContent();
        }
    }

    // Load SpaceX launch data - First successful launch
    async function loadSpaceXData() {
        try {
            // Get all launches and find the first successful one
            const response = await fetch(`${SPACEX_API_BASE}/launches`);
            const launches = await response.json();
            
            // Find the first successful launch
            const firstSuccessfulLaunch = launches.find(launch => launch.success === true);
            
            // Update the SpaceX card
            const spacexImg = document.getElementById('spacex-img');
            const spacexSpinner = document.getElementById('spacex-spinner');
            const spacexTitle = document.getElementById('spacex-title');
            
            if (firstSuccessfulLaunch && firstSuccessfulLaunch.links && firstSuccessfulLaunch.links.patch && firstSuccessfulLaunch.links.patch.small) {
                spacexImg.src = firstSuccessfulLaunch.links.patch.small;
                spacexImg.style.display = 'block';
                spacexSpinner.style.display = 'none';
            } else {
                // Fallback image
                spacexImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Falcon_Heavy_Demo_Mission_%2839562600325%29.jpg/640px/Falcon_Heavy_Demo_Mission_%2839562600325%29.jpg';
                spacexImg.style.display = 'block';
                spacexSpinner.style.display = 'none';
            }
            
            spacexTitle.textContent = firstSuccessfulLaunch ? firstSuccessfulLaunch.name : 'First Successful SpaceX Launch';
            
            // Store launch data for modal
            spacexImg.dataset.launchData = JSON.stringify(firstSuccessfulLaunch || {});
            
        } catch (error) {
            console.error('Error loading SpaceX data:', error);
            loadSpaceXFallback();
        }
    }

    // Load Jupiter data from NASA
    async function loadJupiterData() {
        try {
            const jupiterImg = document.getElementById('jupiter-img');
            const jupiterSpinner = document.getElementById('jupiter-spinner');
            const jupiterTitle = document.getElementById('jupiter-title');
            
            // Use the high-quality 4K Jupiter image
            jupiterImg.src = 'https://wallpapers.com/images/featured/jupiter-4k-u0vxq4j32tby8tox.jpg';
            jupiterImg.style.display = 'block';
            jupiterSpinner.style.display = 'none';
            
            // Create Jupiter data object for modal
            const jupiterData = {
                title: 'Jupiter - The Giant Planet',
                description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined.',
                imageUrl: 'https://wallpapers.com/images/featured/jupiter-4k-u0vxq4j32tby8tox.jpg'
            };
            
            // Store Jupiter data for modal
            jupiterImg.dataset.jupiterData = JSON.stringify(jupiterData);
            
        } catch (error) {
            console.error('Error loading Jupiter data:', error);
            loadJupiterFallback();
        }
    }

    // Load Moon landing data from NASA
    async function loadMoonLandingData() {
        try {
            const response = await fetch(`https://images-api.nasa.gov/search?q=apollo%2011%20moon%20landing&media_type=image`);
            const moonData = await response.json();
            
            const moonImg = document.getElementById('moon-img');
            const moonSpinner = document.getElementById('moon-spinner');
            const moonTitle = document.getElementById('moon-title');
            
            if (moonData.collection && moonData.collection.items && moonData.collection.items.length > 0) {
                const moonItem = moonData.collection.items[0];
                if (moonItem.links && moonItem.links[0]) {
                    moonImg.src = moonItem.links[0].href;
                    moonImg.style.display = 'block';
                    moonSpinner.style.display = 'none';
                    
                    // Store Moon data for modal
                    moonImg.dataset.moonData = JSON.stringify(moonItem);
                }
            } else {
                // Fallback image
                moonImg.src = 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Apollo_11_Lunar_Module_on_the_Moon.jpg';
                moonImg.style.display = 'block';
                moonSpinner.style.display = 'none';
            }
            
        } catch (error) {
            console.error('Error loading Moon landing data:', error);
            loadMoonFallback();
        }
    }

    // Fallback functions
    function loadSpaceXFallback() {
        const spacexImg = document.getElementById('spacex-img');
        const spacexSpinner = document.getElementById('spacex-spinner');
        spacexImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Falcon_Heavy_Demo_Mission_%2839562600325%29.jpg/640px-Falcon_Heavy_Demo_Mission_%2839562600325%29.jpg';
        spacexImg.style.display = 'block';
        spacexSpinner.style.display = 'none';
    }

    function loadJupiterFallback() {
        const jupiterImg = document.getElementById('jupiter-img');
        const jupiterSpinner = document.getElementById('jupiter-spinner');
        jupiterImg.src = 'https://wallpapers.com/images/featured/jupiter-4k-u0vxq4j32tby8tox.jpg';
        jupiterImg.style.display = 'block';
        jupiterSpinner.style.display = 'none';
    }

    function loadMoonFallback() {
        const moonImg = document.getElementById('moon-img');
        const moonSpinner = document.getElementById('moon-spinner');
        moonImg.src = 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Apollo_11_Lunar_Module_on_the_Moon.jpg';
        moonImg.style.display = 'block';
        moonSpinner.style.display = 'none';
    }

    function loadFallbackContent() {
        loadSpaceXFallback();
        loadJupiterFallback();
        loadMoonFallback();
    }

    // Modal event listeners
    document.getElementById('spacex-card').addEventListener('click', function() {
        const launchData = JSON.parse(this.querySelector('#spacex-img').dataset.launchData || '{}');
        showSpaceXModal(launchData);
    });

    document.getElementById('jupiter-card').addEventListener('click', function() {
        const jupiterData = JSON.parse(this.querySelector('#jupiter-img').dataset.jupiterData || '{}');
        showJupiterModal(jupiterData);
    });

    document.getElementById('moon-card').addEventListener('click', function() {
        const moonData = JSON.parse(this.querySelector('#moon-img').dataset.moonData || '{}');
        showMoonModal(moonData);
    });

    // Modal display functions
    function showSpaceXModal(launchData) {
        const modalBody = document.getElementById('spacexModalBody');
        
        // Debug: Log the launch data to see what's available
        console.log('Launch Data:', launchData);
        console.log('Launch Links:', launchData.links);
        
        // Check for available links
        const article = launchData.links?.article;
        const wikipedia = launchData.links?.wikipedia;
        
        let linksSection = '';
        

        
        // Add additional links if available
        if (article || wikipedia) {
            linksSection = `
                <div class="mt-3">
                    <h6>Additional Resources</h6>
                    <div class="d-flex gap-2 justify-content-center">
                        ${article ? `<a href="${article}" target="_blank" class="btn btn-outline-light btn-sm">Article</a>` : ''}
                        ${wikipedia ? `<a href="${wikipedia}" target="_blank" class="btn btn-outline-light btn-sm">Wikipedia</a>` : ''}
                    </div>
                </div>
            `;
        }
        
        let content = `
            <div class="text-center">
                <img src="${launchData.links?.patch?.large || launchData.links?.patch?.small || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Falcon_Heavy_Demo_Mission_%2839562600325%29.jpg/640px/Falcon_Heavy_Demo_Mission_%2839562600325%29.jpg'}" alt="SpaceX Launch">
                <h6>First Successful SpaceX Launch</h6>
                <p><strong>Mission:</strong> ${launchData.name || 'SpaceX Launch'}</p>
                <p><strong>Date:</strong> ${launchData.date_utc ? new Date(launchData.date_utc).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'TBD'}</p>
                <p><strong>Rocket:</strong> ${launchData.rocket || 'Unknown'}</p>
                <p><strong>Launch Site:</strong> ${launchData.launchpad || 'Unknown'}</p>
                <p><strong>Status:</strong> ${launchData.success ? 'Successful' : 'Failed'}</p>
                ${launchData.details ? `<p><strong>Details:</strong> ${launchData.details}</p>` : ''}
                <p><strong>Historical Significance:</strong> This was SpaceX's first successful orbital launch, marking a major milestone in the company's journey to revolutionize space travel and make humanity a multi-planetary species.</p>
                ${linksSection}
            </div>
        `;
        
        modalBody.innerHTML = content;
        
        const modal = new bootstrap.Modal(document.getElementById('spacexModal'));
        modal.show();
    }

    function showJupiterModal(jupiterData) {
        const modalBody = document.getElementById('jupiterModalBody');
        
        let content = `
            <div class="text-center">
                <img src="${jupiterData.imageUrl || 'https://wallpapers.com/images/featured/jupiter-4k-u0vxq4j32tby8tox.jpg'}" alt="Jupiter">
                <h6>Jupiter - The Giant Planet</h6>
                <p><strong>Title:</strong> ${jupiterData.title || 'Jupiter - The Giant Planet'}</p>
                <p><strong>Description:</strong> ${jupiterData.description || 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined.'}</p>
                <p>Jupiter is known for its Great Red Spot, a giant storm that has been raging for hundreds of years. The planet has 79 known moons, including the four large Galilean moons: Io, Europa, Ganymede, and Callisto.</p>
                <p><strong>Key Facts:</strong></p>
                <ul style="text-align: left; display: inline-block;">
                    <li>Largest planet in our solar system</li>
                    <li>Has 79 known moons</li>
                    <li>Great Red Spot is a storm larger than Earth</li>
                    <li>Made mostly of hydrogen and helium</li>
                    <li>Has a faint ring system</li>
                </ul>
            </div>
        `;
        
        modalBody.innerHTML = content;
        
        const modal = new bootstrap.Modal(document.getElementById('jupiterModal'));
        modal.show();
    }

    function showMoonModal(moonData) {
        const modalBody = document.getElementById('moonModalBody');
        
        let content = `
            <div class="text-center">
                <img src="${moonData.links?.[0]?.href || 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Apollo_11_Lunar_Module_on_the_Moon.jpg'}" alt="Apollo 11 Moon Landing">
                <h6>Apollo 11 - First Moon Landing</h6>
                <p><strong>Title:</strong> ${moonData.data?.[0]?.title || 'Apollo 11 Moon Landing'}</p>
                <p><strong>Date:</strong> July 20, 1969</p>
                <p><strong>Mission:</strong> Apollo 11</p>
                <p><strong>Astronauts:</strong> Neil Armstrong, Buzz Aldrin, Michael Collins</p>
                <p><strong>Description:</strong> ${moonData.data?.[0]?.description || 'Apollo 11 was the spaceflight that first landed humans on the Moon. Commander Neil Armstrong and lunar module pilot Buzz Aldrin formed the American crew that landed the Apollo Lunar Module Eagle on July 20, 1969, at 20:17 UTC.'}</p>
                <p>Neil Armstrong became the first person to step onto the lunar surface six hours and 39 minutes later on July 21 at 02:56 UTC. Armstrong spent about two and a half hours outside the spacecraft, Aldrin slightly less, and together they collected 47.5 pounds (21.5 kg) of lunar material for return to Earth.</p>
            </div>
        `;
        
        modalBody.innerHTML = content;
        
        const modal = new bootstrap.Modal(document.getElementById('moonModal'));
        modal.show();
    }
}); 