var $photoUrl = document.querySelector('.photo-url');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $entryList = document.querySelector('ul');
var $entryForm = document.querySelector('.create-entry');
var $entries = document.querySelector('.view-entries');
var $nav = document.querySelector('.nav-entries');
var $newButton = document.querySelector('.new-button');
var $noEntriesText = document.querySelector('.no-entries');

function photoUrl(event) {
  $img.setAttribute('src', $photoUrl.value);
}

function journalEntry(event) {
  event.preventDefault();

  var entryData = {
    title: $form.elements.title.value,
    photoUrl: $form.elements.photo.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;

  data.entries.unshift(entryData);

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  var renderedEntries = renderEntry(entryData);
  $entryList.prepend(renderedEntries);

  showEntriesView();

  $form.reset();
}

function renderEntry(entryData){
  var row = document.createElement('div');
  row.className = 'row'

  var imgDiv = document.createElement('div');
  imgDiv.className = 'column-full column-half';
  row.appendChild(imgDiv);

  var img = document.createElement('img');
  img.setAttribute('src', entryData.photoUrl);
  imgDiv.appendChild(img);

  var textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'column-full column-half');
  row.appendChild(textDiv);

  var h2 = document.createElement('h2');
  h2.textContent = entryData.title;
  textDiv.appendChild(h2);

  var p = document.createElement('p');
  p.textContent = entryData.notes;
  textDiv.appendChild(p);

  $noEntriesText.remove();

  return row;
}

function appendEntries(event){
  for(var i = 0; i < data.entries.length; i++){
    var renderedEntries = renderEntry(data.entries[i]);
    $entryList.appendChild(renderedEntries);
  }
}

function showFormView(event){
  $entries.className = 'view-entries hidden',
  $entryForm.className = 'create-entry';
  data.view = 'entry-form'
}

function showEntriesView(event){
  $entries.className = 'view-entries';
  $entryForm.className = 'create-entry hidden';
  data.view = 'entries';
}

if (data.view === 'entry-form') {
  showFormView()
} else {
  showEntriesView();
}

document.addEventListener('DOMContentLoaded', appendEntries);
$form.addEventListener('submit', journalEntry);
$photoUrl.addEventListener('input', photoUrl);
$newButton.addEventListener('click', showFormView);
$nav.addEventListener('click', showEntriesView);
