function goToProfile() {
  window.location.href = "../Profile/user-profile.html";
}
function toggleBookmark(el) {
  const icon = el.querySelector(".material-symbols-outlined");
  if (icon.textContent === "bookmark") {
    icon.textContent = "bookmark_added";
  } else {
    icon.textContent = "bookmark";
  }
}
