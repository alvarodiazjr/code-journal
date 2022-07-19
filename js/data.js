/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function unload(event){
  localStorage.getItem('code-journal-local-storage');
  localStorage.setItem('code-journal-local-storage', JSON.stringify(data));
});
