// Q&A logic for Explore page
const qaBox = document.getElementById('qa-box');
const askBtn = document.getElementById('ask-btn');
const searchInput = document.getElementById('explore-search');

// Store Q&A pairs
let qaPairs = [];

askBtn.addEventListener('click', async () => {
  const question = searchInput.value.trim();
  if (!question) return;
  // Call WolframAlpha Short Answer API using a CORS proxy for development
  const appid = 'Y83QV9-56QJXGQXXY';
  const url = `https://corsproxy.io/?https://api.wolframalpha.com/v1/result?i=${encodeURIComponent(question)}&appid=${appid}`;
  let answer = 'No answer found.';
  try {
    const response = await fetch(url);
    if (response.ok) {
      answer = await response.text();
    } else {
      answer = 'Sorry, I could not get an answer.';
    }
  } catch (e) {
    answer = 'Error connecting to AI service.';
  }
  qaPairs.push({ question, answer });
  renderQAPairs();
  searchInput.value = '';
});

function renderQAPairs() {
  qaBox.innerHTML = qaPairs.map(pair => `
    <div class="qa-pair">
      <div class="qa-question">Q: ${pair.question}</div>
      <div class="qa-answer">A: ${pair.answer}</div>
    </div>
  `).join('');
}

// --- Category Popup Logic ---
// Map section IDs to specific content types
const categoryTypes = {
  'space-wonders': 'nebula supernova galaxy',
  'launch-station': 'launch pad rocket launch',
  'solar-system': 'planets',
  'discover-mars': 'mars rovers',
  'space-stations': 'space stations',
  'earth-3d': '3d earth',
  'black-holes': 'black hole',
  'astronaut-info': 'astronauts',
  'become-astronaut': 'application'
};

// Well-known astronauts data with nationality flags instead of photos
const astronauts = [
  { name: "Neil Armstrong", nationality: "American", age: "82 (1930-2012)", height: "5'11\"", timeInSpace: "8 days 14 hours", image: "https://flagcdn.com/w320/us.png" },
  { name: "Buzz Aldrin", nationality: "American", age: "94", height: "5'10\"", timeInSpace: "12 days 1 hour", image: "https://flagcdn.com/w320/us.png" },
  { name: "Yuri Gagarin", nationality: "Soviet", age: "34 (1934-1968)", height: "5'2\"", timeInSpace: "1 hour 48 minutes", image: "https://flagcdn.com/w320/ru.png" },
  { name: "Valentina Tereshkova", nationality: "Soviet", age: "87", height: "5'4\"", timeInSpace: "2 days 22 hours", image: "https://flagcdn.com/w320/ru.png" },
  { name: "John Glenn", nationality: "American", age: "95 (1921-2016)", height: "5'10\"", timeInSpace: "9 days 2 hours", image: "https://flagcdn.com/w320/us.png" },
  { name: "Sally Ride", nationality: "American", age: "61 (1951-2012)", height: "5'5\"", timeInSpace: "14 days 7 hours", image: "https://flagcdn.com/w320/us.png" },
  { name: "Chris Hadfield", nationality: "Canadian", age: "65", height: "5'9\"", timeInSpace: "166 days", image: "https://flagcdn.com/w320/ca.png" },
  { name: "Mae Jemison", nationality: "American", age: "68", height: "5'4\"", timeInSpace: "7 days 22 hours", image: "https://flagcdn.com/w320/us.png" },
  { name: "Scott Kelly", nationality: "American", age: "60", height: "5'8\"", timeInSpace: "520 days", image: "https://flagcdn.com/w320/us.png" },
  { name: "Peggy Whitson", nationality: "American", age: "64", height: "5'4\"", timeInSpace: "665 days", image: "https://flagcdn.com/w320/us.png" },
  { name: "Tim Peake", nationality: "British", age: "52", height: "6'0\"", timeInSpace: "185 days", image: "https://flagcdn.com/w320/gb.png" },
  { name: "Samantha Cristoforetti", nationality: "Italian", age: "47", height: "5'6\"", timeInSpace: "199 days", image: "https://flagcdn.com/w320/it.png" },
  { name: "Andreas Mogensen", nationality: "Danish", age: "47", height: "6'0\"", timeInSpace: "9 days", image: "https://flagcdn.com/w320/dk.png" },
  { name: "Soyeon Yi", nationality: "South Korean", age: "44", height: "5'3\"", timeInSpace: "10 days 21 hours", image: "https://flagcdn.com/w320/kr.png" },
  { name: "Liu Yang", nationality: "Chinese", age: "45", height: "5'4\"", timeInSpace: "13 days", image: "https://flagcdn.com/w320/cn.png" }
];

