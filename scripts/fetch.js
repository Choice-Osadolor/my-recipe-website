// //THIS IS THE GPT WORKING VERSION OF CRUD.JS, FOR COMPASRISON IN GUARDING AND TESTING PURPOSES. THIS FILE IS NOT USED IN THE PROJECT, AND MAY BE DELETED IN THE FUTURE.

// // =========================
// // Kitchen Space CRUD (SAFE)
// // =========================

// // ---------- Helpers ----------
// function getRecipes() {
//   return JSON.parse(localStorage.getItem("recipes")) || [];
// }

// function saveRecipes(data) {
//   const recipes = getRecipes();
//   const recipe = {
//     id: crypto.randomUUID(),
//     name: "",
//     description: "",
//     duration: "",
//     thumbnail: "",
//     ingredients: [],
//     instructions: [],
//     ...data
//   };

//   recipes.push(recipe);
//   localStorage.setItem("recipes", JSON.stringify(recipes));
//   return recipe;
// }

// // Add dynamic input (ingredients / instructions)
// function addInput(item) {
//   const input = document.createElement("input");
//   input.type = "text";
//   input.name = item;
//   input.className = `recipe_${item}`;
//   input.placeholder = `Add an ${item}`;
//   input.required = true; // ✅ correct way

//   const holder = document.querySelector(`#${item}_inputs`);
//   if (!holder) {
//     console.warn(`Missing #${item}_inputs`);
//     return;
//   }
//   holder.append(input);
// }

// // ---------- Card Template Renderer (List/Admin Page) ----------
// function createproduct(id) {
//   const recipes = getRecipes();
//   const recipe = recipes.find(rcp => rcp.id === id);
//   if (!recipe) return null;

//   const template = document.querySelector("#template");
//   if (!template) return null; // template doesn't exist on detail page

//   const clone = template.content.cloneNode(true);

//   const card = clone.querySelector(".recipe_card");
//   if (card) card.id = recipe.id;

//   const nameEl = clone.querySelector(".name");
//   if (nameEl) nameEl.textContent = recipe.name ?? "";

//   const descEl = clone.querySelector(".description");
//   if (descEl) descEl.textContent = recipe.description ?? "";

//   const thumbEl = clone.querySelector(".thumbnail");
//   if (thumbEl) thumbEl.src = recipe.thumbnail ?? "";

//   const durEl = clone.querySelector(".duration");
//   if (durEl) durEl.textContent = recipe.duration ?? "";

//   // ✅ link to detail page with query param
//   const viewBtn = clone.querySelector(".viewrecipe_btn");
//   if (viewBtn) viewBtn.href = `recipepage.html?id=${recipe.id}`;

//   // Safe arrays
//   const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
//   const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : [];

//   const list = clone.querySelector(".ingredients_list");
//   if (list) {
//     list.innerHTML = "";
//     ingredients.filter(Boolean).forEach(ingredient => {
//       const li = document.createElement("li");
//       li.textContent = ingredient;
//       list.appendChild(li);
//     });
//   }

//   const list2 = clone.querySelector(".instructions_list");
//   if (list2) {
//     list2.innerHTML = "";
//     instructions.filter(Boolean).forEach(instruction => {
//       const li = document.createElement("li");
//       li.textContent = instruction;
//       list2.appendChild(li);
//     });
//   }

//   return clone;
// }

// // ---------- Render All Recipes (List/Admin Page) ----------
// function renderAllRecipes() {
//   const container = document.querySelector("#container");
//   if (!container) return; // ✅ guard FIRST

//   container.innerHTML = "";

//   const recipes = getRecipes();
//   for (const recipe of recipes) {
//     const clone = createproduct(recipe.id);
//     if (clone) container.appendChild(clone);
//   }
// }

// // Append just-created recipe to list page (optional)
// function appendProduct(recipeId) {
//   const container = document.querySelector("#container");
//   if (!container) return;

//   const node = createproduct(recipeId);
//   if (node) container.appendChild(node);
// }

// // ---------- Render One Recipe (Detail Page) ----------
// function renderRecipeDetail() {
//   const container = document.querySelector("#fullrecipe_container");
//   if (!container) return; // not on detail page

