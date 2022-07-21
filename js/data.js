/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousData = localStorage.getItem('code-journal-local-storage')
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function unload(event){
  localStorage.getItem('code-journal-local-storage');
  localStorage.setItem('code-journal-local-storage', JSON.stringify(data));
});