// Mars rovers and discoveries data
const marsData = [
  { name: "Perseverance Rover", desc: "NASA's latest Mars rover, searching for signs of ancient life and collecting samples for future return to Earth.", image: "https://images-assets.nasa.gov/image/PIA24424/PIA24424~orig.jpg" },
  { name: "Curiosity Rover", desc: "Exploring Gale Crater since 2012, studying Mars' climate and geology to understand if the planet could have supported life.", image: "https://images-assets.nasa.gov/image/PIA16064/PIA16064~orig.jpg" },
  { name: "Opportunity Rover", desc: "Operated for 15 years on Mars, far exceeding its planned 90-day mission, discovering evidence of ancient water.", image: "https://images-assets.nasa.gov/image/PIA03272/PIA03272~orig.jpg" },
  { name: "Spirit Rover", desc: "The first rover to climb a mountain on another planet, studying Martian geology and climate.", image: "https://images-assets.nasa.gov/image/PIA03273/PIA03273~orig.jpg" },
  { name: "Mars Surface", desc: "The red, dusty surface of Mars with its distinctive iron oxide that gives the planet its reddish appearance.", image: "https://images-assets.nasa.gov/image/PIA22567/PIA22567~orig.jpg" },
  { name: "Olympus Mons", desc: "The largest volcano in the solar system, standing 22 km high and 600 km across.", image: "https://images-assets.nasa.gov/image/PIA03276/PIA03276~orig.jpg" }
];

// Space stations data with proper images and descriptions
const spaceStationsData = [
    {
        title: "International Space Station (ISS)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9JwkElkrRkK2EDpkzfJjsprF7u27TA0xpAw&s",
        description: "The International Space Station is a modular space station in low Earth orbit. It is a multinational collaborative project involving five participating space agencies: NASA, Roscosmos, JAXA, ESA, and CSA."
    },
    {
        title: "Tiangong Space Station",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkUNRU9qpNDFKA6zGT3fXb3UMRrNnGTgW6aw&s",
        description: "Tiangong is China's space station program. The first module, Tianhe, was launched in April 2021, marking the beginning of China's permanent space station."
    },
    {
        title: "Mir Space Station",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Mir_Space_Station_viewed_from_Endeavour_during_STS-89.jpg",
        description: "Mir was a space station that operated in low Earth orbit from 1986 to 2001. It was the first modular space station and was assembled in orbit from 1986 to 1996."
    },
    {
        title: "Skylab",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXqvongUbYNcDqALgnsomJZvkShWGbXu1BPw&s",
        description: "Skylab was the United States' first space station, launched by NASA in 1973. It orbited Earth from 1973 to 1979 and was visited by crews on three separate missions."
    }
];

// Black holes data
const blackHolesData = [
  { name: "Sagittarius A*", desc: "The supermassive black hole at the center of our Milky Way galaxy, with a mass of about 4 million times that of our Sun.", image: "https://cdn.britannica.com/57/181857-050-972A4F96/Artist-rendering-matter-black-hole.jpg" },
  { name: "M87 Black Hole", desc: "The first black hole ever photographed, located in the center of galaxy M87, with a mass of 6.5 billion times that of our Sun.", image: "https://gizmodo.com/app/uploads/2023/04/feccb54a5725d64cc51fa72b25ed19e5.jpg" },
  { name: "Cygnus X-1", desc: "One of the first black holes discovered, located in the constellation Cygnus, about 6,000 light-years from Earth.", image: "https://c02.purpledshub.com/uploads/sites/48/2021/10/cygnus-x-1-illustration-160839a.jpeg" },
  { name: "V404 Cygni", desc: "A black hole binary system that occasionally produces bright outbursts, located about 7,800 light-years from Earth.", image: "https://cdn.sci.news/images/enlarge/image_2955e-V404-Cygni.jpg" },
  { name: "Gargantua", desc: "A fictional supermassive black hole featured in the movie Interstellar, representing the extreme gravitational effects near black holes.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW-Wok-FwbP3aD0-ZuhiFq6cNyosGGkQnPiA&s" },
  { name: "Event Horizon", desc: "The boundary around a black hole beyond which nothing, not even light, can escape the gravitational pull.", image: "https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltb5d92757ac1ee045/bltbfc0be206bddd128/663b2cba2f3c4e69a5744723/black-hole-simulator-rewatch.png%3Fcrop%3D584%2C583%2Cx0%2Cy57" }
];

