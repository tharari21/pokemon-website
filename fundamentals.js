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
