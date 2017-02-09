module.exports = function saveNewURL(e, folderID, URL){
    e.preventDefault()
    fetch(`/api/urls`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        actualurl: URL,
        folder_id: folderID,
        clickCount: 0
      })
    })
    .then((res)=>{
      return res.json();
    });
  }