// Solar system planets data with better image URLs
const planets = [
  { name: "Mercury", desc: "The smallest and innermost planet in the Solar System. It has no moons and is the closest planet to the Sun.", image: "https://images-assets.nasa.gov/image/PIA11245/PIA11245~orig.jpg" },
  { name: "Venus", desc: "The second planet from the Sun and Earth's closest planetary neighbor. It's often called Earth's twin due to similar size.", image: "https://images-assets.nasa.gov/image/PIA00271/PIA00271~orig.jpg" },
  { name: "Earth", desc: "Our home planet and the only known planet with life. It has one natural satellite - the Moon.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/330px-The_Earth_seen_from_Apollo_17.jpg" },
  { name: "Mars", desc: "The fourth planet from the Sun, often called the Red Planet due to its reddish appearance.", image: "https://cdn.outsideonline.com/wp-content/uploads/2025/01/mars-illustration-space_s.jpg" },
  { name: "Jupiter", desc: "The largest planet in our Solar System. It's a gas giant with a Great Red Spot storm.", image: "https://images-assets.nasa.gov/image/PIA22946/PIA22946~orig.jpg" },
  { name: "Saturn", desc: "Known for its spectacular ring system. It's the second-largest planet in our Solar System.", image: "https://images-assets.nasa.gov/image/PIA11141/PIA11141~orig.jpg" },
  { name: "Uranus", desc: "The seventh planet from the Sun, an ice giant with a tilted axis of rotation.", image: "https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg" },
  { name: "Neptune", desc: "The eighth and farthest known planet from the Sun. It's also an ice giant.", image: "https://images-assets.nasa.gov/image/PIA01492/PIA01492~orig.jpg" }
];

