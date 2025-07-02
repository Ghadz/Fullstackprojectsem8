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

// Space stations data
const spaceStations = [
  { name: "International Space Station (ISS)", desc: "The largest modular space station in low Earth orbit, a multinational collaborative project involving five space agencies.", image: "https://images-assets.nasa.gov/image/iss068e027167/iss068e027167~orig.jpg" },
  { name: "Mir Space Station", desc: "The first modular space station, assembled in orbit from 1986 to 1996, operated by the Soviet Union and later Russia.", image: "https://images-assets.nasa.gov/image/STS091-705-035/STS091-705-035~orig.jpg" },
  { name: "Tiangong Space Station", desc: "China's modular space station, currently under construction in low Earth orbit.", image: "https://images-assets.nasa.gov/image/iss068e027168/iss068e027168~orig.jpg" },
  { name: "Skylab", desc: "America's first space station, operated from 1973 to 1979, conducting hundreds of experiments in microgravity.", image: "https://images-assets.nasa.gov/image/SL2-07-190/SL2-07-190~orig.jpg" }
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
        const spacexResponse = await fetch('https://api.spacexdata.com/v4/launches/upcoming');
        const spacexData = await spacexResponse.json();
        if (spacexData.length > 0) {
          const nextLaunch = spacexData[0];
          const launchInfo = document.createElement('div');
          launchInfo.className = 'alert alert-info mb-3';
          launchInfo.innerHTML = `<strong>🚀 Next SpaceX Launch:</strong> ${nextLaunch.name} - ${new Date(nextLaunch.date_unix * 1000).toLocaleDateString()}`;
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
    
    const grid = document.createElement('div');
    grid.className = 'row'; // Removed gallery-grid class to eliminate double scrollbar
    images.forEach((item, idx) => {
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
    // Show Mars rovers and discoveries
    const grid = document.createElement('div');
    grid.className = 'row gallery-grid';
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
    spaceStations.forEach(station => {
      const col = document.createElement('div');
      col.className = 'col-md-6 mb-3';
      col.innerHTML = `
        <div class="station-card" style="cursor:pointer;" data-name="${encodeURIComponent(station.name)}" data-desc="${encodeURIComponent(station.desc)}" data-img="${encodeURIComponent(station.image)}">
          <img src="${station.image}" alt="${station.name}" class="img-fluid rounded shadow-sm" style="width: 100%; height: 200px; object-fit: cover;">
          <h5 class="mt-2">${station.name}</h5>
        </div>
      `;
      grid.appendChild(col);
    });
    document.getElementById('categoryModalBody').innerHTML = '';
    document.getElementById('categoryModalBody').appendChild(grid);
    
  } else if (sectionId === 'earth-3d') {
    // Show 3D Earth with rotation
    const content = document.createElement('div');
    content.innerHTML = `
      <div class="text-center">
        <h4>Interactive 3D Earth</h4>
        <p>Click and drag to rotate the Earth in 3D</p>
        <div id="earth-3d-container" style="width: 100%; height: 400px; background: #000; border-radius: 10px; position: relative; overflow: hidden;">
          <div id="earth-3d-sphere" style="width: 200px; height: 200px; background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/330px-The_Earth_seen_from_Apollo_17.jpg') center/cover; border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); cursor: grab; transition: transform 0.1s ease;"></div>
        </div>
        <p class="mt-3"><small>Note: This is a simplified 3D representation. For full 3D experience, consider using WebGL libraries like Three.js.</small></p>
      </div>
    `;
    document.getElementById('categoryModalBody').innerHTML = '';
    document.getElementById('categoryModalBody').appendChild(content);
    
    // Simple 3D rotation effect
    const earthSphere = document.getElementById('earth-3d-sphere');
    let isDragging = false;
    let startX = 0;
    let rotationY = 0;
    
    earthSphere.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      earthSphere.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - startX;
        rotationY += deltaX * 0.5;
        earthSphere.style.transform = `translate(-50%, -50%) rotateY(${rotationY}deg)`;
        startX = e.clientX;
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
      earthSphere.style.cursor = 'grab';
    });
    
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
          <p class="text-muted">${astronaut.nationality}</p>
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
            <button type="submit" class="btn btn-primary">Send Application</button>
          </form>
          <div class="alert alert-info mt-3">
            <small><strong>Note:</strong> This is a demo form. In a real application, you would need a backend server to actually send emails to eventhorizonweb777@gmail.com</small>
          </div>
        </div>
      </div>
    `;
    document.getElementById('categoryModalBody').innerHTML = '';
    document.getElementById('categoryModalBody').appendChild(content);
    
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
  document.getElementById('space-wonders-content').textContent = 'Explore amazing NASA images and facts!';
  document.getElementById('launch-station-content').textContent = 'Watch launch videos and learn about missions.';
  document.getElementById('solar-system-content').textContent = 'Discover planets and their secrets.';
  document.getElementById('astronaut-info-content').textContent = 'Learn about astronauts and their journeys.';
  document.getElementById('become-astronaut-content').textContent = 'Find out how to become an astronaut!';
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