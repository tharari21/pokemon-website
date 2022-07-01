const container = document.querySelector("#container");
const p = document.querySelector("#para");

// Method 1
let li = document.createElement("li");
li.textContent = "Apple";
const list1 = document.querySelector("#list-1");
list1.append(li);

li = document.createElement("li");
li.textContent = "Cucumber";
list1.append(li);

li = document.createElement("li");
li.textContent = "Guitar";
list1.append(li);

// Method 2
const createLi = (textContent) => {
  li = document.createElement("li");
  li.textContent = textContent;
  return li;
};
list1.append(createLi("Apple"));
list1.append(createLi("Cucumber"));
list1.append(createLi("Guitar"));

// create clickable button that will change the text of the paragraph element with id of `para` to say `button was clicked`
let btn = document.createElement("button");
btn.textContent = "Click Me";
btn.addEventListener("click", () => {
  p.textContent = "Button was clicked!";
});
container.append(btn);
// Create an input element that accepts textinput. Then also create a button that says "submit" The input element will have the id of textinput. The button will have the id of text-input-button.
const input1 = document.createElement("input");
input1.type = "text"; // Default so not necessary
input1.id = "textinput";
btn = document.createElement("input");
btn.type = "submit";
btn.textContent = "Submit";
btn.id = "text-input-button";
const input2 = document.createElement("input");
input2.type = "text";

container.append(input1, input2, btn);

//When submit button is clicked, take the text in the inout field and creeate an HTML element that matched the kind of
btn.addEventListener("click", () => {
  let elementType = input1.value;
  let newElement = document.createElement(elementType);
  newElement.textContent = input2.value;
  container.append(newElement);
});
