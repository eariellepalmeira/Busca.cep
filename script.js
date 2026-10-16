const form = document.querySelector("#cep-form");
const input = document.querySelector("#cep");
const button = document.querySelector("#search-button");
const message = document.querySelector("#message");
const results = document.querySelector("#results");

input.addEventListener("input", () => {
  const digits = input.value.replace(/\D/g, "").slice(0, 8);
  input.value = digits.length > 5
    ? `${digits.slice(0, 5)}-${digits.slice(5)}`
    : digits;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const cep = input.value.replace(/\D/g, "");

  results.hidden = true;
  message.textContent = "";

  if (cep.length !== 8) {
    message.textContent = "Digite um CEP válido com 8 dígitos.";
    input.focus();
    return;
  }

  button.disabled = true;
  button.textContent = "Consultando...";
  message.textContent = "Buscando endereço...";

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error("Não foi possível consultar o CEP.");
    }

    const address = await response.json();
    if (address.erro) {
      message.textContent = "CEP não encontrado. Confira os números e tente novamente.";
      return;
    }

    document.querySelector("#street").textContent = address.logradouro || "Não informado";
    document.querySelector("#neighborhood").textContent = address.bairro || "Não informado";
    document.querySelector("#city").textContent = address.localidade || "Não informado";
    document.querySelector("#state").textContent = address.uf || "Não informado";
    results.hidden = false;
    message.textContent = "";
  } catch (error) {
    message.textContent = error instanceof TypeError
      ? "Erro de conexão. Verifique sua internet e tente novamente."
      : "Não foi possível consultar o CEP agora. Tente novamente.";
  } finally {
    button.disabled = false;
    button.textContent = "Consultar";
  }
});
