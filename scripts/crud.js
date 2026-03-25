// Create Read, Update, Delete Operations


                                      // CREATE

//Save admin Input to data table
function saveRecipes(data){
const recipes = getRecipes();

const recipe = {
    id: crypto.randomUUID(),
    name:"",
    description:"",
    thumbnail:"",
    duration:"",
    ingredients:[],
    instructions:[],
    ...data
};
recipes.push(recipe);

localStorage.setItem("recipes", JSON.stringify(recipes));
return recipe;
}
// Take Admin Input
function adminInput(){
const form=document.querySelector('#recipe_form');

if(!form) return;

form.addEventListener('submit',function(e){
    e.preventDefault();
    const nm=document.querySelector('#recipe_name').value;
    const dscrp=document.querySelector('#recipe_description').value;
    const drtn=document.querySelector('#recipe_duration').value;
    const rcp_thm=document.querySelector('#recipe_thumbnail').value;
    const ingrd=document.querySelectorAll('.recipe_ingredients');
    const instrc=document.querySelectorAll('.recipe_instructions');
    
    const ingredients_array = Array.from(ingrd).map(function(element){
    return element.value;
});
    const instructions_array = Array.from(instrc).map(function(element){
    return element.value;
});


    const data={
        name:nm,
        description:dscrp,
        duration:drtn,
        thumbnail:rcp_thm,
        ingredients:ingredients_array,
        instructions:instructions_array
    }

    const saveRcp=saveRecipes(data);
    appendProduct(saveRcp.id);
    form.reset();
    
});
}



                                     //READ

//retrive info from data table
const getRecipes=function(){
    return JSON.parse(localStorage.getItem("recipes")) || [];

}

const addInput=function(item){
    const input=document.createElement('input');
    input.type='text';
    input.name=item;
    input.className=`recipe_${item}`;
    input.placeholder=`Add an ${item}`;
    input.required=true;

    document.querySelector(`#${item}_inputs`).append(input);
};


//create _ from template, and append to container

const createproduct=function(id){
const recipes=getRecipes();
const recipe=recipes.find(rcp=>rcp.id===id);
const template = document.querySelector('#template');
if(!recipe) return null;
if(!template) return null;

const clone=template.content.cloneNode(true);

const card=clone.querySelector('.recipe_card');
if(card) card.id=recipe.id;

const name=clone.querySelector('.name')
if(name) name.textContent=recipe.name;

const description=clone.querySelector('.description');
if(description) description.textContent=recipe.description;

const thumbnail=clone.querySelector('.thumbnail');
if(thumbnail) thumbnail.src=recipe.thumbnail;

const duration=clone.querySelector('.duration');
if(duration) duration.textContent=recipe.duration;

const viewBtn=clone.querySelector('.viewrecipe_btn');
if(viewBtn) viewBtn.href=`recipepage.html?id=${recipe.id}`;


//Ingredient List
const list = clone.querySelector('.ingredients_list');
if(list){
    list.innerHTML = ""; // clear template leftovers
    recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    list.appendChild(li);
});
}

//Instructions List
const list2 = clone.querySelector('.instructions_list');
if(list2){
    list2.innerHTML = ""; // clear template leftovers
    recipe.instructions.forEach(instruction => {
    const li = document.createElement('li');
    li.textContent = instruction;
    list2.appendChild(li);
});}

return clone;
}

//Render and Append
function renderAllRecipes() {
    const containers = document.querySelectorAll('.container');

    if(!containers) return ;


    const recipes = getRecipes();
    
containers.forEach(container=>{

        for (const recipe of recipes) {
        const clone = createproduct(recipe.id);
        if (clone) container.appendChild(clone);
    }
})

}

function renderRecipe() {

    const container = document.querySelector("#fullrecipe_container");
    if (!container) return;

    const recipeid = new URLSearchParams(window.location.search).get("id");
    if (!recipeid) return;

    const recipe = getRecipes().find(rcp => rcp.id === recipeid);
    if (!recipe) {
        container.textContent = "Recipe not found.";
        return;
    }

    const name = container.querySelector(".name");
    if (name) name.textContent = recipe.name;

    const description = container.querySelector(".description");
    if (description) description.textContent = recipe.description;

    const thumbnail = container.querySelector(".thumbnail");
    if (thumbnail) thumbnail.src = recipe.thumbnail;
    // container.querySelector(".duration").textContent = recipe.duration;

    const ingredientsList = container.querySelector(".ingredients_list");
    if(ingredientsList){
    ingredientsList.innerHTML = "";
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    }

    const instructionsList = container.querySelector(".instructions_list");
    if(instructionsList){
    instructionsList.innerHTML = "";
    recipe.instructions.forEach(instruction => {
        const li = document.createElement("li");
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });
    }
}

const appendProduct=function(recipeid){
const newproduct=createproduct(recipeid);
const containers=document.querySelectorAll('.container');

if(!containers) return;

containers.forEach(container => {
    if(newproduct) container.append(newproduct);
});
}

document.addEventListener("DOMContentLoaded", () => {
  renderAllRecipes();
  renderRecipe();

  adminInput();

});
                                     //UPDATE


function editRecipe(){
    

}

function update(){

}

                                    //DELETE
const deleteRecipe = function(name){
const recipes=getRecipes();
const recipesUpdated=recipes.filter(rcp=>rcp.name!==name);

  localStorage.setItem("recipes", JSON.stringify(recipesUpdated));
}

const card=document.querySelector('.recipe_card');
const button=document.querySelector('#delete_btn');

button.addEventListener('click',function(){
    const id=document.querySelector('#delete_item').value;
    deleteRecipe(id);
    card.remove();
})






