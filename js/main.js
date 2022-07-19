var $photoUrl = document.querySelector('.photo-url');
var $img = document.querySelector('img');

$photoUrl.addEventListener('input', function photoUrl(event) {
  $img.setAttribute('src', $photoUrl.value);
});


var $form = document.querySelector('form');

$form.addEventListener('submit', function journalEntry(event) {
  event.preventDefault();

  var nextEntry = {
    title: $form.elements.title.value,
    photoUrl: $form.elements.photo.value,
    notes: $form.elements.notes.value,
    nextEntryId: data.nextEntryId
  };

  data.entries.push(nextEntry);

  data.nextEntryId++;

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();
});
