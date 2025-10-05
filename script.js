const addPlantBtn = document.getElementById('addPlant');
const plantList = document.getElementById('plantList');

let plants = JSON.parse(localStorage.getItem('plants')) || [];

function displayPlants() {
  plantList.innerHTML = '';
  plants.forEach((plant, index) => {
    const div = document.createElement('div');
    div.className = 'plant-card';
    div.innerHTML = `
      <strong>${plant.name}</strong> (${plant.type})<br>
      💧 Water every ${plant.water} days<br>
      ☀️ Needs ${plant.sunlight} hours of sunlight<br>
      <button onclick="removePlant(${index})">❌ Remove</button>
    `;
    plantList.appendChild(div);
  });
}

function getPlantInfo(type) {
  const data = {
    succulent: { water: 10, sunlight: 6 },
    flower: { water: 3, sunlight: 5 },
    herb: { water: 4, sunlight: 4 },
    tree: { water: 7, sunlight: 8 }
  };
  return data[type] || { water: 5, sunlight: 5 };
}

addPlantBtn.addEventListener('click', () => {
  const name = document.getElementById('plantName').value.trim();
  const type = document.getElementById('plantType').value;

  if (!name || !type) {
    alert('Please enter plant name and select type!');
    return;
  }

  const { water, sunlight } = getPlantInfo(type);
  plants.push({ name, type, water, sunlight });
  localStorage.setItem('plants', JSON.stringify(plants));
  displayPlants();

  document.getElementById('plantName').value = '';
  document.getElementById('plantType').value = '';
});

function removePlant(index) {
  plants.splice(index, 1);
  localStorage.setItem('plants', JSON.stringify(plants));
  displayPlants();
}

displayPlants();