//   const recipeid = new URLSearchParams(window.location.search).get("id");
//   if (!recipeid) {
//     container.textContent = "No recipe id in URL.";
//     return;
//   }

//   const recipe = getRecipes().find(r => r.id === recipeid);
//   if (!recipe) {
//     container.textContent = "Recipe not found.";
//     return;
//   }

//   // Fill detail-page DOM (your detail HTML has these)
//   const nameEl = container.querySelector(".name");
//   if (nameEl) nameEl.textContent = recipe.name ?? "";

//   const descEl = container.querySelector(".description");
//   if (descEl) descEl.textContent = recipe.description ?? "";

//   const thumbEl = container.querySelector(".thumbnail");
//   if (thumbEl) thumbEl.src = recipe.thumbnail ?? "";

//   const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
//   const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : [];

//   const ingredientsList = container.querySelector(".ingredients_list");
//   if (ingredientsList) {
//     ingredientsList.innerHTML = "";
//     ingredients.filter(Boolean).forEach(ingredient => {
//       const li = document.createElement("li");
//       li.textContent = ingredient;
//       ingredientsList.appendChild(li);
//     });
//   }

//   const instructionsList = container.querySelector(".instructions_list");
//   if (instructionsList) {
//     instructionsList.innerHTML = "";
//     instructions.filter(Boolean).forEach(instruction => {
//       const li = document.createElement("li");
//       li.textContent = instruction;
//       instructionsList.appendChild(li);
//     });
//   }
// }

// // ---------- DELETE (Optional) ----------
// function deleteRecipeByName(name) {
//   const recipes = getRecipes();
//   const updated = recipes.filter(rcp => rcp.name !== name);
//   localStorage.setItem("recipes", JSON.stringify(updated));
// }

// function wireDeleteUI() {
//   const button = document.querySelector("#delete_btn");
//   const input = document.querySelector("#delete_item");
//   if (!button || !input) return; // ✅ guard

//   button.addEventListener("click", function () {
//     const name = input.value;
//     deleteRecipeByName(name);

//     // re-render list if we're on list page
//     renderAllRecipes();
//   });
// }

// // ---------- FORM (Create) ----------
// function wireFormUI() {
//   const form = document.querySelector("#recipe_form");
//   if (!form) return; // ✅ guard

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const nm = document.querySelector("#recipe_name")?.value?.trim() ?? "";
//     const dscrp = document.querySelector("#recipe_description")?.value?.trim() ?? "";
//     const drtn = document.querySelector("#recipe_duration")?.value?.trim() ?? "";
//     const rcp_thm = document.querySelector("#recipe_thumbnail")?.value?.trim() ?? "";

//     const ingrd = document.querySelectorAll(".recipe_ingredients");
//     const instrc = document.querySelectorAll(".recipe_instructions");

//     const ingredients_array = Array.from(ingrd)
//       .map(el => el.value.trim())
//       .filter(Boolean);

//     const instructions_array = Array.from(instrc)
//       .map(el => el.value.trim())
//       .filter(Boolean);

//     // extra validation for dynamic fields
//     if (ingredients_array.length === 0 || instructions_array.length === 0) {
//       alert("Please add at least 1 ingredient and 1 instruction.");
//       return;
//     }

//     const data = {
//       name: nm,
//       description: dscrp,
//       duration: drtn,
//       thumbnail: rcp_thm,
//       ingredients: ingredients_array,
//       instructions: instructions_array
//     };

//     const saved = saveRecipes(data);

//     // Update UI on list page
//     appendProduct(saved.id);

//     form.reset();
//   });
// }

// // ---------- Boot ----------
// document.addEventListener("DOMContentLoaded", () => {
//   // Only runs where elements exist
//   renderAllRecipes();       // list/admin page
//   renderRecipeDetail();     // detail page

//   wireFormUI();             // admin page
//   wireDeleteUI();           // wherever delete UI exists
// });

const header = '../header.html';
fetch(header)
.then(res=>res.text())
.then(data=>{
    document.querySelector('header').innerHTML=data;
})

