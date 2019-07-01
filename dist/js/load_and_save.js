// Load a JSON document
FileReaderJS.setupInput(document.getElementById('loadDocument'), {
    readAsDefault: 'Text',
    on: {
      load: function (event, file) {
        editor2.setText(event.target.result);
      }
    }
  });

  // Save a JSON document
  document.getElementById('saveDocument').onclick = function () {
    // Save Dialog
    fname = window.prompt("Save as...");
    
    // Check json extension in file name
    if(fname.indexOf(".")==-1){
      fname = fname + ".json";
    }else{
      if(fname.split('.').pop().toLowerCase() == "json"){
        // Nothing to do
      }else{
        fname = fname.split('.')[0] + ".json";
      }
    } 
    var blob = new Blob([editor2.getText()], {type: 'application/json;charset=utf-8'});
    saveAs(blob, fname);
  };