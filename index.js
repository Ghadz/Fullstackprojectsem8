// Sample data to simulate API content (replace later with real fetch)
const proverbs = [
  {
    name: "Buzz Aldrin",
    quote: "Mars is there, waiting to be reached.",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Buzz_Aldrin.jpg"
  },
  {
    name: "Stephen Hawking",
    quote: "Look up at the stars and not down at your feet.",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Stephen_Hawking.StarChild.jpg"
  },
  {
    name: "Neil Armstrong",
    quote: "One small step for man, one giant leap for mankind.",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Neil_Armstrong_pose.jpg"
  }
];

const features = [
  {
    title: "The First SpaceX Launch",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Falcon_Heavy_Demo_Mission_%2839562600325%29.jpg",
    desc: "The first launch of Falcon Heavy by SpaceX marked a major milestone in commercial spaceflight."
  },
  {
    title: "Jupiter – The Giant Planet",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter_from_Voyager_1.jpg",
    desc: "Jupiter is the largest planet in our solar system, with 79 moons and powerful storms."
  },
  {
    title: "Apollo 11 – First Moon Landing",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Apollo_11_Lunar_Module_on_the_Moon.jpg",
    desc: "Apollo 11 was the spaceflight that first landed humans on the Moon in 1969."
  }
];

// Load Proverbs
const proverbsSection = document.getElementById("proverbs-section");
proverbs.forEach(p => {
  proverbsSection.innerHTML += `
    <div class="col-md-4 mb-4">
      <img src="${p.img}" class="quote-img mb-2" alt="${p.name}">
      <p><em>"${p.quote}"</em><br><strong>- ${p.name}</strong></p>
    </div>
  `;
});

// Load Features
const featuresSection = document.getElementById("features-section");
features.forEach((f, i) => {
  featuresSection.innerHTML += `
    <div class="col-md-4 mb-4">
      <a href="#" class="photo-link" onclick="showModal('${f.title}', '${f.img}', '${f.desc}')">
        <img src="${f.img}" class="quote-img" alt="${f.title}">
        <p class="mt-2">${f.title}</p>
      </a>
    </div>
  `;
});

// Modal popup logic
function showModal(title, img, desc) {
  document.getElementById("infoModalLabel").innerText = title;
  document.getElementById("modalImage").src = img;
  document.getElementById("modalDescription").innerText = desc;
  const modal = new bootstrap.Modal(document.getElementById("infoModal"));
  modal.show();
}
