module.exports = function postNewFolder (e, folderName, callback) {
  e.preventDefault()
  fetch(`/api/folders`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      folderName
    })
  })
  .then((res)=>{
    return res.json()
  })
  .then((res)=>{
     callback(res)
  });
}

//issue not updating state until refresh
