document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("table-body"); 
    const dogForm = document.getElementById("dog-form"); 
  
    let currentDogId = null;g
  
   
    function fetchDogs() {
      fetch("http://localhost:3000/dogs")
        .then((res) => res.json())
        .then((dogs) => {
          tableBody.innerHTML = ""; 
          dogs.forEach((dog) => renderDogRow(dog)); 
        });
    }
  
    function renderDogRow(dog) {
      const tr = document.createElement("tr");
  
      tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button class="edit-btn" data-id="${dog.id}">Edit</button></td>
      `;
  
      tr.querySelector(".edit-btn").addEventListener("click", () => loadDogForEdit(dog));
  
      tableBody.appendChild(tr);
    }
  
    function loadDogForEdit(dog) {
      dogForm.name.value = dog.name;
      dogForm.breed.value = dog.breed;
      dogForm.sex.value = dog.sex;
      currentDogId = dog.id; 
    }
  
   
    dogForm.addEventListener("submit", (e) => {
      e.preventDefault(); 
  
      if (!currentDogId) return; 
  
      const updatedDog = {
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value
      };
  
      fetch(`http://localhost:3000/dogs/${currentDogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDog),
      })
        .then((res) => res.json())
        .then(() => {
          fetchDogs(); 
          dogForm.reset();
          currentDogId = null; 
        });
    });
  
    fetchDogs();
  });
  