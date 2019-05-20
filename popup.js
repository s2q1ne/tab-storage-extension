let saveUrlElement = document.getElementById('saveUrl');
let loadUrlElement = document.getElementById('loadUrl');

saveUrlElement.onclick = function(element) {
  // let color = element.target.value;
  chrome.tabs.query({//active: true 
  //  , 
  currentWindow: true
  }, function(tabs) {
    chrome.extension.getBackgroundPage().console.log(tabs)

    value = new Array(tabs.length)
    let index=0;
    tabs.forEach(element => { 
      value[index++] = {
        "title" : element.title,
        "favicon" : element.favicon,
        "url" : element.url,
        "index" : element.index
      }
    });
    chrome.storage.sync.set({'code': value}, function() {
      console.log('Value is set to ' + value);
    });
  
    // for( let i=0; i<tabs.length; i++ ){
    //   chrome.extension.getBackgroundPage().console.log({title: tabs[i].title,url:tabs[i].url});
    // }
    
    chrome.tabs.executeScript( // 탭의 스크립트 실행
        tabs[0].id, {} );
        // {code: `document.body.style.backgroundColor = "${color}";`});
  });
};
loadUrlElement.onclick = function(element) {
  chrome.storage.sync.get('code', function(result) {
    chrome.extension.getBackgroundPage().console.log(result.code);
  });
};