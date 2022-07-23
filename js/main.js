var $photoUrl = document.querySelector('.photo-url');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $entryList = document.querySelector('.entry-list');
var $entryForm = document.querySelector('.create-entry');
var $entries = document.querySelector('.view-entries');
var $nav = document.querySelector('.nav-entries');
var $newButton = document.querySelector('.new-button');
var $noEntriesText = document.querySelector('.no-entries');
var $entryTitle = document.querySelector('.title');
var $entryNotes = document.querySelector('.notes');
var $entriesH1 = document.querySelector('.entries-h1');

function photoUrl(event) {
  $img.setAttribute('src', $photoUrl.value);
}

function saveEntries(event) {
  event.preventDefault();

  if(data.editing === null){
    var entryData = {};
    entryData.entryId = data.nextEntryId;
  } else {
    var list = data.editing;
    entryData = getEntryObject(list);
  }

  entryData.title = $form.elements.title.value;
  entryData.photoUrl = $form.elements.photo.value;
  entryData.notes = $form.elements.notes.value;
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');


  var renderedEntries = renderEntry(entryData);

  if(data.editing === null){
    $entryList.prepend(renderedEntries);
    data.entries.unshift(entryData);
    data.nextEntryId++;
  } else {
    list.replaceWith(renderedEntries);
    data.editing = null;
  }

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
  img.className = 'entry-img';
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
  h2.className = 'entry-title';
  h2.textContent = entryData.title;
  leftColumn.appendChild(h2);

  var p = document.createElement('p');
  p.className = 'entry-notes';
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
  $entriesH1.textContent = 'New Entry';
  $entries.className = 'view-entries hidden';
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

function editEntryClick(event){
  if(event.target.tagName !== 'I'){
    return;
  }
  showFormView();
  var entryNum = event.target.closest('li');
  data.editing = entryNum;

  var entryId = entryNum.getAttribute('data-entry-id');
  var num = data.entries.length;
  var entryIndex = num - entryId;
  var entryData = data.entries[entryIndex];

  $entriesH1.textContent = 'Edit Entry';
  $entryTitle.value = entryData.title;
  $photoUrl.value = entryData.photoUrl;
  $img.setAttribute('src', entryData.photoUrl);
  $entryNotes.value = entryData.notes;
}

function getEntryObject(list){
  var entryId = list.getAttribute('data-entry-id');
  entryId = JSON.parse(entryId);
  for (var i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].entryId) {
      var entryData = data.entries[i];
      return entryData;
    }
  }
}

$entryList.addEventListener('click', editEntryClick);
document.addEventListener('DOMContentLoaded', appendEntries);
$form.addEventListener('submit', saveEntries);
$photoUrl.addEventListener('input', photoUrl);
$newButton.addEventListener('click', showFormView);
$nav.addEventListener('click', showEntriesView);
