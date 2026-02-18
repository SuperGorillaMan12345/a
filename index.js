async function send() {
  const message = document.getElementById("msg").value.trim();
  if(!message) return showPopup("Please enter a Game ID");

  try {
    const res = await fetch("/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    if(data.ok){
      showPopup("Request sent successfully!");
      document.getElementById("downloadLink").style.display = "inline-block";
    } else {
      showPopup("Failed to send: " + (data.error || "Unknown error"));
    }
  } catch(e){
    showPopup("Failed to send: Network error");
  }
}
