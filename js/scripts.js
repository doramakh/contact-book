var $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

// var elIdish = $_('.idish');
// var elButton = $_('button', elIdish);

var $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};

var createElement = function (element, elementClass, text) {
  var newElement = document.createElement(element);

  if (elementClass) {
    newElement.setAttribute('class', elementClass);
  }

  if (text) {
    newElement.textContent = text;
  }

  return newElement;
};

var contacts = [];
var options = [];

//Announcing Vars for Selectors
var elForm = $_('form');
var elList = $_('ul');

var elNameInput = elForm.querySelector('.js-contact-form__name-input');
var elRelationshipInput = elForm.querySelector('.js-contact-form__relationship-input');
var elPhoneInput = elForm.querySelector('.js-contact-form__phone-input');
var elRelationshipDatalist = elForm.querySelector('#relationships-list');

function addContact () {
  var contactFragment = document.createDocumentFragment();
  contacts.forEach(function(contact, index) {
    var newContact = createElement('li', 'list-group-item mb-2');
    contactFragment.appendChild(newContact);

    var newName = createElement('h3', 'h5 text-truncate text-capitalize text-info', `${contact.name}`);
    newContact.appendChild(newName);

    var newRelation = createElement('p', 'small mb-1 text-capitalize', `${contact.relation}`);
    newContact.appendChild(newRelation);

    var newPhone = createElement('a', 'd-block mb-3 text-success', `${contact.phoneNumber}`);
    newPhone.setAttribute('href', `tel:${contact.phoneNumber}`);
    newContact.appendChild(newPhone);

    var newBtnDelete = createElement('button', 'd-block btn btn-danger', 'Delete');
    newBtnDelete.dataset.id = index;
    newContact.appendChild(newBtnDelete);
  });
  elList.appendChild(contactFragment);
};

elForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  elPhoneInput.classList.remove('is-invalid');

  var name = elNameInput.value;
  var relationship = elRelationshipInput.value;
  var phone = elPhoneInput.value;

  var isIncludes = false;

  for (var contact = 0; contact < contacts.length; contact++){
    if (contacts[contact].phoneNumber === elPhoneInput.value){
      elPhoneInput.classList.add('is-invalid');
      isIncludes = true;
      return;
    };
  };

  contacts.push({
    name: name,
    relation: relationship,
    phoneNumber: phone
  });

  elList.innerHTML = '';




  //Adding New Contact

  addContact();


  //Creating Option List

  options.push(relationship);

  elRelationshipDatalist.innerHTML = '';

  options.forEach(function(option){
    var newOption = createElement('option', '', `${option}`);
    elRelationshipDatalist.appendChild(newOption);
  });

  elNameInput.value = '';
  elRelationshipInput.value = '';
  elPhoneInput.value = '';
  elNameInput.focus();

});

elList.addEventListener('click', function (evt){
  if(evt.target.matches('button')){
    elList.innerHTML = "";
    contacts.splice(evt.target.dataset.id, 1);
    addContact();

  };
});
