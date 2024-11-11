let messageList = document.getElementById("messages")
let usernameInput = document.getElementById("username")
let textInput = document.getElementById("text")

let ipAddress = "localhost:3000"

let latestMessageId = 0

function getMessage() {
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.responseText != "")
        showMessage(xmlhttp.responseText)
    }
  };

  xmlhttp.open("GET", `http://${ipAddress}/getMessage`, true);
  xmlhttp.send();

};

function sendMessage() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `http://${ipAddress}/sendMessage` , true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      message: textInput.value,
      username: "Alvin"
  }));
}

function showMessage(messages) {
  messages = JSON.parse(messages)
  for (let i = latestMessageId; i < messages.length; i++) {
    console.log(i)
    if (messages[i]["id"] >= i) {
      msgDiv = document.createElement("div")
      msgDiv.className = "message"

      let usernameDiv = document.createElement("p");
      usernameDiv.innerHTML = messages[i]["username"]
      usernameDiv.className = "username"

      let messageDiv = document.createElement("p");
      messageDiv.innerHTML = messages[i]["message"]

      msgDiv.appendChild(usernameDiv)
      msgDiv.appendChild(messageDiv)

      messageList.appendChild(msgDiv)

      latestMessageId = messages[i]["id"]
    }
  }



}

setInterval(getMessage, 500);