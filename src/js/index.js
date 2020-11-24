/* global $ */

window.requestFileSystem =
  window.requestFileSystem || window.webkitRequestFileSystem;

const {Blob, localforage, localStorage} = window;
const KEY = 'key';

$(window).resize((e) => {
  console.log('resized', e);
});
window.addEventListener('message', function (event) {
  alert('message received: ' + event.data);
});

window.app = {
  onLayoutShow(e) {
    console.log('show');
  },
};

$(() => {
  new window.kendo.mobile.Application($(document.body), {
    skin: 'flat',
  });

  $('#text').html('Javascript works!');

  // Post message to react
  $('#toReact').click(() => {
    window.ReactNativeWebView.postMessage(`From webview: ${$('#input').val()}`);
  });

  // localStorage
  $('#readStorage').click(() => {
    const item = localStorage.getItem(KEY);
    $('#text').html(`From localStorage: ${item}`);
  });
  $('#writeStorage').click(() => {
    localStorage.setItem(KEY, $('#input').val());
    $('#text').html('OK');
  });

  // LocalForage
  $('#readForage').click(() => {
    localforage
      .getItem(KEY)
      .then((item) => {
        $('#text').html(`From localforage: ${item}`);
      })
      .catch((err) => {
        $('#text').html(err.message);
      });
  });
  $('#writeForage').click(() => {
    localforage
      .setItem(KEY, $('#input').val())
      .then(() => {
        $('#text').html('OK');
      })
      .catch((err) => {
        $('#text').html(err.message);
      });
  });

  // $.ajax and cors
  $('#remoteXhr').click(() => {
    $.ajax({
      crossDomain: true,
      method: 'GET',
      // url: 'https://demos.telerik.com/kendo-ui/content/nav.json',
      url: 'http://dummy.restapiexample.com/api/v1/employees',
    })
      .then((data, status) => {
        // $('#text').html(`${status}: ${data.length}`);
        $('#text').html(`${status}: ${data.data.length}`);
      })
      .catch((xhr, status, errorThrown) => {
        $('#text').html(`${status}: ${errorThrown}`);
      });
  });

  // FileSystem API
  // https://github.com/joltup/rn-fetch-blob/wiki/File-System-Access-API#writefilepathstring-contentstring--array-encodingstring-appendbooleanpromise
  $('#fileSave').click(() => {
    const FILE = 'leaf.svg';
    $.ajax({
      url: `https://cdn.kidoju.com/images/o_collection/svg/office/${FILE}`,
      dataType: 'text',
    })
      .then((data) => {
        window.requestFileSystem(
          window.PERSISTENT,
          5 * 1024 * 1024,
          (fs) => {
            console.log('file system open: ' + fs.name);
            fs.root.getFile(
              FILE,
              {create: true, exclusive: false},
              (fileEntry) => {
                console.log(`fileEntry at ${fileEntry.toURL()}`);
                // Create a FileWriter object for our FileEntry (log.txt).
                fileEntry.createWriter((fileWriter) => {
                  fileWriter.onwriteend = () => {
                    console.log('Successful file write...');
                    $('#image').attr('src', fileEntry.toURL());
                  };
                  fileWriter.onerror = (e) => {
                    console.log('Failed file write: ' + e.toString());
                  };
                  const dataObj = new Blob([data], {type: 'image/svg+xml'});
                  fileWriter.write(dataObj);
                });
              },
              console.dir,
            );
          },
          console.dir,
        );
      })
      .catch((xhr, status, errorThrown) => {
        $('#text').html(`${status}: ${errorThrown}`);
      });
  });
  $('#fileClear').click(() => {
    $('#image').attr('src', './build/images/finger.png');
  });

  // TODO window.open (inAppBrowser)
});
