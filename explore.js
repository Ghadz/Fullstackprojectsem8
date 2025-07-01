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
  'astronaut-info': 'astronauts',
  'become-astronaut': 'application'
};

// Well-known astronauts data
const astronauts = [
  { name: "Neil Armstrong", nationality: "American", age: "82 (1930-2012)", height: "5'11\"", timeInSpace: "8 days 14 hours", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Neil_Armstrong_pose.jpg/330px-Neil_Armstrong_pose.jpg" },
  { name: "Buzz Aldrin", nationality: "American", age: "94", height: "5'10\"", timeInSpace: "12 days 1 hour", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Buzz_Aldrin.jpg/330px-Buzz_Aldrin.jpg" },
  { name: "Yuri Gagarin", nationality: "Soviet", age: "34 (1934-1968)", height: "5'2\"", timeInSpace: "1 hour 48 minutes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Yuri_Gagarin_in_Sweden.jpg/330px-Yuri_Gagarin_in_Sweden.jpg" },
  { name: "Valentina Tereshkova", nationality: "Soviet", age: "87", height: "5'4\"", timeInSpace: "2 days 22 hours", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Valentina_Tereshkova.jpg/330px-Valentina_Tereshkova.jpg" },
  { name: "John Glenn", nationality: "American", age: "95 (1921-2016)", height: "5'10\"", timeInSpace: "9 days 2 hours", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/John_Glenn.jpg/330px-John_Glenn.jpg" },
  { name: "Sally Ride", nationality: "American", age: "61 (1951-2012)", height: "5'5\"", timeInSpace: "14 days 7 hours", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Sally_Ride.jpg/330px-Sally_Ride.jpg" },
  { name: "Chris Hadfield", nationality: "Canadian", age: "65", height: "5'9\"", timeInSpace: "166 days", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Chris_Hadfield.jpg/330px-Chris_Hadfield.jpg" },
  { name: "Mae Jemison", nationality: "American", age: "68", height: "5'4\"", timeInSpace: "7 days 22 hours", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mae_Jemison.jpg/330px-Mae_Jemison.jpg" },
  { name: "Scott Kelly", nationality: "American", age: "60", height: "5'8\"", timeInSpace: "520 days", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Scott_Kelly.jpg/330px-Scott_Kelly.jpg" },
  { name: "Peggy Whitson", nationality: "American", age: "64", height: "5'4\"", timeInSpace: "665 days", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Peggy_Whitson.jpg/330px-Peggy_Whitson.jpg" },
  { name: "Tim Peake", nationality: "British", age: "52", height: "6'0\"", timeInSpace: "185 days", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Tim_Peake.jpg/330px-Tim_Peake.jpg" },
  { name: "Samantha Cristoforetti", nationality: "Italian", age: "47", height: "5'6\"", timeInSpace: "199 days", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Samantha_Cristoforetti.jpg/330px-Samantha_Cristoforetti.jpg" },
  { name: "Andreas Mogensen", nationality: "Danish", age: "47", height: "6'0\"", timeInSpace: "9 days", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Andreas_Mogensen.jpg/330px-Andreas_Mogensen.jpg" },
  { name: "Soyeon Yi", nationality: "South Korean", age: "44", height: "5'3\"", timeInSpace: "10 days 21 hours", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Soyeon_Yi.jpg/330px-Soyeon_Yi.jpg" },
  { name: "Liu Yang", nationality: "Chinese", age: "45", height: "5'4\"", timeInSpace: "13 days", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Liu_Yang.jpg/330px-Liu_Yang.jpg" }
];

// Solar system planets data
const planets = [
  { name: "Mercury", desc: "The smallest and innermost planet in the Solar System. It has no moons and is the closest planet to the Sun.", image: "https://www.nasa.gov/sites/default/files/thumbnails/image/pia11245.jpg" },
  { name: "Venus", desc: "The second planet from the Sun and Earth's closest planetary neighbor. It's often called Earth's twin due to similar size.", image: "https://www.nasa.gov/sites/default/files/thumbnails/image/pia00271.jpg" },
  { name: "Earth", desc: "Our home planet and the only known planet with life. It has one natural satellite - the Moon.", image: "https://www.nasa.gov/sites/default/files/thumbnails/image/iss068e027167.jpg" },
  { name: "Mars", desc: "The fourth planet from the Sun, often called the Red Planet due to its reddish appearance.", image: "https://www.nasa.gov/sites/default/files/thumbnails/image/pia22567.jpg" },
  { name: "Jupiter", desc: "The largest planet in our Solar System. It's a gas giant with a Great Red Spot storm.", image: "https://www.nasa.gov/sites/default/files/thumbnails/image/pia22946-16.jpg" },
  { name: "Saturn", desc: "Known for its spectacular ring system. It's the second-largest planet in our Solar System.", image: "https://www.nasa.gov/sites/default/files/thumbnails/image/pia11141.jpg" },
  { name: "Uranus", desc: "The seventh planet from the Sun, an ice giant with a tilted axis of rotation.", image: "https://www.nasa.gov/sites/default/files/thumbnails/image/pia18182.jpg" },
  { name: "Neptune", desc: "The eighth and farthest known planet from the Sun. It's also an ice giant.", image: "https://www.nasa.gov/sites/default/files/thumbnails/image/pia01492.jpg" }
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
    grid.className = 'row gallery-grid';
    images.forEach((item, idx) => {
      const imgUrl = item.links && item.links[0] ? item.links[0].href : '';
      const title = item.data && item.data[0] ? item.data[0].title : 'NASA Image';
      const desc = item.data && item.data[0] ? item.data[0].description : '';
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-3';
      col.innerHTML = `<img src="${imgUrl}" alt="${title}" class="img-fluid rounded shadow-sm category-photo" style="cursor:pointer;" data-title="${encodeURIComponent(title)}" data-desc="${encodeURIComponent(desc)}" data-img="${encodeURIComponent(imgUrl)}">`;
      grid.appendChild(col);
    });
    
    // Add SpaceX info for launch station
    if (sectionId === 'launch-station') {
      try {
        const spacexResponse = await fetch('https://api.spacexdata.com/v4/launches/upcoming');
        const spacexData = await spacexResponse.json();
        if (spacexData.length > 0) {
          const nextLaunch = spacexData[0];
          const launchInfo = document.createElement('div');
          launchInfo.className = 'alert alert-info mt-3';
          launchInfo.innerHTML = `<strong>Next SpaceX Launch:</strong> ${nextLaunch.name} - ${new Date(nextLaunch.date_unix * 1000).toLocaleDateString()}`;
          grid.appendChild(launchInfo);
        }
      } catch (e) {
        console.log('SpaceX API not available');
      }
    }
    
    document.getElementById('categoryModalBody').innerHTML = '';
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
    
  } else if (sectionId === 'astronaut-info') {
    // Show astronauts
    const grid = document.createElement('div');
    grid.className = 'row gallery-grid';
    astronauts.forEach(astronaut => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-3';
      col.innerHTML = `
        <div class="astronaut-card" style="cursor:pointer;" data-name="${encodeURIComponent(astronaut.name)}" data-nationality="${encodeURIComponent(astronaut.nationality)}" data-age="${encodeURIComponent(astronaut.age)}" data-height="${encodeURIComponent(astronaut.height)}" data-time="${encodeURIComponent(astronaut.timeInSpace)}" data-img="${encodeURIComponent(astronaut.image)}">
          <img src="${astronaut.image}" alt="${astronaut.name}" class="img-fluid rounded shadow-sm" style="width: 100%; height: 200px; object-fit: cover;">
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
      // In a real app, you'd send this to your server
      alert(`Application sent! We'll contact you at ${email} soon.`);
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