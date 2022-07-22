var $photoUrl = document.querySelector('.photo-url');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $entryList = document.querySelector('.entry-list');
var $entryForm = document.querySelector('.create-entry');
var $entries = document.querySelector('.view-entries');
var $nav = document.querySelector('.nav-entries');
var $newButton = document.querySelector('.new-button');
var $noEntriesText = document.querySelector('.no-entries');
// var $title = document.querySelector('.title');
// var $notes = document.querySelector('.notes');

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
  var list = document.createElement('li');
  list.setAttribute('class', 'list-style');

  var row = document.createElement('div');
  row.className = 'row'
  list.appendChild(row);

  var imgDiv = document.createElement('div');
  imgDiv.className = 'column-full column-half';
  row.appendChild(imgDiv);

  var img = document.createElement('img');
  img.setAttribute('src', entryData.photoUrl);
  imgDiv.appendChild(img);

  var textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'column-full column-half');
  row.appendChild(textDiv);

  var noWrapRow = document.createElement('div');
  noWrapRow.setAttribute('class', 'row nowrap');
  textDiv.appendChild(noWrapRow);

  var leftColumn = document.createElement('div');
  leftColumn.setAttribute('class', 'column-half');
  noWrapRow.appendChild(leftColumn);

  var h2 = document.createElement('h2');
  h2.textContent = entryData.title;
  leftColumn.appendChild(h2);

  var p = document.createElement('p');
  p.textContent = entryData.notes;
  leftColumn.appendChild(p);

  var rightColumn = document.createElement('div');
  rightColumn.setAttribute('class', 'column-half');
  noWrapRow.appendChild(rightColumn);

  var iconRow = document.createElement('div');
  iconRow.setAttribute('class', 'row justify-end align-center');
  rightColumn.appendChild(iconRow);

  var icon = document.createElement('i');
  icon.setAttribute('class', 'fa-solid fa-pen nav');
  iconRow.appendChild(icon);

  list.setAttribute('data-entry-id', entryData.entryId);

  $noEntriesText.remove();

  return list;
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

function editEntry(event){
  console.log(event.target.tagName);
  if(event.target.tagName !== 'I'){
    return;
  }
  showFormView();
  var entryNum = event.target.closest('li');
  data.editing = entryNum;
  console.log(entryNum);
}

$entryList.addEventListener('click', editEntry);
document.addEventListener('DOMContentLoaded', appendEntries);
$form.addEventListener('submit', journalEntry);
$photoUrl.addEventListener('input', photoUrl);
$newButton.addEventListener('click', showFormView);
$nav.addEventListener('click', showEntriesView);
