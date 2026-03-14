function updateBlockFields(select) {
  const container = select.closest(".inline-related")
  if (!container) return

  const value = select.value

  const text = container.querySelector(".field-text")
  const image = container.querySelector(".field-image")
  const file = container.querySelector(".field-file")

  if (text) text.style.display = value === "text" ? "" : "none"
  if (image) image.style.display = value === "image" ? "" : "none"
  if (file) file.style.display = value === "file" ? "" : "none"
}

// When type changes
document.addEventListener("change", function (e) {
  if (e.target.name.includes("type")) {
    updateBlockFields(e.target)
  }
})

// Run on page load
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('select[name$="-type"]').forEach((select) => {
    updateBlockFields(select)
  })
})