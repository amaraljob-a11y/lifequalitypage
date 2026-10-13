const WHATSAPP_NUMBER = "5521999700012";
const defaultMessage = "Olá! Acessei o site da Life Quality Med e gostaria de solicitar um orçamento para minha empresa.";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  menuToggle.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
    menuToggle?.querySelector("use")?.setAttribute("href", "#i-menu");
  });
});

const serviceSelect = document.querySelector('select[name="servico"]');
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  });
});

const form = document.querySelector("#lead-form");
const status = document.querySelector("#form-status");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const utm = new URLSearchParams(window.location.search);
  const source = ["utm_source", "utm_medium", "utm_campaign"].map((key) => `${key}=${utm.get(key) || ""}`).filter((entry) => !entry.endsWith("=")).join(" | ");
  const message = [
    "Olá! Acessei o site da Life Quality Med e gostaria de solicitar um orçamento para minha empresa.",
    "",
    `Nome: ${data.get("nome")}`,
    `Empresa: ${data.get("empresa")}`,
    `Telefone/WhatsApp: ${data.get("telefone")}`,
    `Serviço de interesse: ${data.get("servico")}`,
    data.get("mensagem") ? `Mensagem: ${data.get("mensagem")}` : "",
    source ? `Origem: ${source}` : ""
  ].filter(Boolean).join("\n");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || defaultMessage)}`;
  status.textContent = "Abrindo o WhatsApp oficial com sua solicitação…";
  window.open(url, "_blank", "noopener,noreferrer");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