// Add event delegation for category section clicks
const mainContainer = document.querySelector('.explore-main .container');
mainContainer.addEventListener('click', async function(e) {
  // Find the closest section with an ID matching a category
  let section = e.target.closest('section');
  if (!section || !categoryTypes[section.id]) return;
  
  const sectionId = section.id;
  const categoryType = categoryTypes[sectionId];
  
  document.getElementById('categoryModalLabel').textContent = section.querySelector('h2').textContent;
  document.getElementById('categoryModalBody').innerHTML = '<div class="text-center">Loading...</div>';
  
  // Handle different category types
  if (sectionId === 'space-wonders' || sectionId === 'launch-station') {
    // Add SpaceX info for launch station at the top
    if (sectionId === 'launch-station') {
      try {
        // Fetch all upcoming launches
        const upcomingRes = await fetch('https://api.spacexdata.com/v4/launches/upcoming');
        const upcoming = await upcomingRes.json();
        const now = new Date();
        // Filter for launches in the future, with high precision, and sort by soonest
        const filtered = upcoming
          .filter(launch => {
            const launchDate = new Date(launch.date_utc);
            // Exclude low precision (only keep 'hour' or 'day')
            return launchDate > now && (launch.date_precision === 'hour' || launch.date_precision === 'day');
          })
          .sort((a, b) => new Date(a.date_utc) - new Date(b.date_utc));
        if (filtered.length > 0) {
          // Show the next 3 launches
          const launchesToShow = filtered.slice(0, 3);
          let launchesHtml = '<div class="alert alert-info mb-3"><strong>🚀 Upcoming SpaceX Launches:</strong><ul style="margin-bottom:0;">';
          for (const launch of launchesToShow) {
            // Fetch the launch pad info
            let padName = '';
            if (launch.launchpad) {
              const padRes = await fetch(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`);
              const padData = await padRes.json();
              padName = padData.full_name;
            }
            const date = new Date(launch.date_utc).toLocaleString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'
            });
            launchesHtml += `<li style="margin-bottom:6px;"><strong>${launch.name}</strong> - ${date} UTC<br><span style="font-size:0.95em;"><strong>Pad:</strong> ${padName}</span></li>`;
          }
          launchesHtml += '</ul></div>';
          const launchInfo = document.createElement('div');
          launchInfo.innerHTML = launchesHtml;
          document.getElementById('categoryModalBody').appendChild(launchInfo);
        } else {
          const launchInfo = document.createElement('div');
          launchInfo.className = 'alert alert-warning mb-3';
          launchInfo.innerHTML = 'No upcoming SpaceX launches found.';
          document.getElementById('categoryModalBody').appendChild(launchInfo);
        }
      } catch (e) {
        console.log('SpaceX API not available');
      }
    }
    
    // Fetch NASA images
    const nasaUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(categoryType)}&media_type=image`;
    let images = [];
    try {
      const response = await fetch(nasaUrl);
      const data = await response.json();
      images = data.collection.items.slice(0, 12);
    } catch (e) {
      document.getElementById('categoryModalBody').innerHTML = '<div class="text-danger">Failed to load images.</div>';
      return;
    }
    
    if (images.length === 0) {
      document.getElementById('categoryModalBody').innerHTML = '<div class="text-warning">No images found.</div>';
      return;
    }
    
    // Remove duplicates based on image URL
    const uniqueImages = [];
    const seenUrls = new Set();
    
    images.forEach(item => {
      const imgUrl = item.links && item.links[0] ? item.links[0].href : '';
      if (imgUrl && !seenUrls.has(imgUrl)) {
        seenUrls.add(imgUrl);
        uniqueImages.push(item);
      }
    });
    
    const grid = document.createElement('div');
    grid.className = 'row'; // Removed gallery-grid class to eliminate double scrollbar
    uniqueImages.forEach((item, idx) => {
      const imgUrl = item.links && item.links[0] ? item.links[0].href : '';
      const title = item.data && item.data[0] ? item.data[0].title : 'NASA Image';
      const desc = item.data && item.data[0] ? item.data[0].description : '';
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-3';
      col.innerHTML = `<img src="${imgUrl}" alt="${title}" class="img-fluid rounded shadow-sm category-photo" style="cursor:pointer;" data-title="${encodeURIComponent(title)}" data-desc="${encodeURIComponent(desc)}" data-img="${encodeURIComponent(imgUrl)}">`;
      grid.appendChild(col);
    });
    
    document.getElementById('categoryModalBody').appendChild(grid);
    
  } else if (sectionId === 'solar-system') {
    // Show planets
    const grid = document.createElement('div');
    grid.className = 'row gallery-grid';
    planets.forEach(planet => {
      const col = document.createElement('div');
      col.className = 'col-md-3 mb-3';
      col.innerHTML = `<img src="${planet.image}" alt="${planet.name}" class="img-fluid rounded shadow-sm category-photo" style="cursor:pointer;" data-title="${encodeURIComponent(planet.name)}" data-desc="${encodeURIComponent(planet.desc)}" data-img="${encodeURIComponent(planet.image)}">`;
      grid.appendChild(col);
    });
    document.getElementById('categoryModalBody').innerHTML = '';
    document.getElementById('categoryModalBody').appendChild(grid);
    
  } else if (sectionId === 'discover-mars') {
    // Show Mars rovers and discoveries with NASA API integration
    const grid = document.createElement('div');
    grid.className = 'row gallery-grid';
    
    // Add Mars rover photos from NASA API
    try {
      const marsResponse = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY');
      const marsApiData = await marsResponse.json();
      
      if (marsApiData.photos && marsApiData.photos.length > 0) {
        // Add NASA Mars photos
        marsApiData.photos.slice(0, 6).forEach(photo => {
          const col = document.createElement('div');
          col.className = 'col-md-4 mb-3';
          col.innerHTML = `<img src="${photo.img_src}" alt="Mars Rover Photo" class="img-fluid rounded shadow-sm category-photo" style="cursor:pointer;" data-title="${encodeURIComponent('Mars Rover Photo')}" data-desc="${encodeURIComponent(`Taken by ${photo.rover.name} rover on sol ${photo.sol}`)}" data-img="${encodeURIComponent(photo.img_src)}">`;
          grid.appendChild(col);
        });
      }
    } catch (error) {
      console.log('Mars API not available, using static data');
    }
    
    // Add static Mars data as well
    marsData.forEach(item => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-3';
      col.innerHTML = `<img src="${item.image}" alt="${item.name}" class="img-fluid rounded shadow-sm category-photo" style="cursor:pointer;" data-title="${encodeURIComponent(item.name)}" data-desc="${encodeURIComponent(item.desc)}" data-img="${encodeURIComponent(item.image)}">`;
      grid.appendChild(col);
    });
    
    document.getElementById('categoryModalBody').innerHTML = '';
    document.getElementById('categoryModalBody').appendChild(grid);
    
  } else if (sectionId === 'space-stations') {
    // Show space stations
    const grid = document.createElement('div');
    grid.className = 'row gallery-grid';
    spaceStationsData.forEach(station => {
      const col = document.createElement('div');
      col.className = 'col-md-6 mb-3';
      col.innerHTML = `
        <div class="station-card" style="cursor:pointer;" data-name="${encodeURIComponent(station.title)}" data-desc="${encodeURIComponent(station.description)}" data-img="${encodeURIComponent(station.image)}">
          <img src="${station.image}" alt="${station.title}" class="img-fluid rounded shadow-sm" style="width: 100%; height: 200px; object-fit: cover;">
          <h5 class="mt-2">${station.title}</h5>
        </div>
      `;
      grid.appendChild(col);
    });
    document.getElementById('categoryModalBody').innerHTML = '';
    document.getElementById('categoryModalBody').appendChild(grid);
    
  } else if (sectionId === 'black-holes') {
    // Show black holes
    const grid = document.createElement('div');
    grid.className = 'row gallery-grid';
    blackHolesData.forEach(item => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-3';
      col.innerHTML = `<img src="${item.image}" alt="${item.name}" class="img-fluid rounded shadow-sm category-photo" style="cursor:pointer;" data-title="${encodeURIComponent(item.name)}" data-desc="${encodeURIComponent(item.desc)}" data-img="${encodeURIComponent(item.image)}">`;
      grid.appendChild(col);
    });
    document.getElementById('categoryModalBody').innerHTML = '';
    document.getElementById('categoryModalBody').appendChild(grid);
    
  } else if (sectionId === 'earth-3d') {
    // Show Advanced 3D Earth with Three.js
    const content = document.createElement('div');
    content.innerHTML = `
      <div class="text-center">
        <h4>Interactive 3D Earth</h4>
        <p>Click and drag to rotate the Earth in 3D</p>
        <div id="earth-3d-container" style="width: 100%; height: 500px; background: #000; border-radius: 10px; position: relative; overflow: hidden;">
          <div class="earth-controls" style="position: absolute; top: 10px; right: 10px; z-index: 10;">
            <button onclick="resetEarthView()" class="btn btn-sm btn-outline-light me-2">Reset View</button>
            <button onclick="toggleRotation()" class="btn btn-sm btn-outline-light">Stop Rotation</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById('categoryModalBody').innerHTML = '';
    document.getElementById('categoryModalBody').appendChild(content);
    
    // Initialize Advanced 3D Earth after container is created
    setTimeout(() => {
      const container = document.getElementById('earth-3d-container');
      if (container && typeof createAdvancedEarth3D === 'function') {
        window.earth3DInstance = createAdvancedEarth3D(container);
      } else {
        // Fallback to basic 3D Earth
        initEarth3D();
      }
    }, 100);
    
  } else if (sectionId === 'astronaut-info') {
    // Show astronauts with nationality flags
    const grid = document.createElement('div');
    grid.className = 'row gallery-grid';
    astronauts.forEach(astronaut => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-3';
      col.innerHTML = `
        <div class="astronaut-card" style="cursor:pointer;" data-name="${encodeURIComponent(astronaut.name)}" data-nationality="${encodeURIComponent(astronaut.nationality)}" data-age="${encodeURIComponent(astronaut.age)}" data-height="${encodeURIComponent(astronaut.height)}" data-time="${encodeURIComponent(astronaut.timeInSpace)}" data-img="${encodeURIComponent(astronaut.image)}">
          <img src="${astronaut.image}" alt="${astronaut.nationality} flag" class="img-fluid rounded shadow-sm" style="width: 100%; height: 120px; object-fit: cover;">
          <h5 class="mt-2">${astronaut.name}</h5>
          <div class="astronaut-nationality">${astronaut.nationality}</div>
        </div>
      `;
      grid.appendChild(col);
    });
    document.getElementById('categoryModalBody').innerHTML = '';
    document.getElementById('categoryModalBody').appendChild(grid);
    
  } else if (sectionId === 'become-astronaut') {
    // Show application info and form
    const content = document.createElement('div');
    content.innerHTML = `
      <div class="row">
        <div class="col-md-8">
          <h4>How to Become an Astronaut</h4>
          <p>To become an astronaut, you typically need:</p>
          <ul>
            <li>A bachelor's degree in engineering, biological science, physical science, computer science, or mathematics</li>
            <li>At least three years of related professional experience</li>
            <li>Pass NASA's physical examination</li>
            <li>Be a U.S. citizen</li>
          </ul>
          <p>For more information, visit <a href="https://www.nasa.gov/astronauts" target="_blank">NASA's Astronaut Selection page</a>.</p>
        </div>
        <div class="col-md-4">
          <h5>Apply Now</h5>
          <form id="astronaut-form">
            <div class="mb-3">
              <label for="applicant-email" class="form-label">Your Email:</label>
              <input type="email" class="form-control" id="applicant-email" required>
            </div>
            <div class="mb-3">
              <label for="applicant-message" class="form-label">Message:</label>
              <textarea class="form-control" id="applicant-message" rows="4" placeholder="Tell us about your interest in becoming an astronaut..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary" id="submit-btn" disabled>Send Application</button>
          </form>
        </div>
      </div>
    `;
    document.getElementById('categoryModalBody').innerHTML = '';
    document.getElementById('categoryModalBody').appendChild(content);
    
    // Email validation
    const emailInput = document.getElementById('applicant-email');
    const submitBtn = document.getElementById('submit-btn');
    
    emailInput.addEventListener('input', function() {
      const email = this.value.trim();
      const isValidEmail = email.length > 0 && email.includes('@') && email.includes('.');
      submitBtn.disabled = !isValidEmail;
    });
    
    // Handle form submission
    document.getElementById('astronaut-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('applicant-email').value;
      const message = document.getElementById('applicant-message').value;
      alert(`Demo: Application would be sent to eventhorizonweb777@gmail.com\nFrom: ${email}\nMessage: ${message}\n\nNote: This requires a backend server to actually send emails.`);
    });
  }
  
  // Show modal
  let categoryModal;
  if (window.bootstrap && bootstrap.Modal) {
    categoryModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('categoryModal'));
  } else {
    categoryModal = new window.bootstrap.Modal(document.getElementById('categoryModal'));
  }
  categoryModal.show();
});

// Delegate click for photos/items inside the category modal
const categoryModalBody = document.getElementById('categoryModalBody');
categoryModalBody.addEventListener('click', function(e) {
  if (e.target.classList.contains('category-photo') || e.target.closest('.astronaut-card')) {
    let img, title, desc;
    
    if (e.target.classList.contains('category-photo')) {
      img = decodeURIComponent(e.target.getAttribute('data-img'));
      title = decodeURIComponent(e.target.getAttribute('data-title'));
      desc = decodeURIComponent(e.target.getAttribute('data-desc'));
    } else {
      const card = e.target.closest('.astronaut-card');
      img = decodeURIComponent(card.getAttribute('data-img'));
      title = decodeURIComponent(card.getAttribute('data-name'));
      desc = `Nationality: ${decodeURIComponent(card.getAttribute('data-nationality'))}\nAge: ${decodeURIComponent(card.getAttribute('data-age'))}\nHeight: ${decodeURIComponent(card.getAttribute('data-height'))}\nTime in Space: ${decodeURIComponent(card.getAttribute('data-time'))}`;
    }
    
    document.getElementById('photoModalLabel').textContent = title;
    document.getElementById('photoModalBody').innerHTML = `<img src="${img}" alt="${title}" class="img-fluid rounded mb-3"><p>${desc}</p>`;
    let photoModal;
    if (window.bootstrap && bootstrap.Modal) {
      photoModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('photoModal'));
    } else {
      photoModal = new window.bootstrap.Modal(document.getElementById('photoModal'));
    }
    photoModal.show();
  }
});

// Placeholder content for category sections
function setCategoryContent() {
  document.getElementById('space-wonders-content').innerHTML = `
    <div class="text-center">
      <h4>Space Wonders</h4>
      <p>Explore amazing NASA images and facts!</p>
      <button class="btn btn-primary open-category-btn" data-category="space-wonders">View Space Wonders</button>
    </div>
  `;
  document.getElementById('launch-station-content').innerHTML = `
    <div class="text-center">
      <h4>Launch Stations</h4>
      <p>Watch launch videos and learn about missions.</p>
      <button class="btn btn-primary open-category-btn" data-category="launch-station">View Launch Stations</button>
    </div>
  `;
  document.getElementById('solar-system-content').innerHTML = `
    <div class="text-center">
      <h4>Solar System</h4>
      <p>Discover planets and their secrets.</p>
      <button class="btn btn-primary open-category-btn" data-category="solar-system">View Solar System</button>
    </div>
  `;
  document.getElementById('discover-mars-content').innerHTML = `
    <div class="text-center">
      <h4>Discover Mars</h4>
      <p>Explore Mars rovers and discoveries!</p>
      <button class="btn btn-primary open-category-btn" data-category="discover-mars">View Mars</button>
    </div>
  `;
  document.getElementById('space-stations-content').innerHTML = `
    <div class="text-center">
      <h4>Space Stations</h4>
      <p>Learn about space stations!</p>
      <button class="btn btn-primary open-category-btn" data-category="space-stations">View Space Stations</button>
    </div>
  `;
  document.getElementById('black-holes-content').innerHTML = `
    <div class="text-center">
      <h4>Black Holes</h4>
      <p>Explore mysterious black holes!</p>
      <button class="btn btn-primary open-category-btn" data-category="black-holes">View Black Holes</button>
    </div>
  `;
  document.getElementById('astronaut-info-content').innerHTML = `
    <div class="text-center">
      <h4>Astronaut Info</h4>
      <p>Learn about astronauts and their journeys.</p>
      <button class="btn btn-primary open-category-btn" data-category="astronaut-info">View Astronaut Info</button>
    </div>
  `;
  document.getElementById('become-astronaut-content').innerHTML = `
    <div class="text-center">
      <h4>Become an Astronaut</h4>
      <p>Find out how to become an astronaut!</p>
      <button class="btn btn-primary open-category-btn" data-category="become-astronaut">View Become an Astronaut</button>
    </div>
  `;
  // Earth 3D Section - popup only
  const earthContainer = document.getElementById('earth-3d-content');
  earthContainer.innerHTML = `
    <div class="text-center">
      <h4>Interactive 3D Earth</h4>
      <p>Click the button below to explore our planet in stunning 3D</p>
      <button class="btn btn-primary btn-lg" onclick="openEarth3DModal()">View 3D Earth</button>
    </div>
  `;
}

setCategoryContent();

// --- Secondary Navbar Click Logic ---
const subNavbar = document.querySelector('.sub-navbar');
if (subNavbar) {
  subNavbar.addEventListener('click', function(e) {
    const link = e.target.closest('a.nav-link[href^="#"]');
    if (link) {
      e.preventDefault();
      const sectionId = link.getAttribute('href').replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        // Simulate a click on the section to trigger the popup
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          section.dispatchEvent(new Event('click', { bubbles: true }));
        }, 300);
      }
    }
  });
}

// Navigation is now scrollable without arrows

// 3D Earth implementation with Three.js and OrbitControls
function initEarth3D() {
    const container = document.getElementById('earth-3d-container');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // smooth rotation
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;    // auto-rotate when idle
    controls.autoRotateSpeed = 0.5;
    earthControls = controls; // Store reference for controls

    // Simple Earth sphere (blue)
    const earthGeometry = new THREE.SphereGeometry(1, 48, 48);
    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2986cc, shininess: 30 });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthMesh = earth; // Store reference for controls

    // Simple atmosphere (white, semi-transparent)
    const atmosphereGeometry = new THREE.SphereGeometry(1.04, 48, 48);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, shininess: 80 });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    camera.position.z = 3;

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Responsive resizing
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Update astronaut display with better nationality visibility
function displayAstronauts(astronauts) {
    const container = document.getElementById('astronaut-info-content');
    if (!container) return;

    const astronautCards = astronauts.map(astronaut => `
        <div class="astronaut-card">
            <div class="astronaut-name">${astronaut.name}</div>
            <div class="astronaut-nationality">${astronaut.nationality}</div>
            <div class="astronaut-missions">Missions: ${astronaut.missions || 'N/A'}</div>
        </div>
    `).join('');

    container.innerHTML = astronautCards;
}

// Update become astronaut section without the note
function displayBecomeAstronaut() {
    const container = document.getElementById('become-astronaut-content');
    if (!container) return;

    container.innerHTML = `
        <div class="form-container">
            <h3>Start Your Journey to Space</h3>
            <p>Fill out the form below to begin your astronaut application process.</p>
            
            <form id="astronaut-form">
                <div class="mb-3">
                    <label for="name" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="name" required>
                </div>
                
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" required>
                </div>
                
                <div class="mb-3">
                    <label for="age" class="form-label">Age</label>
                    <input type="number" class="form-control" id="age" min="18" max="65" required>
                </div>
                
                <div class="mb-3">
                    <label for="education" class="form-label">Education Level</label>
                    <select class="form-control" id="education" required>
                        <option value="">Select Education Level</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="phd">PhD</option>
                    </select>
                </div>
                
                <div class="mb-3">
                    <label for="experience" class="form-label">Professional Experience (years)</label>
                    <input type="number" class="form-control" id="experience" min="0" required>
                </div>
                
                <div class="mb-3">
                    <label for="motivation" class="form-label">Why do you want to become an astronaut?</label>
                    <textarea class="form-control" id="motivation" rows="4" required></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary">Submit Application</button>
            </form>
        </div>
    `;

    // Form submission handler
    document.getElementById('astronaut-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your application! We will review your information and contact you soon.');
        this.reset();
    });
}

// Global variables for 3D Earth controls
let earthMesh = null;
let earthControls = null;

// 3D Earth control functions
function resetEarthView() {
    if (earthControls) {
        earthControls.reset();
    }
    if (window.earth3DInstance && window.earth3DInstance.controls) {
        window.earth3DInstance.controls.reset();
    }
}

function toggleRotation() {
    if (earthControls) {
        earthControls.autoRotate = !earthControls.autoRotate;
        const button = event.target;
        button.textContent = earthControls.autoRotate ? 'Stop Rotation' : 'Start Rotation';
    }
    if (window.earth3DInstance && window.earth3DInstance.controls) {
        window.earth3DInstance.controls.autoRotate = !window.earth3DInstance.controls.autoRotate;
        const button = event.target;
        button.textContent = window.earth3DInstance.controls.autoRotate ? 'Stop Rotation' : 'Start Rotation';
    }
}

// Earth 3D Modal and related functions
function openEarth3DModal() {
  const modal = document.getElementById('categoryModal');
  const modalTitle = document.getElementById('categoryModalLabel');
  const modalBody = document.getElementById('categoryModalBody');
  
  modalTitle.textContent = 'Interactive 3D Earth';
  modalBody.innerHTML = `
    <div class="text-center">
      <p class="mb-3">Click and drag to rotate the Earth in 3D. Use mouse wheel to zoom.</p>
      <div id="earth-3d-modal-container" style="width: 100%; height: 500px; background: #000; border-radius: 10px; position: relative; overflow: hidden;">
        <div class="earth-controls" style="position: absolute; top: 10px; right: 10px; z-index: 10;">
          <button onclick="resetEarthView()" class="btn btn-sm btn-outline-light me-2">Reset View</button>
          <button onclick="toggleRotation()" class="btn btn-sm btn-outline-light">Stop Rotation</button>
        </div>
      </div>
    </div>
  `;
  
  // Show modal
  let categoryModal;
  if (window.bootstrap && bootstrap.Modal) {
    categoryModal = bootstrap.Modal.getOrCreateInstance(modal);
  } else {
    categoryModal = new window.bootstrap.Modal(modal);
  }
  categoryModal.show();
  
  // Initialize 3D Earth after modal is shown
  setTimeout(() => {
    const container = document.getElementById('earth-3d-modal-container');
    if (container && typeof createAdvancedEarth3D === 'function') {
      window.earth3DInstance = createAdvancedEarth3D(container);
    } else {
      initEarth3D();
    }
  }, 100);
}

function showEarthFacts() {
  const modal = document.getElementById('categoryModal');
  const modalTitle = document.getElementById('categoryModalLabel');
  const modalBody = document.getElementById('categoryModalBody');
  
  modalTitle.textContent = 'Earth Facts';
  modalBody.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <h5>Physical Characteristics</h5>
        <ul>
          <li><strong>Diameter:</strong> 12,742 km (7,918 miles)</li>
          <li><strong>Mass:</strong> 5.97 × 10²⁴ kg</li>
          <li><strong>Surface Area:</strong> 510 million km²</li>
          <li><strong>Average Distance from Sun:</strong> 149.6 million km</li>
          <li><strong>Orbital Period:</strong> 365.25 days</li>
          <li><strong>Rotation Period:</strong> 23 hours, 56 minutes</li>
        </ul>
      </div>
      <div class="col-md-6">
        <h5>Atmosphere</h5>
        <ul>
          <li><strong>Nitrogen:</strong> 78%</li>
          <li><strong>Oxygen:</strong> 21%</li>
          <li><strong>Argon:</strong> 0.93%</li>
          <li><strong>Carbon Dioxide:</strong> 0.04%</li>
          <li><strong>Other gases:</strong> 0.03%</li>
        </ul>
        <h5>Interesting Facts</h5>
        <ul>
          <li>Earth is the only known planet with life</li>
          <li>71% of Earth's surface is covered by water</li>
          <li>Earth's magnetic field protects us from solar radiation</li>
          <li>The Moon stabilizes Earth's axial tilt</li>
        </ul>
      </div>
    </div>
  `;
  
  let categoryModal;
  if (window.bootstrap && bootstrap.Modal) {
    categoryModal = bootstrap.Modal.getOrCreateInstance(modal);
  } else {
    categoryModal = new window.bootstrap.Modal(modal);
  }
  categoryModal.show();
}

function showClimateInfo() {
  const modal = document.getElementById('categoryModal');
  const modalTitle = document.getElementById('categoryModalLabel');
  const modalBody = document.getElementById('categoryModalBody');
  
  modalTitle.textContent = 'Earth\'s Climate Systems';
  modalBody.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <h5>Climate Zones</h5>
        <ul>
          <li><strong>Tropical:</strong> Near equator, warm year-round</li>
          <li><strong>Subtropical:</strong> Hot summers, mild winters</li>
          <li><strong>Temperate:</strong> Four distinct seasons</li>
          <li><strong>Polar:</strong> Very cold, long winters</li>
        </ul>
        <h5>Ocean Currents</h5>
        <p>Ocean currents distribute heat around the globe, affecting weather patterns and climate.</p>
      </div>
      <div class="col-md-6">
        <h5>Atmospheric Circulation</h5>
        <ul>
          <li><strong>Trade Winds:</strong> Steady winds near equator</li>
          <li><strong>Westerlies:</strong> Winds in mid-latitudes</li>
          <li><strong>Polar Easterlies:</strong> Cold winds near poles</li>
        </ul>
        <h5>Climate Change</h5>
        <p>Human activities are causing global temperatures to rise, leading to climate change with significant environmental impacts.</p>
      </div>
    </div>
  `;
  
  let categoryModal;
  if (window.bootstrap && bootstrap.Modal) {
    categoryModal = bootstrap.Modal.getOrCreateInstance(modal);
  } else {
    categoryModal = new window.bootstrap.Modal(modal);
  }
  categoryModal.show();
}

// NASA APOD API Integration
async function loadNASAAPOD() {
    const apodContent = document.getElementById('apod-content');
    if (!apodContent) return;
    
    try {
        // Using a demo API key - in production, you'd use your own NASA API key
        const apiKey = 'DEMO_KEY'; // Replace with your NASA API key
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch NASA APOD');
        }
        
        const data = await response.json();
        
        apodContent.innerHTML = `
            <div class="apod-card">
                <h3 class="apod-title mb-3">${data.title}</h3>
                <div class="apod-image-container mb-3">
                    <img src="${data.url}" alt="${data.title}" class="apod-image img-fluid rounded shadow">
                </div>
                <p class="apod-date mb-3"><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
                <p class="apod-explanation">${data.explanation}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching NASA APOD:', error);
        apodContent.innerHTML = `
            <div class="alert alert-warning">
                <h4>Unable to load NASA APOD</h4>
                <p>Please check your internet connection or try again later.</p>
                <p><small>Note: This uses a demo API key. For production use, get your own NASA API key from <a href="https://api.nasa.gov/" target="_blank">api.nasa.gov</a></small></p>
            </div>
        `;
    }
}

// Initialize 3D Earth when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load NASA APOD
    loadNASAAPOD();
    
    // Set category content
    setCategoryContent();
    
    // Initialize 3D Earth
    initEarth3D();
    
    // Navigation is now scrollable without arrows
    console.log('Navigation toolbar is now scrollable');
});

// Add event listeners for category buttons
setTimeout(() => {
  document.querySelectorAll('.open-category-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const sectionId = this.getAttribute('data-category');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        section.click();
      }
    });
  });
}, 0); 